import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UserService } from 'src/app/core/services/user.service';
import { InputMasks } from 'src/app/utils/enums/input-masks.enum';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public documentMask = InputMasks.CPF;
  public user: any;

  constructor(
    private loader: LoaderService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  private getProfile(): void {
    this.loader.enable();

    this.userService.getProfile().subscribe(response => {
      this.loader.disable();

      this.user = response.data;
    });
  }
}
