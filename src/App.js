import React from "react";
import {
  NavLink,
  Redirect,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import PageNotFound from "./components/PageNotFound";
import Pomofocus from "./components/Pomofocus";
import Wireframes from "./components/Wireframes";

const App = () => {
  return (
    <>
      <div>
        <NavLink
          className="p-2 m-2"
          exact
          activeClassName="underline font-bold "
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          exact
          className="p-2 m-2"
          activeClassName="underline font-bold "
          to="/pomofocus"
        >
          Pomofocus
        </NavLink>
      </div>
      <Switch>
        <Route exact component={Wireframes} path={"/wireframs"} />
        <Route exact component={Pomofocus} path={"/pomofocus"} />
        <Redirect exact from="/" to="/wireframs" />
        <Route exact component={PageNotFound} path={"*"} />
      </Switch>
    </>
  );
};

export default App;
