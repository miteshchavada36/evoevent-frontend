import React, { Fragment, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import Loader from "../components/Loader";
import InjectProtectedNode from "./injectProtectedNode";

import {
  addAuthData,
  resetAuthData,
} from "../store/slices/authUser/authUserSlice";
import "react-toastify/dist/ReactToastify.css";
import UnauthorizedNode from "./UnauthorizedNode";

const Layout = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authSelector = useSelector((state) => state.app.authUserReducer);

  let isRefreshing = false; // Prevent multiple refresh requests
  let refreshSubscribers = []; // Queue of requests waiting for a refreshed token

  // Axios Request Interceptor
  axios.interceptors.request.use(
    (req) => {
      req.baseURL = process.env.REACT_APP_API_PREFIX;
      if (authSelector?.tokens?.accessToken) {
        req.headers = {
          "Content-Type": "application/json",
          type: "web",
          Authorization: `Bearer ${authSelector.tokens?.accessToken}`,
          ...req.headers,
        };
      }
      return req;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Axios Response Interceptor
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            isRefreshing = false;
            refreshSubscribers = [];
            toast.error("Invalid credentials, Please log in again.");
            dispatch(resetAuthData());
            navigate("/login");
            return Promise.reject(error);
          } catch (refreshError) {
            isRefreshing = false;
            refreshSubscribers = [];
            toast.error("Session expired. Please log in again.");
            dispatch(resetAuthData());
            navigate("/login");
            return Promise.reject(refreshError);
          }
        }

        return new Promise((resolve) => {
          resolve(axios(originalRequest));
        });
      }

      return Promise.reject(error);
    }
  );

  return (
    <Fragment>
      {authSelector.auth ? (
        <InjectProtectedNode authSelector={authSelector} />
      ) : (
        <Suspense fallback={<Loader />}>
          <UnauthorizedNode />
        </Suspense>
      )}

      <ToastContainer
        pauseOnFocusLoss
        draggable={false}
        hideProgressBar={true}
        theme="colored"
      />
    </Fragment>
  );
});

export default Layout;
