import { Navigate } from "react-router-dom";

function ProtectedRoute({ element }: { element: React.ReactNode }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }

  return element;
}

export default ProtectedRoute;
