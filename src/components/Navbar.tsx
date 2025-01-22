import { Link } from "react-router-dom";
import { useAuth } from "../context/AtuhContext";
import { Button } from "./ui/button";

export function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Moreyeahs
            </Link>
          </div>
          <div className="flex items-center">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="mr-4 text-blue-600 hover:text-blue-800"
                >
                  Dashboard
                </Link>
                <Button onClick={logout} variant="outline">
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="outline">Login / Sign Up</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
