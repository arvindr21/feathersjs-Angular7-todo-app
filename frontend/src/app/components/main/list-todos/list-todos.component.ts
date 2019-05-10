import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../../services/todos.service';
import { PageEvent } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.scss']
})
export class ListTodosComponent implements OnInit {
  INIT_LIMIT = 10;
  todos = [];
  limit = this.INIT_LIMIT;
  skip = 0;
  total = 0;
  filtered = false;
  filtering = false;

  pageSizeOptions: number[] = [10, 25, 100];
  pageEvent: PageEvent;
  constructor(
    private todosService: TodosService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.todosService.getAllTodos(this.limit, this.skip).subscribe((res: any) => {
      this.todos = res.data;
      this.limit = res.limit;
      this.skip = res.skip;
      this.total = res.total;
    });
  }

  getCompletedTodos() {
    const limit = this.INIT_LIMIT;
    const skip = 0;
    this.filtered = true;
    this.filtering = true;
    this.processStatusTodos(this.filtering, limit, skip);
  }

  getIncompleteTodos() {
    const limit = this.INIT_LIMIT;
    const skip = 0;
    this.filtered = true;
    this.filtering = false;
    this.processStatusTodos(this.filtering, limit, skip);
  }

  processStatusTodos(status, limit, skip) {
    this.todosService.getTodosByStatus(status, limit, skip).subscribe((res: any) => {
      this.todos = res.data;
      this.limit = res.limit;
      this.skip = res.skip;
      this.total = res.total;
    });
  }

  clearStatusFilter() {
    const limit = this.INIT_LIMIT;
    const skip = 0;
    this.filtered = false;
    this.fetch();
  }

  paginateList(event?: PageEvent) {
    this.limit = event.pageSize;
    this.total = event.length;
    this.skip = event.pageIndex * event.pageSize;
    if (this.filtered) {
      this.filtering ? this.processStatusTodos(true, this.limit, this.skip) : this.processStatusTodos(false, this.limit, this.skip);
    } else {
      this.fetch();
    }
  }

  updateTodo(todo) {
    this.todosService.updateTodo(todo).subscribe(res => {
      this.snackBar.open('Todo Update Successfully!', '', {
        duration: 3000
      });
    });
  }

  deleteTodo(id): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you confirm the deletion of this data?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todosService.deleteTodo(id).subscribe(res => {
          this.fetch();
        });
      }
    });

  }

}
