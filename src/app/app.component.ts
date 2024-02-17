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
import { MatDrawer } from '@angular/material/sidenav';

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
   * @param drawer
   */
  onClickMenu(menu: Menu, drawer: MatDrawer) {
    const element = document.getElementById(menu.element_ref);
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const bodyRect = document.body.getBoundingClientRect();
      const offset = elementRect.top - bodyRect.top - 50;
      window.scrollTo({ top: offset, behavior: 'smooth' });
      if (drawer.opened) {
        drawer.close();
      }
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
        window.open(
          'https://www.google.com/maps/dir/11.0015281,75.9579352/IGNITEX+INFORMATION+TECHNOLOGY+LLC/@16.8944854,43.8523226,4z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3e5f437da3f6745d:0xa9db0f0beef1d510!2m2!1d55.2827909!2d25.2179236?hl=en-ae&entry=ttu',
          '_blank'
        );
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

  /**
   * for sending mail
   *
   * @returns
   */
  sentMail() {
    if (this.contact_form.invalid) {
      return;
    }

    window.location.href = `mailto:info@ignitextec.com?subject=${encodeURIComponent(
      this.contact_form.get('name')?.value
    )}&body=${encodeURIComponent(this.contact_form.get('message')?.value)}`;

    this.contact_form.reset();
  }
}
