import { Button, Popover } from 'antd';
import { useState } from 'react';

import cls from './style.module.scss';

import { LogoutButton } from '@/entities/LogoutButton';

export const BottomPopover = () => {
  const [hovered, setHovered] = useState(false);

  const handleHoverChange = (open: boolean) => {
    setHovered(open);
  };

  const renderContent = () => {
    return (
      <div className={cls.menuContent}>
        <LogoutButton />
      </div>
    );
  };

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
