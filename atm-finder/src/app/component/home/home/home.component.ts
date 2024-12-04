import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Atm } from 'src/app/model/atm.model';
import { AtmService } from 'src/app/service/atm.service';
import { SearchService } from 'src/app/share/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  atms: Atm[] = [];
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  private searchSubscription!: Subscription;
  isConfirmDelete: boolean = false;
  atmToDelete: any = null;

  constructor(
    private atmService: AtmService,
    private router: Router,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.loadAtms();
    this.searchSubscription = this.searchService.currentSearchTerm
      .subscribe(searchTerm => {
        this.searchText = searchTerm;
        this.currentPage = 1; 
      });
  }

  loadAtms() {
    this.atmService.getAtms().subscribe(
      (data) => {
        this.atms = data;
      },
      (error) => {
        console.error('Error loading ATMs:', error);
      }
    );
  }

  get totalItems(): number {
    return this.filteredAtms.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get paginatedAtms(): Atm[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredAtms.slice(startIndex, endIndex);
  }

  get filteredAtms() {
    return this.atms.filter(atm => 
      atm.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      atm.manufacturer.toLowerCase().includes(this.searchText.toLowerCase()) ||
      atm.type.toLowerCase().includes(this.searchText.toLowerCase()) ||
      atm.serialNumber.toString().includes(this.searchText)
    );
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
    }
  }

  addAtm() {
    this.router.navigate(['/add'], { queryParams: { mode: 'add' } });
  }

  editAtm(atm: Atm) {
    this.router.navigate(['/edit', atm.id], { queryParams: { mode: 'edit' } });
  }

  openDeleteModal(atm: any) {
    this.atmToDelete = atm;
    this.isConfirmDelete = true;
  }

  confirmDelete() {
    if (this.atmToDelete) {
      this.atmService.deleteAtm(this.atmToDelete.id).subscribe(
        () => {
          this.loadAtms();
          this.closeDeleteModal();
        },
        error => {
          console.error('Error deleting ATM:', error);
        }
      );
    }
  }

  closeDeleteModal() {
    this.isConfirmDelete = false;
    this.atmToDelete = null;
  }
}