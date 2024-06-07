import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { IqosService } from '../../services/iqos.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    role: '',
    username: '',
    password: ''
  };

  constructor(
    private route: ActivatedRoute,
    private iqosService: IqosService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.iqosService.getUserById(id).subscribe(data => {
      this.user = data;
    });
  }
}
