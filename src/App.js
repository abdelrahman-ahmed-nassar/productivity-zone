import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Pomodoro from "./pages/Pomodoro";
import { Switch, Redirect, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Switch>
        <Route path="/productivity-zone" exact>
          <Home />
        </Route>
        <Route path="/pomodoro">
          <Pomodoro />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
