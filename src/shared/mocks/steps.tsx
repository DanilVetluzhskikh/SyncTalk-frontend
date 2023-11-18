import { TourProps } from 'antd';

export const stepsStart = (
  ref1: React.MutableRefObject<HTMLDivElement>,
  ref2: React.MutableRefObject<HTMLDivElement>,
  ref3: React.MutableRefObject<HTMLDivElement>,
): TourProps['steps'] => [
  {
    title: 'Навигация',
    description: 'Здесь находится навигационная панель',
    target: () => ref1.current,
    placement: 'left',
    nextButtonProps: {
      children: <>Вперед</>,
    },
  },
  {
    title: 'Контент',
    description: 'Здесь контент страницы',
    target: () => ref2.current,
    placement: 'center',
    nextButtonProps: {
      children: <>Вперед</>,
    },
    prevButtonProps: {
      children: 'Назад',
    },
  },
  {
    title: 'Меню',
    description: 'Быстрое меню',
    target: () => ref3.current,
    placement: 'topLeft',
    nextButtonProps: {
      children: <>Закрыть</>,
    },
    prevButtonProps: {
      children: 'Назад',
    },
    mask: {
      style: {
        bottom: 0,
        right: 0,
      },
    },
  },
];
