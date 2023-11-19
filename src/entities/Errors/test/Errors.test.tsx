import { render, screen } from '@testing-library/react';

import { Errors } from '../ui/Errors';

describe('entities/Errors', () => {
  test('Рендер компонента с пустым количеством ошибок', () => {
    render(<Errors errors={[]} />);
    expect(screen.queryByText('/./')).toBeNull();
  });

  test('Рендер компонента с ошибками', () => {
    const errors: string[] = ['Ошибка1', 'Ошибка2', 'Ошибка3'];
    render(<Errors errors={errors} />);

    errors.forEach((error: string) => {
      expect(screen.getByText(error)).toBeInTheDocument();
    });
  });

  test('Рендер компонента с пустыми строками', () => {
    const errors: string[] = ['Ошибка 1', ' ', 'Ошибка 4', null, undefined];
    render(<Errors errors={errors} />);
    const errorsContainer = screen.getByTestId('errors-container');

    // Не пустые ошибка
    expect(screen.getByText(errors[0])).toBeInTheDocument();
    expect(screen.getByText(errors[2])).toBeInTheDocument();

    // Пустые ошибки
    expect(screen.queryByText(errors[1])).toBeNull();

    // Проверка что в контейнере только две ошибки
    const renderedErrors = errorsContainer.querySelectorAll('span');
    expect(renderedErrors).toHaveLength(2);
  });
});
