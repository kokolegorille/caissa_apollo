import React, {lazy, Suspense} from "react";
import {useRoutes, A} from "hookrouter";

// Bootstrap Icons
import Logo from "../../node_modules/bootstrap-icons/icons/emoji-smile.svg";

// Lazy Views
const Home = lazy(() => import("./views/home"));
const Games = lazy(() => import("./views/games"));
const Game = lazy(() => import("./views/game"));
const Eco = lazy(() => import("./views/eco"));
const About = lazy(() => import("./views/about"));
const NotFound = lazy(() => import("./views/not_found"));

// Hookrouter
const routes = () => ({
  "/": () => <Home />,
  "/games": () => <Games />,
  "/games/:id": ({id}) => <Game id={id} />,
  "/eco": () => <Eco />,
  "/about": () => <About />,
});

// Apollo
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
const client = new ApolloClient({
  uri: "http://localhost:4000/api",
});

const App = () => {
  const content = useRoutes(routes()) || <NotFound />;

  return (
    <ApolloProvider client={client}>
      <nav className="navbar navbar-expand-md navbar-light bg-light container-fluid">
        <a href="/" className="navbar-brand">
          <img 
            src={Logo}
            alt=""
            height="30"
            width="30" />
        </a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-toggle="collapse" 
          data-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <A href="/" className="nav-link">
                Home
              </A>
            </li>
            <li className="nav-item">
              <A href="/games" className="nav-link">
                Games
              </A>
            </li>
            <li className="nav-item">
              <A href="/eco" className="nav-link">
                ECO
              </A>
            </li>
            <li className="nav-item">
              <A href="/about" className="nav-link">
                About
              </A>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container-fluid">
        <Suspense fallback={<div>Loading...</div>}>
          { content }
        </Suspense>
      </div>
    </ApolloProvider>
  );
};

export default App;


// import React, {lazy, Suspense} from "react";
// import {useRoutes, A} from "hookrouter";

// import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
// import Logo from "../../node_modules/bootstrap-icons/icons/emoji-smile.svg";

// // Lazy Views
// const Home = lazy(() => import("./views/home"));
// const About = lazy(() => import("./views/about"));
// const NotFound = lazy(() => import("./views/not_found"));

// // Hookrouter
// const routes = () => ({
//   "/": () => <Home />,
//   "/about/": () => <About />,
// });

// const App = () => {
//   const content = useRoutes(routes()) || <NotFound />;

//   return (
//     <>
//       <nav className="navbar navbar-expand-md navbar-light bg-light container-fluid">
//         <A href="/" className="navbar-brand">
//           <img 
//             src={Logo}
//             alt=""
//             height="30"
//             width="30" />
//         </A>
//         <button 
//           className="navbar-toggler" 
//           type="button" 
//           data-toggle="collapse" 
//           data-target="#navbarSupportedContent" 
//           aria-controls="navbarSupportedContent" 
//           aria-expanded="false" 
//           aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav mr-auto">
//             <li className="nav-item"><A href="/" className="nav-link">Home</A></li>
//             <li className="nav-item"><A href="/about/" className="nav-link">About</A></li>
//           </ul>
//         </div>
//       </nav>
//       <div className="container-fluid">
//         <Suspense fallback={<div>Loading...</div>}>
//           { content }
//         </Suspense>
//       </div>
//     </>
//   );
// };

// export default App;
