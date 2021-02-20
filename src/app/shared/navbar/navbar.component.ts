import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public navbarOpen = false;
  public options: any;
  public searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.options = [
      {
        name: 'aaaaa'
      },
      {
        name: 'bbbbb'
      },
      {
        name: 'ccccc'
      }
    ];
  }

  get f() {
    return this.searchForm.controls;
  }

  public navbarClick(option: any): void {
    // TO DO
    console.log(option);
  }

  public search(): void {
    // TO DO
    console.log(this.f.searchField.value);
  }

  public toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
  }

  private buildForm(): void {
    this.searchForm = this.formBuilder.group({
      searchField: ['']
    });
  }
}
