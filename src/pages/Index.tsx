import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Upload } from "lucide-react";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-cfs-light-bg">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cfs-dark-text mb-4">Password Reset Portal</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Securely reset customer passwords using our professional tools. Choose between quick single resets or bulk operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Quick Reset Tile */}
          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group cfs-card-shadow border-0">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto bg-primary/10 p-4 rounded-2xl w-fit mb-6 group-hover:bg-primary/20 transition-colors">
                <Zap className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl text-cfs-dark-text">Quick Reset</CardTitle>
              <CardDescription className="text-base">
                Reset password for a single customer using base customer ID. Fast and efficient for individual requests.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full h-12 text-base font-semibold">
                <Link to="/quick-reset">Start Quick Reset</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Bulk Reset Tile */}
          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group cfs-card-shadow border-0">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto bg-accent/10 p-4 rounded-2xl w-fit mb-6 group-hover:bg-accent/20 transition-colors">
                <Upload className="h-10 w-10 text-accent" />
              </div>
              <CardTitle className="text-2xl text-cfs-dark-text">Bulk Reset</CardTitle>
              <CardDescription className="text-base">
                Reset passwords for multiple customers using text input or CSV file upload. Perfect for bulk operations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="secondary" className="w-full h-12 text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/bulk-reset">Start Bulk Reset</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="cfs-card-shadow border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-cfs-dark-text">How it works</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="bg-primary/5 p-6 rounded-xl mb-4">
                  <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold text-lg text-cfs-dark-text mb-2">Quick Reset</h4>
                  <p className="text-muted-foreground">
                    Enter a base customer ID and target customer ID to copy the password from base to target. Ideal for individual customer assistance.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-accent/5 p-6 rounded-xl mb-4">
                  <Upload className="h-8 w-8 text-accent mx-auto mb-3" />
                  <h4 className="font-semibold text-lg text-cfs-dark-text mb-2">Bulk Reset</h4>
                  <p className="text-muted-foreground">
                    Enter one base customer ID and multiple target customer IDs either by typing them in the text area or uploading a CSV file for efficient bulk operations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
