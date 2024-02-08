import { Component, OnInit } from '@angular/core';
import { Menu } from './interface/menu.types';
import { Service } from './interface/service.types';
import { nav_menus } from './constants/nav-menus.constant';
import { service } from './constants/services.constant';
import { amc } from './constants/amc.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  //Variables
  nav_menus!: Menu[];
  services!: Service[];
  amc!: Service[];

  constructor() {}

  ngOnInit(): void {
    this.nav_menus = [...nav_menus];

    this.services = [...service];

    this.amc = [...amc];
  }

  /**
   * to scroll to block
   *
   * @param menu
   */
  onClickMenu(menu: Menu) {
    const element = document.getElementById(menu.element_ref);
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const bodyRect = document.body.getBoundingClientRect();
      const offset = elementRect.top - bodyRect.top - 50;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }
}
