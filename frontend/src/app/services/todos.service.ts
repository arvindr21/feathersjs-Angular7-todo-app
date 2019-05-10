import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  baseUrl = 'http://localhost:3030/api/v1/todos';
  constructor(private httpClient: HttpClient) { }

  getAllTodos(limit, skip) {
    // https://docs.feathersjs.com/api/databases/querying
    return this.httpClient.get(`${this.baseUrl}?$limit=${limit}&$skip=${skip}`);
  }

  getTodosByStatus(status, limit, skip) {
    return this.httpClient.get(`${this.baseUrl}?$limit=${limit}&$skip=${skip}&isCompleted=${status}`);
  }

  createTodo(todo) {
    return this.httpClient.post(this.baseUrl, todo);
  }

  updateTodo(todo) {
    return this.httpClient.put(`${this.baseUrl}/${todo._id}`, {
      text: todo.text,
      isCompleted: todo.isCompleted
    });
  }

  deleteTodo(id) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

}
