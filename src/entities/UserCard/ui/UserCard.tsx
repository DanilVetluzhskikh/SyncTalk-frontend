import { Avatar, Typography, message } from 'antd';
import { UserOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { memo, useEffect } from 'react';

import cls from './style.module.scss';
import {
  getUserCardError,
  getUserCardIsLoading,
} from '../model/slice/userCardSlice';
import { ActionButton } from './components/ActionButton';

import { OtherUserType } from '@/shared/types/shared';
import { useAppSelector } from '@/app/hooks/redux';

const { Text } = Typography;

interface UserCardProps {
  avatarURL: OtherUserType['avatarURL'];
  isFriend: OtherUserType['isFriend'];
  username: OtherUserType['username'];
  requestFriend: OtherUserType['requestFriend'];
  id: OtherUserType['id'];
  isSentRequest: OtherUserType['isSentRequest'];
}

export const UserCard = memo((props: UserCardProps) => {
  const { avatarURL, isFriend, username, requestFriend, id, isSentRequest } =
    props;
  const [messageApi, contextHolder] = message.useMessage();
  const isLoading = useAppSelector(getUserCardIsLoading);
  const error = useAppSelector(getUserCardError);

  useEffect(() => {
    if (error) {
      messageApi.error(error);
    }
  }, [error, messageApi]);

  return (
    <div className={cls.card}>
      {contextHolder}
      <Avatar
        icon={<UserOutlined />}
        src={avatarURL}
        shape="square"
        className={cls.avatar}
      />
      <div className={cls.info}>
        <Text className={cls.username}>{username}</Text>
        <ActionButton
          id={id}
          isFriend={isFriend}
          requestFriend={requestFriend}
          isSentRequest={isSentRequest}
          isLoading={isLoading}
        />
      </div>
      {isFriend && <CheckCircleOutlined className={cls.friendIcon} />}
    </div>
  );
});

UserCard.displayName = 'UserCard';
