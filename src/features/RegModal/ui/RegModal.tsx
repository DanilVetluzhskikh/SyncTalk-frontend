import { Input, Modal } from 'antd';
import { ChangeEvent, useState } from 'react';

import cls from './style.module.scss';

import {
  validateEmail,
  validateFieldsMatch,
  validateNotEmpty,
} from '@/shared/utils/validators';
import { Errors } from '@/entities/Errors';

interface RegModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const RegModal = (props: RegModalProps) => {
  const { isOpen, handleClose } = props;

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [passwordRepVisible, setPasswordRepVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleLogin = () => {
    setErrors([
      validateEmail(email),
      validateNotEmpty(email, 'почты'),
      validateNotEmpty(password, 'пароля'),
      validateNotEmpty(repeatPassword, 'подтверждение пароля'),
      validateFieldsMatch(repeatPassword, password),
    ]);

    if (!errors.filter(err => err).length) {
      console.log(email, password, repeatPassword);
    }
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeRepeatPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
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
      okText="Войти"
      cancelText="Закрыть"
      onOk={handleLogin}
      keyboard
      centered
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
