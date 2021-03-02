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
    this.showUsers();
  }

  showUsers() {
    this.formHttpService.getUsers().subscribe(
      (data:any) => {
        this.userList = data;
      },
      err => console.log(err),
      () => {}
    )
  }

  revealPasswords() {
    this.showPass = !this.showPass;
  }

  updateUser(id:any) {
    this.router.navigate(['user',id])
  }

  deleteUser(id:any) {
    const iAmSure = confirm('Are you sure you want to DELETE this user?')
    if(iAmSure) {
    this.formHttpService.deleteUser(id).subscribe(
      () => {
        console.log('user with id: ', id, ' has been permanently removed');
        this.showUsers()
      },
      err => console.log(err),
      () => {}
    )}
  }

}
