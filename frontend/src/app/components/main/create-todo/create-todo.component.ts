import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../../services/todos.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent {
  todo = '';

  constructor(
    private todosService: TodosService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  createTodo(redirect) {
    this.todosService.createTodo({
      text: this.todo
    }).subscribe(res => {
      if (redirect) {
        this.router.navigate(['home']);
      }
      this.todo = '';
      this.snackBar.open('Todo Created Successfully!', '', {
        duration: 3000
      });
    });
  }

}
