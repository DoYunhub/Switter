import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "routes/Profile";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Redirect from="*" to="/" />
          </> //로그인되면 보일 화면, Redirect는 profile화면에서 로그아웃했을시 profile화면에 머물지 않고 /(home) 화면으로 돌아감.
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Redirect from="*" to="/" />
          </>
          //로그아웃시 보일 화면
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
