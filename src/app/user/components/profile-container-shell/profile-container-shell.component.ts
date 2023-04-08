import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile-container-shell',
  templateUrl: './profile-container-shell.component.html',
  styleUrls: ['./profile-container-shell.component.css']
})
export class ProfileContainerShellComponent {
  profileForm: FormGroup
  constructor(private authService: AuthService, 
              private fb: FormBuilder,
              private userService: UserService
              ){
    this.profileForm = fb.group({
    name: ['', Validators.required, ],
    address: ['', Validators.required],
    birthDate: ['', Validators.required],
    phoneNo: ['', Validators.required],
    })
  }
  as:boolean = true

  currentUser!:User
  profile$ = this.authService.getCurrentUser()
  .pipe(
    tap(user => {
      this.currentUser = user
      console.log(user);
      
      if(user.profile){
        console.log(user.profile)
        
        this.profileForm.patchValue({
          name: user.profile.name,
          phoneNo: user.profile.phone_no,
          address: user.profile.address,
          birthDate: user.profile.birth_date,
        })
      }
    })
  )

  submit(){
    this.userService.updateCurrentUser(this.profileForm.value)
    .subscribe(
      data => {
        this.authService.updateProfile(data)
      }
    )
  }

  changePass(form: NgForm){
    console.log(form.value);
    this.userService.changePass(form.value).subscribe(
      data => console.log(data)
    )
  }
}
