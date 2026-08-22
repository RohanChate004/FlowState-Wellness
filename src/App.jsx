import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Yoga from "./pages/Yoga/Yoga";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AsanaDetails from "./pages/AsanaDetails/AsanaDetails";
import CyclePractice from "./pages/CyclePractice/CyclePractice";

import DeepDive from "./pages/DeepDive/DeepDive";
import DeepDiveSession from "./pages/DeepDive/DeepDiveSession";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/yoga" element={<Yoga />} />

        <Route
          path="/asanas/:id"
          element={<AsanaDetails />}
        />

        <Route
          path="/cycle-practice/:slug"
          element={<CyclePractice />}
        />

        {/* DEEP DIVE */}

        <Route
          path="/deep-dive"
          element={<DeepDive />}
        />

        <Route
          path="/deep-dive/session/:id"
          element={<DeepDiveSession />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;