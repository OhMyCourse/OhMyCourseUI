import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { MenuItem } from './MenuItem';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './app-nav-menu.component.html',
  styleUrls: ['./app-nav-menu.component.scss'],
})
export class AppNavMenuComponent implements OnInit {
  items: MenuItem[] = [
    new MenuItem('Home', true, ''),
    new MenuItem('Catalog', false, 'course/all'),
    new MenuItem('Create', false, 'course/create'),
    new MenuItem('My courses', false, 'user/courses'),
    new MenuItem('Profile', false, 'user/profile'),
  ];

  loginitems: MenuItem[] = [
    new MenuItem('Log in', false, 'user/login'),
    new MenuItem('Register', false, 'user/register'),
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((value) => {
      if (value instanceof NavigationStart) {
        this.setItemActiveByName(value.url);
      }
    });
  }

  setItemActive(item: MenuItem) {
    this.items.forEach((i) => (i.isActive = false));
    this.loginitems.forEach((i) => (i.isActive = false));
    item.isActive = true;
  }

  private setItemActiveByName(name: string) {
    this.items.forEach((i) => (i.isActive = false));
    this.loginitems.forEach((i) => (i.isActive = false));

    if (name.includes('constructor')) {
      this.items[2].isActive = true;
    } else if (name.includes('course/edit')) {
      this.items[2].isActive = true;
    } else if (name.includes('course/create')) {
      this.items[2].isActive = true;
    } else if (name.includes('course/all')) {
      this.items[1].isActive = true;
    } else if (name.includes('course/enrollment')) {
      this.items[1].isActive = true;
    } else if (name.includes('user/register')) {
      this.loginitems[1].isActive = true;
    } else if (name.includes('user/login')) {
      this.loginitems[0].isActive = true;
    } else if (name.includes('user/profile')) {
      this.items[4].isActive = true;
    } else if (name.includes('user/courses')) {
      this.items[3].isActive = true;
    } else {
      this.items[0].isActive = true;
    }
  }

  isLogin = false;
}
