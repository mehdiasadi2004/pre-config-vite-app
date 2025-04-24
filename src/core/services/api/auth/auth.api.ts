import {
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import  { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import Http from "../../interceptor/index.interceptor";
import {
  IPropRegister,
  TPropGetEmail,
  TPropResetPassword,
  TSendVerificationResponse,
  TTwoStepVerification,
  TUserLogin,
  TUserLoginResponse,
  TVerifyMessage,
  TVerifyMessageResponse,
} from "./type";

// ** Redux Imports

import { setItem } from "../../common/storage.service";

// ** Utils Imports
import {
  dismissToast,
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../utils/toast.utils";

import { useNavigate } from "react-router-dom";

const loginUser = (
  user: TUserLogin
): Promise<AxiosResponse<TUserLoginResponse>> => Http.post("/Sign/Login", user);

const twoStepVerification = (
  data: TTwoStepVerification
): Promise<AxiosResponse> =>
  Http.post("/Sign/LoginTwoStep", data.user, {
    params: {
      vrifyCode: data.verifyCode,
    },
  });

// this should use in components
export const useLoginUser = (
  setUserPhoneNumber?: Dispatch<SetStateAction<string>>
): UseMutationResult<
  AxiosResponse<TUserLoginResponse, any>,
  unknown,
  TUserLogin,
  unknown
> => {
  // ** Hooks

  return useMutation({
    mutationFn: loginUser,
    onMutate: () => showLoadingToast("در حال ورود ...", "loginLoading"),
    onSuccess: (user) => {
      dismissToast("loginLoading");

      const { success, token, message, phoneNumber, id } = user.data;

      if (success) {
        if (token) {
          setItem("userId", id);
          setItem("token", token);

          showSuccessToast("شما با موفقیت وارد سایت شدید 👋");
          window.location.pathname = "/panel";
        } else {
          showSuccessToast(message, "loginSendTwoStepVerificationSuccess");
          if (setUserPhoneNumber) setUserPhoneNumber(phoneNumber);
        }
      } else showErrorToast(message);
    },
    onError: () => {
      dismissToast("loginLoading");
      showErrorToast("مشکلی در ورود شما به سایت به وجود آمد !");
    },
  });
};

export const useTwoStepVerification = (): UseMutationResult<
  AxiosResponse<TUserLoginResponse, any>,
  Error,
  TTwoStepVerification,
  // ** Hooks
  unknown
> => {

  return useMutation({
    mutationFn: twoStepVerification,
    onMutate: () =>
      showLoadingToast("در حال تایید ...", "twoStepVerificationLoading"),
    onSuccess: (user) => {
      dismissToast("twoStepVerificationLoading");
      const { success, token, message } = user.data;

      if (success) {
        if (token) {
          setItem("token", token);
          showSuccessToast("شما با موفقیت وارد سایت شدید 👋");
          window.location.pathname = "/panel";
        } else showSuccessToast(message);
      } else showErrorToast(message);
    },
    onError: () => {
      dismissToast("twoStepVerificationLoading");
    },
  });
};

// ** Register
const sendVerification = async (
  phoneNumber: string
): Promise<AxiosResponse<TSendVerificationResponse>> =>
  await Http.post("/Sign/SendVerifyMessage", { phoneNumber });

export const useSendVerification = (): UseMutationResult<
  AxiosResponse<TSendVerificationResponse, any>,
  any,
  string,
  unknown
> => {

  return useMutation({
    mutationFn: sendVerification,
    onMutate: () =>
      showLoadingToast("در حال ارسال کد تایید ...", "sendVerificationLoading"),
    onSuccess: ({ data }) => {
      dismissToast("sendVerificationLoading");

      if (data.success && data.message !== "درخواست نامعتبر") {
        showSuccessToast("کد تایید با موفقیت ارسال شد 👌");
      } else showErrorToast(data.message!);
    },
    onError: (error) => {
      const {
        response: {
          data: { ErrorMessage },
        },
      } = error;

      const renderErrorMessage =
        ErrorMessage.length === 1 ? ErrorMessage[0] : ErrorMessage[1];

      dismissToast("sendVerificationLoading");
      showErrorToast(renderErrorMessage);
    },
  });
};

const verifyMessage = async (
  data: TVerifyMessage
): Promise<AxiosResponse<TVerifyMessageResponse>> =>
  Http.post("/Sign/VerifyMessage", data);

export const useVerifyMessage = (): UseMutationResult<
  AxiosResponse<TVerifyMessageResponse>,
  any,
  TVerifyMessage,
  unknown
> => {

  return useMutation({
    mutationFn: verifyMessage,
    onMutate: () =>
      showLoadingToast("در حال تایید کد ...", "verifyMessageLoading"),
    onSuccess: ({ data }) => {
      dismissToast("verifyMessageLoading");

      if (data.success) {
        showSuccessToast("کد با موفقیت تایید شد 👌");
      } else showErrorToast(data.message);
    },
    onError: (error) => {
      const {
        response: {
          data: { ErrorMessage },
        },
      } = error;

      dismissToast("verifyMessageLoading");
      showErrorToast(ErrorMessage[0]);
    },
  });
};

export const Register = async (
  body: IPropRegister
): Promise<AxiosResponse<TSendVerificationResponse>> =>
  await Http.post("/Sign/Register", body);

export const useRegister = (): UseMutationResult<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AxiosResponse<TSendVerificationResponse, any>,
  any,
  IPropRegister,
  unknown
> => {
  const Navigate = useNavigate();

  return useMutation({
    mutationFn: Register,
    onMutate: () => showLoadingToast("در حال ثبت نام   ...", "register"),
    onSuccess: ({ data }) => {
      dismissToast("register");

      if (data.success && data.message !== "درخواست نامعتبر") {
        setTimeout(() => {
          Navigate("/login");
        }, 1500);
        showSuccessToast("ثبت نام با موفقیت انجام شد👌");
      } else showErrorToast(data.message!);
    },
    onError: (error) => {
      const {
        response: {
          data: { ErrorMessage },
        },
      } = error;

      const renderErrorMessage =
        ErrorMessage.length === 1 ? ErrorMessage[0] : ErrorMessage[1];

      dismissToast("register");
      showErrorToast(renderErrorMessage);
    },
  });
};

// ** Forget Password
export const ForgetPass = async (
  body: TPropGetEmail
): Promise<AxiosResponse<TSendVerificationResponse>> =>
  await Http.post("/Sign/ForgetPassword", body);

export const useGetEmail = (): UseMutationResult<
  AxiosResponse<TSendVerificationResponse, any>,
  any,
  TPropGetEmail,
  unknown
> => {

  return useMutation({
    mutationFn: ForgetPass,
    onMutate: () =>
      showLoadingToast("در حال ارسال لینک  ...", "sendLinkToEmail"),
    onSuccess: ({ data }) => {
      dismissToast("sendLinkToEmail");

      if (data.success && data.message !== "درخواست نامعتبر") {
        setTimeout(() => {
        }, 1500);
        showSuccessToast(" ایمیل با موفقیت ارسال شد 👌");
      } else showErrorToast(data.message!);
    },
    onError: (error) => {
      const {
        response: {
          data: { ErrorMessage },
        },
      } = error;

      const renderErrorMessage =
        ErrorMessage.length === 1 ? ErrorMessage[0] : ErrorMessage[1];

      dismissToast("sendLinkToEmail");
      showErrorToast(renderErrorMessage);
    },
  });
};

interface TVerifyEmail {
  config: string;
  dispatch: Dispatch<any>;
  setUserId: Dispatch<SetStateAction<number | undefined>>;
  setResetValue: Dispatch<SetStateAction<string | undefined>>;
}

export const useVerifyEmail = async ({
  config,
  setUserId,
  setResetValue,
}: TVerifyEmail) => {
  try {
    const response = await Http.get<TSendVerificationResponse>(
      `/Sign/Reset/${config}`
    );
    if (response.data.success) {
      setTimeout(() => {
      }, 1500);
      showSuccessToast(response.data.errors[0]);
      setUserId(response.data.id);
      setResetValue(response.data.message);
    }
    return response.data;
  } catch (error: any) {
    console.log(error);
    const renderErrorMessage = error.length === 1 ? error[0] : error[1];
    showErrorToast(renderErrorMessage);
  }
};

// ** Reset Password
export const ResetPass = async (
  body: TPropResetPassword
): Promise<AxiosResponse<TSendVerificationResponse>> =>
  await Http.post("/Sign/Reset", body);

export const useResetPassWord = (): UseMutationResult<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AxiosResponse<TSendVerificationResponse, any>,
  any,
  TPropResetPassword,
  unknown
> => {
  const Navigate = useNavigate();

  return useMutation({
    mutationFn: ResetPass,
    onMutate: () =>
      showLoadingToast("در حال تغییر رمز عبور   ...", "changePassword"),
    onSuccess: ({ data }) => {
      dismissToast("changePassword");

      if (data.success && data.message !== "درخواست نامعتبر") {
        setTimeout(() => {
          Navigate("/login");
        }, 1500);
        showSuccessToast("رمز عبور با موفقیت تغییر کرد👌");
      } else showErrorToast(data.message!);
    },
    onError: (error) => {
      const {
        response: {
          data: { ErrorMessage },
        },
      } = error;

      const renderErrorMessage =
        ErrorMessage.length === 1 ? ErrorMessage[0] : ErrorMessage[1];

      dismissToast("changePassword");
      showErrorToast(renderErrorMessage);
    },
  });
};
