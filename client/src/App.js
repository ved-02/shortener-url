import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register"
import Login from "./Components/Login"
import Root from "./Components/Root";
import Dashboard from "./Components/Dashboard";
import Alert from "./Components/Alert";
import Footer from "./Components/Footer";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (type, message) => {
    setAlert({
      type,
      message
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <div className="component">
      <div className="component" style={{height: "88vh"}}>
        <Router >
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Root />} />
            <Route exact path="/register" element={<Register showAlert={showAlert} />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/dashboard" element={<Dashboard showAlert={showAlert} />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
