import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { User } from 'src/app/core/models/User';
import { AppError } from 'src/app/core/models/app-error';
import { AccountService } from 'src/app/core/services/account.service';

export interface registerForm{
  // firstName: string,
  // middleName: string,
  // lastName:string,
  password: string,
  email: string,
  // contactNo:string,
  // birthDate:string,
  // address:string,
}

@Component({
  selector: 'app-account-registration',
  templateUrl: './account-registration.component.html',
  styleUrls: ['./account-registration.component.css']
})

export class AccountRegistrationComponent {
  constructor(private accountService: AccountService){}
  srcResult: any;
  showDep=false;
  role='';
  user!:User

  errorMessage$ = new Subject<string>();

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
    return inputNode;
  }


  isShowDep(){
    if(this.role=='chair'){
      this.showDep=true;
    }
    else if(this.role=='faculty'){
      this.showDep=true;
    }
    else{
      this.showDep=false;
    }
  }

  submitForm(form: NgForm){
    // console.log(form.value);
    this.accountService.register(form.value).subscribe({
      next: data => {
        this.errorMessage$.next('')
        
      },
      error: (err: AppError) => {
        this.errorMessage$.next(err.message)
      }
    })
  }
}
