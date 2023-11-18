import {
  validateEmail,
  validateFieldsMatch,
  validateNotEmpty,
  invalidEmailMessage,
  invalidEqualsMessage,
  invalidNotEmptyMessage,
} from './validators';

describe('shared/lib/validators/validateEmail', () => {
  test('Валидация на некорректный email', () => {
    expect(validateEmail('testmail.ru')).toBe(invalidEmailMessage);

    expect(validateEmail('test@mailru')).toBe(invalidEmailMessage);

    expect(validateEmail('test22222@')).toBe(invalidEmailMessage);
  });

  test('Валидация на корректный email', () => {
    expect(validateEmail('test@mail.ru')).toBe(undefined);

    expect(validateEmail('test@gmail.com')).toBe(undefined);

    expect(validateEmail('test@c123.ru')).toBe(undefined);
  });
});

describe('shared/lib/validators/validateFieldsMatch', () => {
  test('Валидация на не равные поля', () => {
    expect(validateFieldsMatch('test-field', 'test-field-1')).toBe(
      invalidEqualsMessage,
    );
  });

  test('Валидация на равные поля', () => {
    expect(validateFieldsMatch('test-field', 'test-field')).toBe(undefined);
  });
});

describe('shared/lib/validators/validateNotEmpty', () => {
  test('Валидация на пустое значение без поля', () => {
    expect(validateNotEmpty('')).toBe(invalidNotEmptyMessage());

    expect(validateNotEmpty('  ')).toBe(invalidNotEmptyMessage());
  });

  test('Валидация на пустое значение c полем', () => {
    expect(validateNotEmpty('', 'name')).toBe(invalidNotEmptyMessage('name'));

    expect(validateNotEmpty('  ', 'name')).toBe(invalidNotEmptyMessage('name'));
  });

  test('Валидация на не пустое значение без поля', () => {
    expect(validateNotEmpty('test')).toBe(undefined);

    expect(validateNotEmpty('test')).toBe(undefined);
  });

  test('Валидация на не пустое значение c полем', () => {
    expect(validateNotEmpty('test', 'name')).toBe(undefined);

    expect(validateNotEmpty('test', 'name')).toBe(undefined);
  });
});
