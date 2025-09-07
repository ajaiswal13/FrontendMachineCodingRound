import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import ThemeContext from "./utils/ThemeContext";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs"
import AboutUs from "./pages/AboutUs";
import { Outlet } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Breadcrumbs from "./components/Breadcrumbs";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? 'dark' : 'light';
  const toggleTheme = () => {
    setDarkMode((prevState) => !prevState);
  }
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  },[darkMode])
  return (
    <ThemeContext.Provider value={{theme,toggleTheme}}>
      <div className="App">
        <header style={{ marginBottom: '20px', textTransform: 'uppercase', fontSize:'20px' }}>
          Ecommerce Website
        </header>
        {/* The following Navbar component is for lightdarkmode project
        <Navbar /> */}
        <Breadcrumbs/>
        <Outlet/>
        </div>
    </ThemeContext.Provider>
  );
}
export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
           path: '/',
           element: <Home />,
      },
      {
           path: '/contact',
           element: <ContactUs />,
      },
      {
           path: '/about',
           element: <AboutUs />,
      },
      {
          path: '/products',
          element: <ProductList/>,
      },
      {
          path: '/products/:id',
          element: <ProductDetail/>
      }
    ]
  }
])
export default App;
