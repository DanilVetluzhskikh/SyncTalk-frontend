import { ImgBlockType } from '@/shared/types/shared';
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
