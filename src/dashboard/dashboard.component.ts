import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { User, UserService } from '../services/user.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ FormsModule , HttpClientModule , CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUser: User = {} as User;
  searchQuery: string = '';
  sortAscending: boolean = true;
  darkMode: boolean = false;
  loading: boolean = true;
	sortDirection: 'asc' | 'desc' = 'asc'; 

  constructor(private http: HttpClient , private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.darkMode = localStorage.getItem('darkMode') === 'true';
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = data;
      this.loading = false;
    });
  }
  filterUsers(): void {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  sortUsers(): void {
    this.sortAscending = !this.sortAscending;
    this.filteredUsers.sort((a, b) =>
      this.sortAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  }

  setSortOrder(order: 'asc' | 'desc') {
		this.sortDirection = order;
		this.sortUsers(); // Call sorting function
	}

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode', this.darkMode);
  }

  openModal(user: User): void {
    this.selectedUser = user;
  }

  closeModal(): void {
    this.selectedUser = null as unknown as User;
  }

}

