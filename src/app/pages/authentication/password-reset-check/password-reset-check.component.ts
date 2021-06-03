import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { PasswordUpdate } from 'src/app/utils/models/password-update.model';

@Component({
  selector: 'app-password-reset-check',
  templateUrl: './password-reset-check.component.html',
  styleUrls: ['./password-reset-check.component.scss']
})
export class PasswordResetCheckComponent implements OnInit {

  constructor(
    private loader: LoaderService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.checkTokenStatus();
  }

  private checkTokenStatus(): void {
    const token = this.route.snapshot.paramMap.get('token');

    if (token) {
      this.loader.enable();
      this.userService.getPasswordResetTokenStatus(token).subscribe(response => {
        this.loader.disable();
        if (response.success) {
          if (response.data) {
            this.sessionStorageService.setObject('passwordUpdate', new PasswordUpdate(token, true));
            this.navigateToPage('cadastro/senha');

          } else {
            this.modalService.openSimpleModal('Atenção', response.message, [{ text: 'OK' }]).subscribe(() => {
              this.navigateToPage('auth/login');
            });
          }
        } else {
          this.modalService.openSimpleModal('Atenção', 'Token para recuperação de senha inválido!', [{ text: 'OK' }]).subscribe(() => {
            this.navigateToPage('auth/login');
          });
        }
      });

    } else {
      this.modalService.openSimpleModal('Atenção', 'Link para recuperação de senha inválido.', [{ text: 'OK' }]).subscribe(() => {
        this.navigateToPage('auth/login');
      });
    }
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }
}
