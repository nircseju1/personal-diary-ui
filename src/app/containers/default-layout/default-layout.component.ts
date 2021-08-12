import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import {JwtTokenStorageService} from "../../views/authentication/service/jwt-token-storage.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  userName: string = '';
  loggedUserName: string = '';
  loggedUserEmail: string = '';
  loggedUserPhotoName: string = '';

  constructor(private tokenStorageService: JwtTokenStorageService) {
    this.userName = tokenStorageService.getUsername();
    this.loggedUserName = tokenStorageService.getLoggedUserName();
    this.loggedUserEmail = tokenStorageService.getLoggedUserEmail();
    this.loggedUserPhotoName = tokenStorageService.getLoggedUserPhotoName();

    navItems.forEach((item) => {
      if (item.children !== undefined) {
        item.children.forEach((child, index) => {
          if (child.attributes.roles.some(v => tokenStorageService.getAuthorities().indexOf(v) >= 0)) {
          } else {
            child.class = 'hideUrl';
          }
        });
      }
    });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.tokenStorageService.signOut();
  }
}
