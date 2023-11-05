import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Tooltip } from 'antd';

import cls from './style.module.scss';

import logo from '@/app/assets/logo.png';
import { privateNavigation } from '@/shared/mocks/arrays';
import { AvatarPopover } from '@/widgets/AvatarPopover';

export const SideBar = () => {
  return (
    <div className={cls.sideBar}>
      <div className={cls.imgContainer}>
        <img src={logo} className={cls.logo} />
      </div>
      <div className={cls.navContainer}>
        {privateNavigation.map(navItem => (
          <Tooltip title={navItem.title} placement="right" key={navItem.to}>
            <NavLink
              to={navItem.to}
              className={({ isActive }) =>
                classNames(cls.link, { [cls.activeLink]: isActive })
              }
            >
              {<navItem.img className={cls.navItem} />}
            </NavLink>
          </Tooltip>
        ))}
      </div>
      <div className={cls.profile}>
        <AvatarPopover />
      </div>
    </div>
  );
};
