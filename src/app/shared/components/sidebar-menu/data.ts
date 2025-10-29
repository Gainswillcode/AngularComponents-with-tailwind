export interface RouteProps {
  title: string;
  href: string;
  icon: string;
  group?: boolean;
  card?: {
    className: string;
    images: { light: string; dark: string };
  };
  roles?: string[]; // 👈 rôles autorisés
}

export const components: RouteProps[] = [
  {
    title: 'menu.dashboard',
    href: '/admin/dashboard',
    icon: `/images/dashboard.png`,
    roles: ['admin', 'user'], // visible pour ces rôles
  },
  {
    title: 'menu.company',
    href: '/admin/companies',
    icon: `/images/entreprise.png`,
    roles: ['admin', 'user'], // visible pour ces rôles
  },
  {
    title: 'menu.institut',
    href: '/admin/institutions',
    icon: `/images/organisation.png`,
    roles: ['admin', 'user'], // visible pour ces rôles
  },
  {
    title: 'menu.ranch',
    href: '/admin/ranch',
    icon: `/images/ranch.png`,
    roles: ['admin', 'user'], // visible pour ces rôles
  },

  {
    title: 'menu.camp',
    href: '/admin/campements',
    icon: `/images/icons8-camp-53.png`,
    roles: ['admin', 'user'], // visible pour ces rôles
  },
  {
    title: 'menu.troupeau',
    href: '/admin/troupeaux',
    icon: `/images/troupeau.png`,
    roles: ['admin', 'user'], // visible pour ces rôles
  },
  {
    title: 'menu.cow',
    href: '/admin/bovins',
    icon: `/images/vache (3).png`,
    roles: ['admin', 'user'], // visible pour ces rôles
  },


];
