import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { IqosService } from '../../services/iqos.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private iqosService: IqosService) { }

  ngOnInit(): void {
    this.iqosService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
}
