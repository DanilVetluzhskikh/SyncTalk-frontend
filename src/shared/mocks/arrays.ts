import { MessageFilled, ContactsFilled } from '@ant-design/icons';
import {
  CheckCircleOutlined,
  WarningOutlined,
  StopOutlined,
  ExclamationCircleOutlined,
  ConsoleSqlOutlined,
} from '@ant-design/icons';

import { NavigationItem } from '../types/router';

import { ImgBlockType, StatusItem } from '@/shared/types/shared';
import mem3 from '@/app/assets/mem3.jpg';
import mem1 from '@/app/assets/mem1.jpg';
import mem2 from '@/app/assets/mem2.jpg';

export const mainPageBlocks: ImgBlockType[] = [
  {
    img: mem3,
    title: 'Общайтесь с друзьями, демонстрируйте экран, включайте камеру',
    paragraph:
      'Серверы SyncTalk делятся на тематические каналы, где можно работать вместе, делиться новостями и просто обсуждать свой день, не переполняя групповой чат.',
  },
  {
    img: mem1,
    title: 'Место, где легко общаться',
    paragraph:
      'Напишите или позвоните своему другу и общайтесь сколько вам угодно.',
  },
  {
    img: mem2,
    title: 'От группы до сообщества',
    paragraph:
      'Создавайте группы с бесконечной вложенностью и разделяйте все тематически.',
  },
];

export const privateNavigation: NavigationItem[] = [
  {
    to: '/',
    img: MessageFilled,
    title: 'Личные сообщения',
  },
  {
    to: '/servers',
    img: ConsoleSqlOutlined,
    title: 'Сервера связи',
  },
  {
    to: '/users',
    img: ContactsFilled,
    title: 'Пользователи',
  },
];

export const statusesImg: Record<
  string,
  React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement>>
> = {
  success: CheckCircleOutlined,
  warning: WarningOutlined,
  default: ExclamationCircleOutlined,
  error: StopOutlined,
};

export const statuses: StatusItem[] = [
  {
    title: 'В сети',
    enum: 'success',
    color: '#237804',
  },
  {
    title: 'Нет на месте',
    enum: 'warning',
    color: '#d4b106',
  },
  {
    title: 'Невидимка',
    enum: 'default',
    color: '#8c8c8c',
  },
  {
    title: 'Не беспокоить',
    enum: 'error',
    color: '#a8071a',
  },
];
