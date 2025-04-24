
export type TUserLogin = {
  phoneOrGmail: string;
  password: string;
  rememberMe: boolean;
};

export type TUserLoginResponse = {
  apiKey: string;
  phoneNumber: string;
  id: number;
  token: string;
  roles: string[];
  message: string;
  success: boolean;
  errors: any;
  userId: string;
};

export type TTwoStepVerification = {
  user: TUserLogin;
  verifyCode: string;
};

export type TSendVerificationResponse = {
  id?: number;
  message?: string;
  success?: string | boolean;
  errors?: any;
  ErrorType?: string;
  ErrorMessage?: string[];
  StatusCode?: number;
};

export type TVerifyMessage = {
  phoneNumber: string;
  verifyCode: string;
};

export type TVerifyMessageResponse = {
  success: string;
  message: string;
};

export interface TPropGetEmail {
  email: string;
  baseUrl: string;
}

export interface TField {
  label: string;
  placeHolder: string;
  name: "newPassword" | "resetValue";
  toggle: () => void;
  isVisible: boolean;
}

export interface TPropResetPassword {
  userId: number | undefined;
  newPassword: string;
  resetValue: string | undefined;
}

export interface IPropRegister {
  password: string;
  gmail: string;
  phoneNumber: string;
}
