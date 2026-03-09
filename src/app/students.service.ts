import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './student.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  apiUrl = "http://localhost:3000/students";

  getAll(): Observable<Student[]>{
    return this.http.get<Student[]>(this.apiUrl);
  }

  insert(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  
  update(id: number, student: Student): Observable<Student>{
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  delete(id: number): Observable<Student>{
    return this.http.delete<Student>(`${this.apiUrl}/${id}`)
  }

}
