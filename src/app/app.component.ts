import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BuggyDashboardComponent } from './dashboard/buggy-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BuggyDashboardComponent],
  template: `
    <div class="h-screen w-screen bg-gray-100 p-4">
      <app-buggy-dashboard></app-buggy-dashboard>
    </div>
  `
})
export class AppComponent { }
