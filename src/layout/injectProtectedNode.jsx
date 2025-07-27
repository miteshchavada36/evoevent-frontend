import React, { Suspense, useEffect } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";

import Loader from "../components/Loader";
import useLogin from "../hooks/useLogin";
import Header from "../components/Header";

import { PageWrapper } from "../components/SiteWrapper";
import Sidebar from "../components/Sidebar";
import AnimatedComponent from "../components/Animation/AnimatedComponent";
import { ROLES } from "../common/constants";
import { useSelector } from "react-redux";
import Login from "../pages/Authentication/Login";

const InjectProtectedNode = ({ authSelector }) => {
  const routes = useLogin(authSelector.auth);
  const isSidebarVisible = useSelector(
    (state) => state.app.sidebarReducer.isVisible
  );

  return (
    <AnimatedComponent className="page animate-fade" animationClass="in">
      {/* <Sidebar /> */}
      <Header />
      {/* <Login/> */}
      <PageWrapper className={`${isSidebarVisible ? "" : "sidebar-none"}`}>
        <Suspense fallback={<Loader top="64px" height="calc(100% - 64px)" />}>
          {useRoutes(routes)}
        </Suspense>
      </PageWrapper>
    </AnimatedComponent>
  );
};

export default InjectProtectedNode;
