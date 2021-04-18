import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";

export const Public = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}
