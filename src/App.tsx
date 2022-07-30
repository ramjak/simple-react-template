import { useCallback } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BasePage from "./components/BasePage";
import ROUTES from "./routes";
import { UserContextProvider } from "./contexts/UserContext";

function App() {
  const getRoutes = useCallback(
    (isAuthed: boolean) =>
      Object.values(ROUTES)
        .filter(
          (r) =>
            (r.type === "GUEST" && !isAuthed) ||
            (r.type === "PRIVATE" && isAuthed) ||
            r.type === "PUBLIC"
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
      <UserContextProvider>
        <BasePage>
          <Switch>
            {getRoutes(false)}
            <Route component={renderNotFound} />
          </Switch>
        </BasePage>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
