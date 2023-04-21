import { Component } from "@angular/core";
import { AuthService } from "../core/services/auth.service";
import { Subject } from "rxjs";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Dialog } from "@angular/cdk/dialog";
import { MatDialog } from "@angular/material/dialog";
import { ForgotPasswordComponent } from "../shared/components/forgot-password/forgot-password.component";

@Component({
    selector: 'login-page',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent{
    credentials = {
        email: '',
        password: ''
    }
    constructor(private authService: AuthService, private router: Router,private dialog: MatDialog){}

    error = new Subject<string>(); //valid creds bool
    
    checkCredentials(form: NgForm) :void{
        this.authService.login(form.value)
            .subscribe({
                next: response => {
                    this.router.navigate(['/user'])
                },
                error: err => this.error.next(err.message)
            })
    }

    openForgotPass(){
        this.dialog.open(ForgotPasswordComponent);
    }
}