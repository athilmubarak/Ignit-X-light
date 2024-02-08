import { Component, OnInit } from '@angular/core';
import { Menu } from './interface/menu.types';
import { Service } from './interface/service.types';
import { nav_menus } from './constants/nav-menus.constant';
import { service } from './constants/services.constant';
import { amc } from './constants/amc.constant';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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

  //Forms
  contact_form!: FormGroup;

  constructor(private form_builder: FormBuilder) {}

  ngOnInit(): void {
    this.nav_menus = [...nav_menus];

    this.services = [...service];

    this.amc = [...amc];

    this.contact_form = this.form_builder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required]),
    });
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

  /**
   * while on clicking social buttons
   *
   * @param type
   */
  onClickSocialIcons(type: 'location' | 'mail_to' | 'phone' | 'instagram') {
    switch (type) {
      case 'location':
        break;

      case 'mail_to':
        window.location.href = `mailto:info@ignitextec.com`;
        break;

      case 'phone':
        window.location.href = 'tel:0568968905';
        break;

      case 'instagram':
        window.open(
          'https://www.instagram.com/ignitex_it?igsh=c21ob2F4c3B3b2Nn',
          '_blank'
        );
        break;
    }
  }
}
