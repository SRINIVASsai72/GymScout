import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./screens/Landingpage";
import Gyms from "./screens/Gyms";
import Show from "./screens/Show";
import New from "./screens/New";
import Edit from "./screens/Edit";
import Navbar from "./components/Navbar";
import Register from "./screens/Register";
import Login from "./screens/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/gyms" element={<Gyms />} />
          <Route path="/gyms/:id" element={<Show />} />
          <Route
            path="/gyms/new"
            element={
              <ProtectedRoute>
                <New />
              </ProtectedRoute>
            }
          />

          <Route
            path="/gyms/:id/edit"
            element={
              <ProtectedRoute>
                <Edit />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;