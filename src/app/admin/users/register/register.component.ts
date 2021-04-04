// importacoes do angular
import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

// importacoes internas
import { RegisterUserService } from './register-user.service';
import { User } from './../../../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('form', { static: false }) divForm: ElementRef;

  UserForm: FormGroup;
  UserUpdate: User;
  ImgProfile = '';
  IdUser: any;
  showGenericError = false;
  showLoadingMsg = true;
  showSuccess = false;
  showInvalidUser = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private registerUserService: RegisterUserService,
    @Inject(DOCUMENT) private document: Document) {

  }

  ngOnInit() {
    this.UserForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      job: ['', Validators.maxLength(20)],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
    });

    this.route.params.subscribe(async params => {
      console.log('id usuario: ' + params.id);
      this.IdUser = params.id;
      if (params.id === undefined) {
        console.log('id invalido');
        this.showLoadingMsg = false;
        this.showInvalidUser = true;
      } else {
        const loadUserData = await this.registerUserService.getSingleUser(this.IdUser).catch(error => {
          this.showInvalidUser = true;
        });
        if (loadUserData !== undefined && loadUserData !== null) {
          this.UserForm.controls.firstName.setValue(loadUserData.data.first_name);
          this.UserForm.controls.lastName.setValue(loadUserData.data.last_name);
          this.UserForm.controls.email.setValue(loadUserData.data.email);
          this.ImgProfile = loadUserData.data.avatar;
        }
        this.showLoadingMsg = false;
      }
    });
  }


  async onSubmit() {
    this.setUserObject();
    this.submitted = true;

    if (this.UserForm.invalid) {
      this.document.getElementsByClassName('page-content')[0].scrollTop = 0;
      this.divForm.nativeElement.classList.add('invalid-form');
      this.showLoadingMsg = false;
      return;
    }

    this.showLoadingMsg = true;
    this.divForm.nativeElement.classList.remove('invalid-form');

    try {
      const resultUpdate = await this.registerUserService.updateUser(this.UserUpdate);

      if (resultUpdate.updatedAt !== undefined) {
        this.showLoadingMsg = false;
        this.showSuccess = true;
      }

    } catch (error) {
      this.showLoadingMsg = false;
    }
  }

  setUserObject() {
    this.UserUpdate = new User();
    this.UserUpdate.Id = this.IdUser;
    this.UserUpdate.Name = this.UserForm.controls.firstName.value + ' ' + this.UserForm.controls.lastName.value;
    this.UserUpdate.Email = this.UserForm.controls.email.value;
    this.UserUpdate.Job = this.UserForm.controls.job.value;
  }
}
