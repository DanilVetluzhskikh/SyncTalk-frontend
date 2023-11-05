import { Avatar, Button, Typography } from 'antd';
import { UserOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { memo } from 'react';

import cls from './style.module.scss';

import { OtherUserType } from '@/shared/types/shared';

const { Text } = Typography;

interface UserCardProps {
  user: OtherUserType;
}

export const UserCard = memo((props: UserCardProps) => {
  const {
    user: { avatarURL, isFriend, username, requestFriend },
  } = props;

  return (
    <div className={cls.card}>
      <Avatar
        className={cls.avatar}
        icon={<UserOutlined className={cls.defaultAvatar} />}
        src={avatarURL}
        shape="square"
      />
      <div className={cls.info}>
        <Text className={cls.username}>{username}</Text>
        {isFriend ? (
          <Button className={cls.actionBtn} type="primary">
            Удалить из друзей
          </Button>
        ) : requestFriend ? (
          <Button className={cls.actionBtn} type="primary">
            Отозвать заявку из друзей
          </Button>
        ) : (
          <Button className={cls.actionBtn} type="primary">
            Отправить заявку в друзья
          </Button>
        )}
      </div>
      {isFriend && <CheckCircleOutlined className={cls.friendIcon} />}
    </div>
  );
});

UserCard.displayName = 'UserCard';
