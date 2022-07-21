import { useCallback } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BasePage from "./components/BasePage";
import ROUTES, { routeEnum } from "./routes";

function App() {
  const getRoutes = useCallback(
    (isAuthed: boolean) =>
      Object.values(ROUTES)
        .filter(
          (r) =>
            (r.type === routeEnum.GUEST && !isAuthed) ||
            (r.type === routeEnum.AUTHED && isAuthed) ||
            r.type === routeEnum.FREE
        )
        .map((route) => (
          <Route
            key={route.path}
            exact={route.exact}
            path={route.path}
            // eslint-disable-next-line react/jsx-no-bind
            render={(props) => {
              const Page = route.component;
              return <Page {...props} />;
            }}
          />
        )),
    []
  );

  const renderNotFound = useCallback(() => <h1>Not Found!</h1>, []);

  return (
    <BrowserRouter>
      <BasePage>
        <Switch>
          {getRoutes(false)}
          <Route component={renderNotFound} />
        </Switch>
      </BasePage>
    </BrowserRouter>
  );
}

export default App;
