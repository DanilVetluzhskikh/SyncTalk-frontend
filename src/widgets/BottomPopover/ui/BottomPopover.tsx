import { Button, Popover } from 'antd';
import { useState } from 'react';

import cls from './style.module.scss';

import { useAppDispatch } from '@/app/hooks/redux';
import { userLogout } from '@/app/services/userLogout';

export const BottomPopover = () => {
  const [hovered, setHovered] = useState(false);

  const dispatch = useAppDispatch();

  const handleHoverChange = (open: boolean) => {
    setHovered(open);
  };

  const handleLogout = () => {
    dispatch(userLogout());
  };

  const renderContent = () => (
    <div className={cls.menuContent}>
      <Button type="primary" onClick={handleLogout}>
        Выйти
      </Button>
    </div>
  );

  return (
    <Popover
      style={{ width: 500 }}
      content={renderContent()}
      title={<div className={cls.title}>Меню</div>}
      trigger="hover"
      open={hovered}
      onOpenChange={handleHoverChange}
    >
      <Button type="primary" className={cls.btn} size="large">
        +
      </Button>
    </Popover>
  );
};
