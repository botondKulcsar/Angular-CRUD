import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  ageGroup: string[] = ['18 - 35', '36 - 59', '60 and above' ];

  constructor() {
    this.userForm = new FormGroup({
      name : new FormControl('',[]),
      username: new FormControl('', []),
      email: new FormControl('', []),
      password: new FormControl('', []),
      ageGroup: new FormControl('', [])
    });
   }

  ngOnInit(): void {
  }

  onSubmit() {
    const user = this.userForm.value;
    console.log(user);
  }

}
