import { Input, Modal } from 'antd';
import { ChangeEvent, useState } from 'react';

import cls from './style.module.scss';
import {
  getRegisterEmail,
  getRegisterErrors,
  getRegisterIsLoading,
  getRegisterPassword,
  getRegisterRepeatPassword,
  setRegisterEmail,
  setRegisterErrors,
  setRegisterPassword,
  setRegisterRepeatPassword,
} from '../model/slice/registerSlice';
import { register } from '../model/services/register';

import {
  validateEmail,
  validateFieldsMatch,
  validateNotEmpty,
} from '@/shared/utils/validators';
import { Errors } from '@/entities/Errors';
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';

interface RegModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const RegModal = (props: RegModalProps) => {
  const { isOpen, handleClose } = props;

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [passwordRepVisible, setPasswordRepVisible] = useState<boolean>(false);

  const email = useAppSelector(getRegisterEmail);
  const password = useAppSelector(getRegisterPassword);
  const repeatPassword = useAppSelector(getRegisterRepeatPassword);
  const errors = useAppSelector(getRegisterErrors);
  const isLoading = useAppSelector(getRegisterIsLoading);
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    const newErrors = [
      validateEmail(email),
      validateNotEmpty(email, 'почты'),
      validateNotEmpty(password, 'пароля'),
      validateNotEmpty(repeatPassword, 'подтверждение пароля'),
      validateFieldsMatch(repeatPassword, password),
    ];

    dispatch(setRegisterErrors(newErrors));

    if (!newErrors.filter(err => err).length) {
      const result = await dispatch(
        register({
          email,
          password,
        }),
      );

      if (result.meta.requestStatus === 'fulfilled') {
        window.location.reload();
      }
    }
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setRegisterEmail(e.target.value));
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setRegisterPassword(e.target.value));
  };

  const handleChangeRepeatPassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setRegisterRepeatPassword(e.target.value));
  };

  const isErrorEmail = errors[0]?.length || errors[1]?.length;
  const isErrorPassword = errors[2]?.length;
  const isErrorRepeatPassword = errors[3]?.length;
  const isMatchError = errors[4]?.length;

  return (
    <Modal
      title="Авторизация"
      open={isOpen}
      onCancel={handleClose}
      okText="Зарегистрироваться"
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
          status={isErrorPassword || isMatchError ? 'error' : undefined}
        />
        <Input.Password
          placeholder="Повторите пароль"
          size="large"
          value={repeatPassword}
          visibilityToggle={{
            visible: passwordRepVisible,
            onVisibleChange: setPasswordRepVisible,
          }}
          onChange={handleChangeRepeatPassword}
          status={isErrorRepeatPassword || isMatchError ? 'error' : undefined}
        />
        <Errors errors={errors} />
      </div>
    </Modal>
  );
};
