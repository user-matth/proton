import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  columns = [
    { 'title': 'Todo' },
    { 'title': 'In Progress' },
    { 'title': 'Done' }
  ];

  showWorkspace: boolean = true;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit() {
  }
}
