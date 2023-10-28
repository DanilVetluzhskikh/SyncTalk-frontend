import { Button, Typography } from 'antd';
import { useState } from 'react';

import cls from './style.module.scss';

import logo from '@/app/assets/logo.png';
import { LoginModal } from '@/features/LoginModal';
import { RegModal } from '@/features/RegModal';

const { Title } = Typography;

export const Navbar = () => {
  const [isOpenAuth, setIsOpenAuth] = useState<boolean>(false);
  const [isOpenReg, setIsOpenReg] = useState<boolean>(false);

  const handleCloseAuth = () => setIsOpenAuth(false);
  const handleOpenAuth = () => setIsOpenAuth(true);

  const handleCloseReg = () => setIsOpenReg(false);
  const handleOpenReg = () => setIsOpenReg(true);

  return (
    <div className={cls.navBar}>
      <div className={cls.logoContainer}>
        <img src={logo} alt="Logo" className={cls.logo} />
        <Title className={cls.title} italic>
          SyncTalk
        </Title>
      </div>
      <div className={cls.actions}>
        <Button type="primary" size="large" onClick={handleOpenAuth}>
          Авторизация
        </Button>
        <Button type="primary" size="large" onClick={handleOpenReg}>
          Регистрация
        </Button>
      </div>
      <LoginModal isOpen={isOpenAuth} handleClose={handleCloseAuth} />
      <RegModal isOpen={isOpenReg} handleClose={handleCloseReg} />
    </div>
  );
};
