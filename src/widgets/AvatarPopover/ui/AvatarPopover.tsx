import { Avatar, Badge, Button, Popover, Space } from 'antd';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import cls from './style.module.scss';

import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';
import { selectUserInfo } from '@/app/store/slices/userSlice';
import { statuses, statusesImg } from '@/shared/mocks/arrays';
import { changeStatusService } from '@/app/services/changeStatusService';

export const AvatarPopover = () => {
  const [hovered, setHovered] = useState(false);

  const { user, profile, isLoading } = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();

  const handleHoverChange = (open: boolean) => {
    setHovered(open);
  };

  const handleChangeStatus = (status: string) => {
    dispatch(changeStatusService({ status }));
    setHovered(false);
  };

  const renderContentStatuses = () => (
    <div className={cls.statuses}>
      {statuses.map(status => {
        const CurrentImg = statusesImg[status.enum];

        return (
          <Button
            key={status.title}
            type="text"
            size="large"
            style={{
              background: status.color,
            }}
            disabled={isLoading}
            onClick={() => handleChangeStatus(status.title)}
          >
            <div className={cls.contentStatus}>
              <CurrentImg /> {status.title}
            </div>
          </Button>
        );
      })}
    </div>
  );

  const renderContentPopover = () => (
    <div className={cls.contentPopover}>
      <Popover
        onOpenChange={handleHoverChange}
        title="Изменить статус"
        placement="right"
        open={hovered}
        content={renderContentStatuses()}
      >
        <div className={cls.status}>Статус: {profile.status}</div>
      </Popover>
    </div>
  );

  const currentStatus = statuses.find(el => el.title === profile.status).enum;

  return (
    <Popover
      title={user.username}
      placement="topRight"
      content={renderContentPopover}
      overlayClassName={cls.test}
    >
      <Link to="/profile">
        <Space size="large">
          <Badge dot status={currentStatus}>
            <Avatar
              size={50}
              icon={<UserOutlined />}
              src={profile.avatarURL}
              shape="square"
            />
          </Badge>
        </Space>
      </Link>
    </Popover>
  );
};
