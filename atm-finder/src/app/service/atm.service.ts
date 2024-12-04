import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atm } from '../model/atm.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtmService {
    private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAtms(): Observable<Atm[]> {
    return this.http.get<Atm[]>(this.apiUrl + '/atms');
  }

  getAtmById(id: number): Observable<Atm> {
    return this.http.get<Atm>(this.apiUrl + '/atms/' + id);
  }

  addAtm(atm: Atm): Observable<Atm> {
    return this.http.post<Atm>(this.apiUrl + '/atms', atm);
  }

  updateAtm(atm: Atm): Observable<Atm> {
    return this.http.put<Atm>(this.apiUrl + '/atms/' + atm.id, atm);
  }

  deleteAtm(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/atms/' + id);
  }
}