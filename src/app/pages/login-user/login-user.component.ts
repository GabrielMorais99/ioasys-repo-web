import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/api/auth-user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss'],
})
export class LoginUserComponent implements OnInit {
  public loginForm: FormGroup;
  loading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],

      password: ['', Validators.compose([Validators.required])],
    });
  }
  async presentLoading() {
    this.loading = true;
    setTimeout(() => (this.loading = false));
  }

  async login() {
    this.presentLoading();
    this.authService.login(this.loginForm.value).subscribe(
      async (data) => {
        console.log(data);
        this.router.navigate(['/user-profile']);
        // await this.loading.dismiss()
      },
      async (error) => {
        console.log(error);
        // await this.loading.dismiss()
        // this.toast('Usuário inválido')
      }
    );
  }
}
