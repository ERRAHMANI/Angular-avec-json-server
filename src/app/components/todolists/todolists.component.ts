import { Component, OnInit } from '@angular/core';
import { TodolistService } from 'src/app/services/todolist.service';
import { Todolist } from 'src/app/models/todolist';

@Component({
  selector: 'app-todolists',
  templateUrl: './todolists.component.html',
  styleUrls: ['./todolists.component.scss']
})
export class TodolistComponent implements OnInit {
   SearchText = '';
   showForm = false;
  editForm = false;
  myTodolist : Todolist = {
    label: '',
    completed: false
  }
todolists: Todolist[] = [];
resultTodolists: Todolist[] = [];

  constructor(private todolistService: TodolistService) { }

  ngOnInit() {
    this.getTodolists();
    }

    
getTodolists() {
  this.todolistService.findAll()
  .subscribe(todolists => {
    this.resultTodolists = this.todolists = todolists
  })
}

deleteTodolist(id){
  this.todolistService.delete(id)
  .subscribe(() =>{
    this.todolists = this.todolists.filter(todolist => todolist.id != id)
  })
}
persistTodolist() {
  this.todolistService.persist(this.myTodolist)
  .subscribe((todolist) => {
    this.todolists = [todolist, ...this.todolists];
    this.resetTodolist();
    this.showForm =false;
  })
}

resetTodolist() {
  this.myTodolist ={
    label: '',
    completed: false
  }
}
toggleCompleted(todolist) {
  this.todolistService.completed(todolist.id, todolist.completed)
  .subscribe(() => {
todolist.completed = !todolist.completed
  })
}

editTodolist(todolist) {
  this.myTodolist = todolist
  this.editForm = true;
}

updateTodolist() {
  this.todolistService.update(this.myTodolist)
  .subscribe(todolist => {
    this.resetTodolist()
    this.editForm = false;
  })
}
searchTodolists() {
   this.resultTodolists = this.todolists.filter((todolist) => todolist.label.toLowerCase().includes(this.SearchText.toLowerCase()))
}
}
