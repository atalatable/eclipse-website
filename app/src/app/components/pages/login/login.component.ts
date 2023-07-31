import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Admin } from 'src/app/shared/models/Admin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  isSubmitted:boolean = false;
  current:Admin;

  constructor(
    private formBuilder:FormBuilder,
    private adminService:AdminService,
    private router:Router
  ) {
    this.adminService.adminObservable.subscribe((newAdmin) => {
      this.current = newAdmin;
    });
  }


  ngOnInit():void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.current.token) {
      this.router.navigateByUrl('/admin');
    }
  }

  get fc() {
    return this.loginForm.controls;
  }

  submit():void {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return
    }

    this.adminService.login({username: this.fc.username.value, password: this.fc.password.value})
    .subscribe(() => {
      this.router.navigateByUrl('/admin');
    })
  }
}
