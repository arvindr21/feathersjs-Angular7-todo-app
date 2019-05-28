import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTodosComponent } from './components/main/list-todos/list-todos.component';
import { CreateTodoComponent } from './components/main/create-todo/create-todo.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '', redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    data: { requiresLogin: false },
    canActivate: [AuthGuardService],
    component: LoginComponent
  },
  {
    path: 'register',
    data: { requiresLogin: false },
    canActivate: [AuthGuardService],
    component: RegisterComponent
  },
  {
    path: 'home',
    component: ListTodosComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuardService]
  },
  {
    path: 'create',
    component: CreateTodoComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
