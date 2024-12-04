import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Atm } from 'src/app/model/atm.model';
import { AtmService } from 'src/app/service/atm.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editMode: boolean = false;
  currentAtm: Atm = this.getEmptyAtm();
  idAtm = this.route.snapshot.params['id'];

  constructor(
    private atmService: AtmService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const mode = params['mode'];
      if (mode === 'edit') {
        this.editMode = true;
      } else if (mode === 'add') {
        this.editMode = false;
      }
    });

    this.getAtmById();
  }

  getEmptyAtm(): Atm {
    return {
      id: 0,
      name: '',
      manufacturer: '',
      type: '',
      serialNumber: 0,
      image: ''
    };
  }

  getAtmById() {
    this.atmService.getAtmById(this.idAtm).subscribe(atm => {
      this.currentAtm = atm;
    });
  }

  saveAtm() {
    if (this.editMode) {
      this.atmService.updateAtm(this.currentAtm).subscribe(() => {

        this.router.navigate(['/']);
      });
    } else {
      this.atmService.addAtm(this.currentAtm).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}