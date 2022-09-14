import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import {Login, Home, Signup, ForgotPassword, ResetPassword} from "./Pages";
import ProtectedRoute from "./ProtectedRoute";

export const Router = () => {
  return (
    <>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        <Route path="/reset-password/:token" exact component={ResetPassword} />
        <ProtectedRoute path="/" exact component={Home} />
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
