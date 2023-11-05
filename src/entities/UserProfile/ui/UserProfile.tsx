import { EditOutlined, UserOutlined, SaveOutlined } from '@ant-design/icons';
import { Avatar, Button, Typography, Input, message } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';

import cls from './style.module.scss';

import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';
import {
  changeAvatar,
  changeUsername,
  selectUserInfo,
} from '@/app/store/slices/userSlice';
import { updateUserInfoService } from '@/app/services/updateUserInfoService';

const { Text } = Typography;

export const UserProfile = () => {
  const [editable, setEditable] = useState(false);
  const [messageApi, messageContext] = message.useMessage();

  const { user, isLoading, error, profile } = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();

  const handleChangeEditable = async () => {
    if (editable) {
      const res = await dispatch(updateUserInfoService());
      if (res.meta.requestStatus !== 'rejected') {
        setEditable(prev => !prev);
      }
    } else {
      setEditable(prev => !prev);
    }
  };

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeUsername(e.target.value));
  };

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeAvatar(e.target.value));
  };

  useEffect(() => {
    if (error.length) {
      messageApi.error(error);
    }
  }, [error]);

  return (
    <div>
      {messageContext}
      <Button
        type="primary"
        className={cls.edit}
        onClick={handleChangeEditable}
        loading={isLoading}
      >
        {editable ? <SaveOutlined /> : <EditOutlined />}
      </Button>
      <div className={cls.userBlock}>
        <Avatar
          className={cls.avatar}
          icon={<UserOutlined />}
          src={profile.avatarURL}
        />
        <div className={cls.userInfo}>
          <div className={cls.block}>
            <Text className={cls.text}>Имя пользователя:</Text>
            {editable ? (
              <Input
                value={user.username}
                placeholder="Имя пользователя"
                onChange={handleChangeUsername}
              />
            ) : (
              <Text className={cls.text}>{user.username}</Text>
            )}
          </div>
          <div className={cls.block}>
            <Text className={cls.text}>Почта:</Text>
            <Text className={cls.text}>{user.email}</Text>
          </div>
        </div>
      </div>
      <Input
        value={profile.avatarURL}
        onChange={handleChangeAvatar}
        disabled={!editable}
        placeholder="URL на ваш аватар"
        className={cls.inputUrl}
      />
    </div>
  );
};
