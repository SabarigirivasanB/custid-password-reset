import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Password Reset Portal</h1>
          <Button variant="secondary" size="sm" asChild>
            <Link to="/" className="flex items-center gap-2">
              <Home size={16} />
              Home
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;