import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Pomodoro from "./pages/Pomodoro/Pomodoro";
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
