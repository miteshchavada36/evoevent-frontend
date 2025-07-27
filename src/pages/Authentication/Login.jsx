import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./AuthSchema";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import * as AuthApi from "../../api/AuthApi";
import { addAuthData } from "../../store/slices/authUser/authUserSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["rememberMe"]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (cookies.rememberMe) {
      setValue("email", cookies.email);
      setValue("password", atob(cookies.token));
      setValue("rememberMe", cookies.rememberMe);
    }
  }, []);

  const formSubmit = async (formData) => {
    setIsLoading(true);
    setErrorMessage("");

    if (formData.rememberMe) {
      setCookie("rememberMe", true, { path: "/" });
      setCookie("email", formData.email, { path: "/" });
      setCookie("token", btoa(formData.password), { path: "/" });
    } else {
      removeCookie("rememberMe");
      removeCookie("email");
      removeCookie("token");
    }

    try {
      const { data } = await AuthApi.login({
        email: formData.email,
        password: formData.password,
      });

      if (data) {
        dispatch(
          addAuthData({
            id: data.user?.id,
            name: data.user?.name,
            email: data.user?.email,
            auth: true,
            token: data.token,
          })
        );
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(formSubmit)} className="login-card">
        <h2 className="login-title">
          Sign in to <span className="brand-text">EvoEvent</span>
        </h2>
        <p className="login-subtitle">
          Welcome to evento please enter your login details below
        </p>

        {errorMessage && <p className="error-msg">{errorMessage}</p>}

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            placeholder="Ex. johondoe@mailsample.com"
            {...register("email")}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          {errors.email && (
            <span className="invalid-feedback">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="●●●●●●●●"
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          {errors.password && (
            <span className="invalid-feedback">{errors.password.message}</span>
          )}
        </div>

        <div className="form-remember">
          <label>
            <input type="checkbox" {...register("rememberMe")} />
            Remember me
          </label>
        </div>

        <button className="login-button" type="submit" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Log in"}
        </button>

        <div className="forgot-password">
          <a href="/forgot-password">Forgot the password ?</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
