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
import { Subscription, interval } from 'rxjs';
import {
  trigger,
  transition,
  style,
  animate,
  state,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('500ms', style({ opacity: 0 }))]),
    ]),
    trigger('openClose', [
      state(
        'open',
        style({
          height: '100%',
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          height: '0%',
          opacity: 0.5,
        })
      ),
      transition('open => closed', [
        animate(
          '3s ease',
          keyframes([
            style({ height: '0%', offset: 0 }),
            style({ height: '30%', offset: 0.2 }),
            style({ height: '60%', offset: 0.5 }),
            style({ height: '90%', offset: 0.8 }),
            style({ height: '100%', offset: 1.0 }),
          ])
        ),
      ]),
      transition('closed => open', [
        animate(
          '3s ease',
          keyframes([
            style({ height: '100%', offset: 0 }),
            style({ height: '90%', offset: 0.1 }),
            style({ height: '80%', offset: 0.2 }),
            style({ height: '70%', offset: 0.3 }),
            style({ height: '60%', offset: 0.4 }),
            style({ height: '50%', offset: 0.5 }),
            style({ height: '40%', offset: 0.6 }),
            style({ height: '30%', offset: 0.7 }),
            style({ height: '20%', offset: 0.8 }),
            style({ height: '10%', offset: 0.9 }),
            style({ height: '0%', offset: 1.0 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  //Variables
  nav_menus!: Menu[];
  services!: Service[];
  amc!: Service[];
  subscription!: Subscription;
  show_menu: boolean = false;

  //Forms
  contact_form!: FormGroup;

  constructor(private form_builder: FormBuilder) {}

  ngOnInit(): void {
    this.nav_menus = [...nav_menus];

    this.services = [...service];

    this.contact_form = this.form_builder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required]),
    });

    this.amc = amc.slice(0, 3);

    this.subscription = interval(5000).subscribe({
      next: () => {
        this.nextOrPrevious('next');
      },
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

      if (this.show_menu) {
        this.show_menu = false;
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

  nextOrPrevious(type: 'next' | 'previous') {
    let amc_values = [...amc];
    let current_index = amc_values.findIndex((x) => x.id == this.amc[0].id);
    this.amc = [];
    setTimeout(() => {
      if (type == 'next') {
        if (current_index + 3 === amc.length) {
          current_index = 0;
        } else {
          current_index += 3;
        }
      } else {
        if (current_index - 3 < 0) {
          current_index = amc.length - 3;
        } else {
          current_index -= 3;
        }
      }

      this.amc = amc_values.slice(current_index, current_index + 3);
    }, 500);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
