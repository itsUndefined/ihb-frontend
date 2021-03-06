import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { minLength } from '../../helper/length.validator';
import { ToastsService } from 'src/app/toasts/toasts.service';

@Component({
  selector: 'ihb-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  resetPasswordForm: FormGroup;
  private passwordChange: Subscription;
  private confirmPasswordChange: Subscription;
  private userInitiatedChange = true;
  private token: string;

  @ViewChild('successToast') successToastTemplate: TemplateRef<{}>;


  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastsService: ToastsService
  ) {
    this.token = this.activatedRoute.snapshot.params.tokenId;
  }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        minLength(8)
      ]),
      newPassword: new FormControl(null, [
        Validators.required
      ])
    });

    this.passwordChange = this.resetPasswordForm.controls.password.valueChanges.subscribe(() => this.checkSamePassword());
    this.confirmPasswordChange = this.resetPasswordForm.controls.newPassword.valueChanges.subscribe(() => {
      if (this.userInitiatedChange) {
        this.checkSamePassword();
      }
    });
  }

  ngOnDestroy() {
    this.passwordChange.unsubscribe();
    this.confirmPasswordChange.unsubscribe();
  }

  onResetPasswordSubmit() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.authService.resetPassword(this.token, this.resetPasswordForm.value.password).subscribe(() => {
      this.toastsService.show(this.successToastTemplate, { className: 'bg-success text-light', delay: 10000 });
      this.router.navigateByUrl('auth/login');
    });
  }

  checkSamePassword() {
    this.userInitiatedChange = false;
    const confirmPasswordControl = this.resetPasswordForm.get('newPassword') as FormControl;
    if (this.resetPasswordForm.get('password')?.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ invalidConfirmation: true });
    } else {
      confirmPasswordControl.updateValueAndValidity();
    }
    this.userInitiatedChange = true;

  }

  get getPassword() {
    return this.resetPasswordForm.get('password');
  }
}
