import React, {lazy, Suspense} from "react";
import {useRoutes} from "hookrouter";

import Navbar from "./components/navbar";
const Home     = lazy(() => import("./views/home"));
const Game    = lazy(() => import("./views/game/"));
const Games    = lazy(() => import("./views/games/"));
const Eco      = lazy(() => import("./views/eco/"));
const NotFound = lazy(() => import("./views/not_found"));

// Hookrouter
const buildRoutes = () => ({
  "/": () => <Home />,
  "/games/:id": ({id}) => <Game id={id} />,
  "/games": () => <Games />,
  "/eco": () => <Eco />,
});

const App = () => {
  const routeResult = useRoutes(buildRoutes());
  return (
    <>
    <header><Navbar /></header>
    <main role="main">
      <Suspense fallback={<div>Loading...</div>}>
        { routeResult || <NotFound /> }
      </Suspense>
    </main>
    <footer>

    </footer>
    </>
  )
}

export default App;
