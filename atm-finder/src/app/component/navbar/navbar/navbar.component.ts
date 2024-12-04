import { Component } from '@angular/core';
import { SearchService } from 'src/app/share/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private searchService: SearchService) { }

  onSearch(event: any) {
    const searchTerm = event.target.value;
    this.searchService.changeSearchTerm(searchTerm);
  }
}
