import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import {Login, Home} from "./Pages";
import ProtectedRoute from "./ProtectedRoute";

export const Router = () => {
  return (
    <>
      <Switch>
        <Route path="/login" exact component={Login} />
        <ProtectedRoute path="/" exact component={Home} />
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
