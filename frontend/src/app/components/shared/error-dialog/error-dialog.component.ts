import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './error-dialog.component.html'
})
export class ErrorDialogComponent {
  title = 'Angular-Interceptor';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private router: Router
  ) { }

  goToPage(pageName) {
    this.router.navigate([`${pageName}`]);
  }
}
