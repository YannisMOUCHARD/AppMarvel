import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import CharactersPage, { loader as charactersLoader } from "./pages/CharactersPage";
import CharacterDetailPage, { loader as characterLoader } from "./pages/CharacterDetailPage"; 
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { 
          index: true, 
          element: <CharactersPage />, 
          loader: charactersLoader // 👈 ajoute le loader ici
        },
        {
          path: "characters/:id",
          element: <CharacterDetailPage />,
          loader: characterLoader,
        },
        { path: "about", element: <AboutPage /> },
        { path: "contact", element: <ContactPage /> },
        { path: "*", element: <div>Page not found</div> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;