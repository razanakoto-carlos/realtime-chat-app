import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function GuestRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();

  if (user) return <Navigate to="/" replace />;
  return children;
}

export default GuestRoute;
