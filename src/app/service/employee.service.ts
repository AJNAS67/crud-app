import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  URL: string = 'http://localhost:3000';
  constructor(private _http: HttpClient) {}
  addEmployee(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/employees', data);
  }
  getEmployeeList() {
    return this._http.get(`${this.URL}/employees`);
  }
  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`${this.URL}/employees/${id}`);
  }
  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`${this.URL}/employees/${id}`, data);
  }

}
