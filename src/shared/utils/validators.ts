export const validateEmail = (email: string): string | undefined => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!email.match(regex)) {
    return 'Неверный формат email.';
  }
};

export const validateFieldsMatch = (
  value1: string,
  value2: string,
): string | undefined => {
  if (value1 !== value2) {
    return 'Поля не совпадают.';
  }
};

export const validateNotEmpty = (
  value: string,
  field?: string,
): string | undefined => {
  if (!value.trim()) {
    return `Поле ${field} не может быть пустым.`;
  }
};
