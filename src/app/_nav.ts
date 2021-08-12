import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    title: true,
    name: 'Personal Diary'
  },
  {
    attributes: {roles: ['ROLE_USER']},
    name: 'Category',
    url: '/category',
    icon: 'icon-settings'
  },
  {
    attributes: {roles: ['ROLE_USER']},
    name: 'Personal Note',
    url: '/personal-note',
    icon: 'icon-settings'
  }
];
