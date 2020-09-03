import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public options: any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadOptions();
  }

  private loadOptions(): void {
    console.log('TO DO');
  }

  private navigateToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  private scrollToElement(id: string) {
    const element = document.querySelector(`#${id}`);

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }

  public navClick (option: any) {
    if (option.samePage) {
      this.scrollToElement(option.elementId);

    } else {
      this.navigateToPage(option.route);
    }
  }
}
