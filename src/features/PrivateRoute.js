import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  if (user) {
    return children;
  } else {
    navigate("/");
  }
};
