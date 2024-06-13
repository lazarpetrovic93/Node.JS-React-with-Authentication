import { setToken, setUserToLocalStorage } from "../helpers";
import Types from "../store/actionTypes";
import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "react";

export const login = async (
  password: string,
  email: string,
  dispatch: Dispatch<any>,
  navigate: NavigateFunction
) => {
  try {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    };
    const resp = await fetch("http://localhost:8080/auth/login", settings);
    const json = await resp.json();
    const { data } = json;
    setToken(data.user.token);
    setUserToLocalStorage(data.user);
    dispatch({
      type: Types.SetAuthData,
      payload: data.user,
    });
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};

export const register = async (
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  dispatch: Dispatch<any>,
  navigate: NavigateFunction
) => {
  try {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        first_name,
        last_name,
      }),
    };
    await fetch("http://localhost:8080/auth/register", settings);
    await login(password, email, dispatch, navigate);
  } catch (err) {
    console.log(err);
  }
};
