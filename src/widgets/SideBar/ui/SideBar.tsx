import cls from './style.module.scss';

import logo from '@/app/assets/logo.png';

export const SideBar = () => {
  return (
    <div className={cls.sideBar}>
      <button className={cls.imgContainer}>
        <img src={logo} className={cls.logo} />
      </button>
    </div>
  );
};
