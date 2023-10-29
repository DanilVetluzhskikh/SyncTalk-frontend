export interface RegisterSchema {
  email: string;
  password: string;
  repeatPassword: string;
  isLoading: boolean;
  errors: string[];
}
