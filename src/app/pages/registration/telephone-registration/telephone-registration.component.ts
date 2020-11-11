import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { TelephoneService } from 'src/app/core/services/telephone.service';

@Component({
  selector: 'app-telephone-registration',
  templateUrl: './telephone-registration.component.html',
  styleUrls: ['./telephone-registration.component.scss']
})
export class TelephoneRegistrationComponent implements OnInit {

  public form: FormGroup;
  public update = false;

  constructor(
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    private modalService: ModalService,
    private router: Router,
    private telephoneService: TelephoneService
  ) { }

  ngOnInit(): void {
  }

}
