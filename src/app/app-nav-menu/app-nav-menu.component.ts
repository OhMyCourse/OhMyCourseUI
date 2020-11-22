import { Component, OnInit } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {}

  setItemActive(item: MenuItem) {
    this.items.forEach((i) => (i.isActive = false));
    this.loginitems.forEach((i) => (i.isActive = false));
    item.isActive = true;
  }

  isLogin = false;
}
