import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ComplaintForm from "./pages/ComplaintForm";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function Layout({ children }) {
  const location = useLocation();
  const hideNavbarRoutes = ["/dashboard"];

  return (
    <div className="min-h-screen bg-gray-100">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <ComplaintForm />
            </Layout>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
