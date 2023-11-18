export const invalidEmailMessage = 'Неверный формат email.';
export const invalidEqualsMessage = 'Поля не совпадают.';
export const invalidNotEmptyMessage = (field?: string) =>
  `Поле${field ? ` ${field} ` : ' '}не может быть пустым.`;

export const validateEmail = (email: string): string | undefined => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!email.match(regex)) {
    return invalidEmailMessage;
  }
};

export const validateFieldsMatch = (
  value1: string,
  value2: string,
): string | undefined => {
  if (value1 !== value2) {
    return invalidEqualsMessage;
  }
};

export const validateNotEmpty = (
  value: string,
  field?: string,
): string | undefined => {
  if (!value.trim()) {
    return invalidNotEmptyMessage(field);
  }
};
