import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const Header = () => {
  return (
    <header className="cfs-gradient-bg text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-secondary rounded-sm flex items-center justify-center font-bold text-sm">
              CFS
            </div>
            <h1 className="text-xl font-semibold">Password Reset Portal</h1>
          </div>
          <Button variant="secondary" size="sm" asChild className="bg-white/10 border-white/20 text-white hover:bg-white/20">
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