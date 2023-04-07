import { Component } from '@angular/core';

export interface registerForm{
  firstName: string,
  middleName: string,
  lastName:string,
  email: string,
  contactNo:string,
  bday:string,
  fullAddress:string,


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
    if(this.role=='Committee Chair'){
      this.showDep=true;
    }
    else if(this.role=='Committee Members'){
      this.showDep=true;
    }
    else{
      this.showDep=false;
    }
  }

  submitForm(){
    
  }
}
