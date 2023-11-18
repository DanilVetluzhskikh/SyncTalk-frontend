import { ReactNode, useRef, useState } from 'react';
import { Tour } from 'antd';

import cls from './style.module.scss';

import { SideBar } from '@/widgets/SideBar';
import { BottomPopover } from '@/widgets/BottomPopover';
import { stepsStart } from '@/shared/mocks/steps';
import { STEPS_START } from '@/shared/mocks/guid';

interface SideBarLayoutProps {
  children?: ReactNode;
}

export const SideBarLayout = ({ children }: SideBarLayoutProps) => {
  const [open, setOpen] = useState<boolean>(!localStorage.getItem(STEPS_START));

  const refSideBar = useRef<HTMLDivElement | null>(null);
  const refContent = useRef<HTMLDivElement | null>(null);
  const refPopover = useRef<HTMLDivElement | null>(null);

  const handleFinish = () => {
    localStorage.setItem(STEPS_START, '1');
  };

  return (
    <div className={cls.container}>
      <div className={cls.sideBar} ref={refSideBar}>
        <SideBar />
      </div>
      <div className={cls.content} ref={refContent}>
        {children}
      </div>
      <Tour
        type="primary"
        open={open}
        onClose={() => setOpen(false)}
        steps={stepsStart(refSideBar, refContent, refPopover)}
        onFinish={handleFinish}
      />
      <div className={cls.popover} ref={refPopover}>
        <BottomPopover />
      </div>
    </div>
  );
};
