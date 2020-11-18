import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {

  private store: any;

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
  }

  getInitialData(): any {


  }

}
