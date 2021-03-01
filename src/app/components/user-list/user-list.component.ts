import { Router } from '@angular/router';
import { User } from './../../model/user';
import { FormHttpService } from './../../services/form-http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList: User[] = [];
  showPass: boolean = false;
  constructor(private formHttpService: FormHttpService, private router: Router) { }

  ngOnInit(): void {
    this.formHttpService.getUsers().subscribe(
      (data:any) => {
        this.userList = data;
        console.log(this.userList);
      },
      err => console.log(err),
      () => {}
    )
  }

  revealPasswords() {
    this.showPass = !this.showPass;
  }

  updateUser(id:any) {
    console.log(id);
    this.router.navigate(['user',id])
  }

}
