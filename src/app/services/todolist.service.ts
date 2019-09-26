import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todolist } from '../models/todolist';
@Injectable({
  providedIn: 'root'
})
export class TodolistService {

apiUrl = "http://localhost:3000/todolist";

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Todolist[]>(this.apiUrl);
  }

  delete(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  persist(todolist) {
    return this.http.post<Todolist>(this.apiUrl, todolist);
  }
  completed(id, completed) {
    return this.http.patch(`${this.apiUrl}/${id}`, {completed: !completed})
  }

  update(todolist) {
    return this.http.put(`${this.apiUrl}/${todolist.id}`, todolist)

  }
}
