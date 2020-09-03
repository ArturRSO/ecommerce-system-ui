import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  // public subject that controls a personalized loader
  public showLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // counter to control multi calls
  private loaderCounter = 0;

  constructor() { }

  // Include +1 to loader counter
  public enable(): void {
    this.loaderCounter++;
    this.verifyLoader();
  }

  // Remove 1 from loader counter
  public disable(): void {
    this.loaderCounter--;
    this.verifyLoader();
  }

  // Reset loader conter to 0
  public reset(): void {
    this.loaderCounter = 0;
    this.verifyLoader();
  }

  // Verify and emmit loader subject
  private verifyLoader(): void {
    const hasLoader = this.showLoader.getValue();

    if (!hasLoader && this.loaderCounter > 0) {
      this.showLoader.next(true);
    } else if (hasLoader && this.loaderCounter === 0) {
      this.showLoader.next(false);
    }
  }
}
