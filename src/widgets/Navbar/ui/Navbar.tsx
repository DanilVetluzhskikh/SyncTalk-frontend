import { Button, Typography } from 'antd';

import cls from './style.module.scss';

import logo from '@/app/assets/logo.png';

const { Title } = Typography;

export const Navbar = () => {
  return (
    <div className={cls.navBar}>
      <div className={cls.logoContainer}>
        <img src={logo} alt="Logo" className={cls.logo} />
        <Title className={cls.title} italic>
          SyncTalk
        </Title>
      </div>
      <div className={cls.actions}>
        <Button type="primary" size="large">
          Авторизация
        </Button>
        <Button type="primary" size="large">
          Регистрация
        </Button>
      </div>
    </div>
  );
};
