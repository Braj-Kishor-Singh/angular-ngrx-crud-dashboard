import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  URL: string = 'http://localhost:3000/employee'
  constructor(private http: HttpClient) { }


  GetAll() {
    return this.http.get<IEmployee[]>(this.URL);
  }

  Get(empId: number) {
    return this.http.get<IEmployee>(this.URL + '/' + empId);
  }

  Create(data: IEmployee) {
    return this.http.post(this.URL, data);
  }

  Update(data: IEmployee) {
    return this.http.put(this.URL + '/' + data.id, data);
  }

  Delete(empId: number) {
    return this.http.delete(this.URL + '/' + empId);
  }
}
