import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowSizeService {
  private isMobileResolution: boolean;

  constructor() {
    if (window.innerWidth < 1024) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  public getIsMobileResolution(): boolean {
    return this.isMobileResolution;
  }
}
