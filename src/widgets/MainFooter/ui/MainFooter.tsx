import { Button, Typography } from 'antd';

import cls from './style.module.scss';

import logo from '@/app/assets/logo.png';

const { Title } = Typography;

export const MainFooter = () => {
  return (
    <div className={cls.footer}>
      <div className={cls.footerContent}>
        <div className={cls.logoInfo}>
          <img src={logo} className={cls.img} />
          <Title className={cls.title} level={2} italic>
            SyncTalk
          </Title>
        </div>
        <Button type="primary" size="large">
          Зарегистрироваться
        </Button>
      </div>
    </div>
  );
};
