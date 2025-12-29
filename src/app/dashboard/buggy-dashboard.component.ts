import { Component, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../mock-data.service';
import { HttpClientModule } from '@angular/common/http';
import { delay, finalize, forkJoin, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-buggy-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `],
  template: `
    <div class="p-6 bg-gray-900 text-white h-full overflow-auto">
      <h1 class="text-2xl font-bold mb-4">User Dashboard <span class="text-sm font-normal text-gray-400">(v0.9 Beta)</span></h1>

      <div *ngIf="selectedUser" class="mb-6 p-4 bg-gray-800 rounded border border-gray-700">
        <h2 class="text-xl text-accent font-semibold">
           {{ getName() }} 
        </h2>
        <p class="text-gray-400">{{ selectedUser.email }}</p>
        
        <p class="mt-2 text-warning">
          Active for: {{ daysActive }} days
        </p>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-1 border-r border-gray-700 pr-4">
          <h3 class="text-lg font-bold mb-2">Users</h3>
          <ul class="space-y-2">
            <li *ngFor="let u of users" 
                (click)="onSelectUser(u)"
                class="cursor-pointer p-2 rounded hover:bg-gray-800 transition"
                [class.bg-gray-800]="selectedUser?.id === u.id">
              {{ u.name }}
            </li>
          </ul>
        </div>

        <div class="col-span-2">
          <h3 class="text-lg font-bold mb-2">Posts <span class="text-sm font-normal text-gray-400">({{ totalComments }} total comments)</span></h3>
          
          <div *ngIf="isLoading" class="flex items-center space-x-2 text-accent">
            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading...</span>
          </div>

          <div *ngIf="!isLoading">
            <button (click)="loadPosts()" class="mb-4 px-3 py-1 bg-accent hover:bg-blue-600 rounded text-sm">
              Refresh Posts
            </button>

            <div *ngFor="let post of posts" class="mb-4 p-3 bg-gray-800 rounded">
              <h4 class="font-bold border-b border-gray-700 pb-1 mb-2">{{ post.title }}</h4>
              <p class="text-gray-300 text-sm mb-2">{{ post.body }}</p>
              
              <div class="bg-gray-900 p-2 rounded mt-2">
                <h5 class="text-xs font-uppercase text-gray-500 mb-1">Comments ({{ post.comments?.length || 0 }})</h5>
                <div *ngFor="let c of post.comments" class="text-xs border-l-2 border-accent pl-2 mb-1">
                   <span class="font-bold text-gray-400">{{ c.date }} - {{ c.email }}:</span> {{ c.body }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  providers: [MockDataService]
})
export class BuggyDashboardComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  posts: any[] = [];
  isLoading = false;
  daysActive = 0;
  totalComments = 0;

  constructor(private dataService: MockDataService) { }

  ngOnInit() {
    this.dataService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onSelectUser(user: any) {
    this.selectedUser = user;
    this.calculateDays(user);
    this.posts = [];
    this.loadPosts();
  }

  calculateDays(user: any) {
    const now = new Date().getTime();
    const diff = now - user.joinedAt;
    this.daysActive = Math.floor(diff / (1000 * 3600 * 24));
  }

  getName() {
    return this.selectedUser ? this.selectedUser.Name : '';
  }

  loadPosts() {
    if (!this.selectedUser) return;

    this.isLoading = true;

    this.dataService.getPosts(this.selectedUser.id)
      .pipe(
        delay(500)
      )
      .subscribe((posts: any[]) => {
        this.posts = posts;

        this.posts.forEach((p: any) => {
          this.dataService.getComments(p.id).subscribe(c => {
            p.comments = c;

            p.comments.forEach((comment: any) => {
              comment.date = new Date(comment.date);
              comment.date = comment.date.toLocaleString('pt-BR').replace(',', ' as');
              this.totalComments++;
            });
          });
        });
      });
  }
}
