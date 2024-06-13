import { User } from "../store/context";

export const isAuthenticated = (): boolean => {
  const auth_token = localStorage.getItem("auth_token");
  return !!auth_token;
};

export const setToken = (token: string): void => {
  return localStorage.setItem("auth_token", token);
};

export const setUserToLocalStorage = (user: User) => {
  return localStorage.setItem("user_data", JSON.stringify(user));
};

export const removeToken = (): void => {
  localStorage.clear();
};

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user_data");
  return JSON.parse(user as string);
};
