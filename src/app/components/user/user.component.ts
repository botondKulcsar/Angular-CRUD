import { ActivatedRoute, Router } from '@angular/router';
import { FormHttpService } from './../../services/form-http.service';
import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm: FormGroup = new FormGroup({});
  agegroups: string[] = ['18 - 35', '36 - 59', '60 and above' ];
  userToUpdate: User = { name: '', username: '', email: '',password: '' , ageGroup: ''};
  userIdToUpdate: number|string = 0;
  constructor(private formHttpService: FormHttpService, private router: Router, private activatedRoute: ActivatedRoute) {}
    

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name : new FormControl('',[Validators.required, Validators.pattern(/^[A-Z][a-z]+\s[A-Z][a-z]+$/)]),
      username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
      ageGroup: new FormControl('', Validators.required)
    });

    this.activatedRoute.paramMap.subscribe(
      params => {
        const userId: any = params.get('id');
        console.log(userId);
        this.formHttpService.getUserById(userId).subscribe(
          (user: any) => {
            if(user.id) {
              this.userForm.patchValue(user);
              this.userIdToUpdate = user.id;
            } else {
              console.log('no user with id: ', user.id, ' can be found!')
            }
          },
          err => console.log(err),
          () => {}
        )
      },
      err => console.log(err),
      () => {}
    )
  }

  clear() {
    this.userForm.reset();
  }

  get name() { return this.userForm.get('name'); }
  get username() { return this.userForm.get('username'); }
  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }
  get ageGroup() { return this.userForm.get('ageGroup'); }

  onSubmit() {
    const user: User = this.userForm.value;
    if (this.userIdToUpdate) {
      this.formHttpService.updateUser(user, this.userIdToUpdate).subscribe(
        () => {
          console.log('user with id: ', this.userIdToUpdate, 'updated!');
          this.userIdToUpdate = 0;
          this.userForm.reset();
          this.router.navigate(['user-list'])
        }
      )
      return;
    }
   
    this.formHttpService.saveUser(user).subscribe(
      (data:any) => {
        console.log(user.name,' saved with id: ',1);
        this.userForm.reset();
        this.router.navigate(['user-list'])
      },
      err => console.log(err),
      () => {}
    );
  }

}
