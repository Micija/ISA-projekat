import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-email-confirmation-resend',
  templateUrl: './email-confirmation-resend.component.html',
  styleUrls: ['./email-confirmation-resend.component.css']
})
export class EmailConfirmationResendComponent {

  email = ''

  constructor(private authService: AuthService) {}

  confirm() {
    console.log(this.email)
    if (!this.email) {
      alert('Polje mora da bude popunjeno')
    } else {
      this.authService.resendEmailConfirmation(this.email)
      .subscribe({
        next: data => {
          alert('Vas zahtev je obradjen')
        }
      }
      )
    }
  }

}
