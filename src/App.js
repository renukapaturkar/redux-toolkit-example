import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./features/login/Login";
import { Posts } from "./features/posts/Posts";
import { PrivateRoute } from "./features/PrivateRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              <Posts />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
