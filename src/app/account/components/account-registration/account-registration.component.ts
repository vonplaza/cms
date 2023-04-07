import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/core/models/User';

export interface registerForm{
  firstName: string,
  middleName: string,
  lastName:string,
  email: string,
  contactNo:string,
  birthDate:string,
  address:string,
}

@Component({
  selector: 'app-account-registration',
  templateUrl: './account-registration.component.html',
  styleUrls: ['./account-registration.component.css']
})

export class AccountRegistrationComponent {
  srcResult: any;
  showDep=false;
  role='';

  user!:User

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
    console.log(form.value);
    
  }
}
