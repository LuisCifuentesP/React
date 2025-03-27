import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Pizza from "./pages/Pizza";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { Route, Routes, useLocation } from "react-router-dom";
import CartProvider from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectRoute from "./components/RedirectRoute";

const App = () => {

  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <CartProvider>
      <div className="app-container">
        <Navbar />

        {isHome ? (
          <Home />
        ) : (
          <main className="main-content">
            <Routes>
              <Route
                path="/login"
                element={
                  <RedirectRoute>
                    <Login />
                  </RedirectRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <RedirectRoute>
                    <Register />
                  </RedirectRoute>
                }
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/pizza/:idPizza" element={<Pizza />} />
              <Route path="/*" element={<NotFound />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        )}
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
