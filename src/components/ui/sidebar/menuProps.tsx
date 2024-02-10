import { MenuItemProps } from '@/type/sidebarMenu';

import { BiHome as HomeIcon, BiSolidUser as UserIcon, BiPlusCircle as CirclePlusIcon } from 'react-icons/bi';


const iconSize:number = 20;

export const MenuFunc = (user:string) => {
    const MENU_ITEMS: MenuItemProps[] = [
        {
          title: 'Home',
          href: '/',
          icon: <HomeIcon size={iconSize} />,
          isShow: true,
        },
        {
            title: 'Create',
            href: '#',
            icon: <CirclePlusIcon size={iconSize} />,
            isShow: true,
          },
        { 
          title: 'Profile',
          href: `/${user}`,
          icon: <UserIcon size={iconSize} />,
          isShow: true,
        },
      ]; 
      
    return MENU_ITEMS
}

// export const MENU_ITEMS: MenuItemProps[] = [
//   {
//     title: 'Home',
//     href: '/',
//     icon: <HomeIcon size={iconSize} />,
//     isShow: true,
    
//   },
//   {
//     title: 'Discover',
//     href: '/discover',
//     icon: <PencilIcon size={iconSize} />,
//     isShow: true,
//   },
//   { 
//     title: 'Profile',
//     href: `/`,
//     icon: <PencilIcon size={iconSize} />,
//     isShow: true,
//   },
//   { 
//     title: 'Pendataan Buku',
//     href: '/buku',
//     icon: <PencilIcon size={iconSize} />,
//     isShow: true,
//   },
//   {
//     title: 'Pendataan Kategori',
//     href: '/kategori',
//     icon: <PencilIcon size={iconSize} />,
//     isShow: true,
//   },
// ]; 