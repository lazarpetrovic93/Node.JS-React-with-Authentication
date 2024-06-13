import React from "react";
import "./App.css";
import { AppProvider } from "./store/context";
import { Navigate, useRoutes } from "react-router-dom";
import AuthGuard from "./guards/AuthGuard";
import { Layout } from "./components/Layout";
import { LoginScreen } from "./components/LoginScreen";
import { RegistrationPage } from "./components/RegistrationPage";

export default function App(): JSX.Element {
  function Routes() {
    const elements = useRoutes([
      {
        path: "/authentication/login",
        element: <LoginScreen />,
      },
      {
        path: "/",
        element: (
          <AuthGuard>
            <Layout />
          </AuthGuard>
        ),
      },
      { path: "/registration", element: <RegistrationPage /> },
      {
        path: "/logout",
        element: <Navigate to="/authentication/login" replace />,
      },
    ]);
    return elements;
  }

  return <Routes />;
}
