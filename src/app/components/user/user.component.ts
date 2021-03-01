import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

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
      name : new FormControl('',[Validators.required, Validators.pattern(/^[A-Z][a-z]+\s[A-Z][a-z]+$/)]),
      username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
      ageGroup: new FormControl('', Validators.required)
    });
   }

  ngOnInit(): void {
  }

  onSubmit() {
    const user = this.userForm.value;
    console.log(user);
  }

}
