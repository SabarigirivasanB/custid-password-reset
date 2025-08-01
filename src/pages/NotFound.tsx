import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md px-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
        </div>
        <p className="text-muted-foreground text-lg">
          Sorry, we couldn't find the page you're looking for. The page may have been moved, deleted, or the URL might be incorrect.
        </p>
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link to="/">Take me home</Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()} className="w-full">
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
