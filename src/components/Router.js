import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
          </> //로그인되면 보일 화면
        ) : (
          <Route exact path="/">
            <Auth />
          </Route> // 비로그인시 보일 화면
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
