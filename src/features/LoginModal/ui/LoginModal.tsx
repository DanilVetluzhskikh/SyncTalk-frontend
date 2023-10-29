import { Input, Modal } from 'antd';
import { ChangeEvent, useState } from 'react';

import cls from './style.module.scss';
import {
  getLoginEmail,
  getLoginErrors,
  getLoginIsLoading,
  getLoginPassword,
  setLoginEmail,
  setLoginErrors,
  setLoginPassword,
} from '../model/slice/loginSlice';
import { loginByEmail } from '../model/services/loginByEmail';

import { validateEmail, validateNotEmpty } from '@/shared/utils/validators';
import { Errors } from '@/entities/Errors';
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';

interface LoginModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const LoginModal = (props: LoginModalProps) => {
  const { isOpen, handleClose } = props;

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const email = useAppSelector(getLoginEmail);
  const password = useAppSelector(getLoginPassword);
  const errors = useAppSelector(getLoginErrors);
  const isLoading = useAppSelector(getLoginIsLoading);
  const dispatch = useAppDispatch();

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setLoginEmail(e.target.value));
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setLoginPassword(e.target.value));
  };

  const handleLogin = async () => {
    const newErrors = [
      validateEmail(email),
      validateNotEmpty(email, 'почты'),
      validateNotEmpty(password, 'пароля'),
    ];

    dispatch(setLoginErrors(newErrors));

    if (!newErrors.filter(el => el).length) {
      const result = await dispatch(
        loginByEmail({
          email,
          password,
        }),
      );

      if (result.meta.requestStatus === 'fulfilled') {
        window.location.reload();
      }
    }
  };

  const isErrorEmail = errors[0]?.length || errors[1]?.length;
  const isErrorPassword = errors[2]?.length;

  return (
    <Modal
      title="Авторизация"
      open={isOpen}
      onCancel={handleClose}
      okText="Войти"
      cancelText="Закрыть"
      onOk={handleLogin}
      keyboard
      centered
      cancelButtonProps={{
        disabled: isLoading,
      }}
      okButtonProps={{
        disabled: isLoading,
      }}
    >
      <div className={cls.content}>
        <Input
          placeholder="Почта"
          value={email}
          onChange={handleChangeEmail}
          size="large"
          type="email"
          status={isErrorEmail ? 'error' : undefined}
        />
        <Input.Password
          placeholder="Пароль"
          size="large"
          value={password}
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible,
          }}
          onChange={handleChangePassword}
          status={isErrorPassword ? 'error' : undefined}
        />
        <Errors errors={errors} />
      </div>
    </Modal>
  );
};
