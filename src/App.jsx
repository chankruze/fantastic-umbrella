import PageNotFound from "components/commons/PageNotFound";
import News from "components/News";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes";

const App = () => (
  <Switch>
    <Route exact component={News} path={routes.news.index} />
    <Redirect exact from={routes.root} to={routes.news.index} />
    <Route component={PageNotFound} path="*" />
  </Switch>
);

export default App;
