import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import AnimatedComponent from "../Animation/AnimatedComponent";
import useIsMobile from "../../hooks/useIsMobile";

function AuthenticationBasic(props) {
  const { isSticky = false, isTight = false } = props;
  const isMobile = useIsMobile();
  const app_name = process.env.REACT_APP_NAME;
  return (
    <AnimatedComponent
      className="page page-center animate-fade"
      animationClass="in"
    >
      <div
        className={`text-center mb-4 mt-4 ${isSticky ? "fixed-top mt-4" : ""}`}
      >
        <Link to={"/"} className="navbar-brand navbar-brand-autodark">
          <div>
            <img
              src={Logo}
              height={isMobile ? 100 : 60}
              alt={`${app_name} Logo`}
            />
          </div>
          <div className={`${isMobile ? "d-none" : ""}`}>
            <div
              className="text-start text-primary mb-1"
              style={{ fontSize: "26px" }}
            >
              {app_name}
            </div>
          </div>
        </Link>
      </div>
      <div
        className={`container container-tight py-4 ${
          isTight ? "container-signup" : ""
        }`}
      >
        {props.children}
      </div>

      <div className="text-center mb-4 fs-3"></div>
    </AnimatedComponent>
  );
}
export default AuthenticationBasic;
