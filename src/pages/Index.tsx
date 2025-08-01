import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Upload } from "lucide-react";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Password Reset Portal</h1>
          <p className="text-muted-foreground">Choose an option to reset customer passwords</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Quick Reset Tile */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Quick Reset</CardTitle>
              <CardDescription>
                Reset password for a single customer using base customer ID
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/quick-reset">Start Quick Reset</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Bulk Reset Tile */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto bg-secondary/10 p-3 rounded-full w-fit mb-4 group-hover:bg-secondary/20 transition-colors">
                <Upload className="h-8 w-8 text-secondary-foreground" />
              </div>
              <CardTitle className="text-xl">Bulk Reset</CardTitle>
              <CardDescription>
                Reset passwords for multiple customers using text input or CSV file
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="secondary" className="w-full">
                <Link to="/bulk-reset">Start Bulk Reset</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <div className="mt-12 max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How it works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold">Quick Reset:</h4>
                <p className="text-sm text-muted-foreground">
                  Enter a base customer ID and target customer ID to copy the password from base to target.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Bulk Reset:</h4>
                <p className="text-sm text-muted-foreground">
                  Enter one base customer ID and multiple target customer IDs either by typing them in the text area or uploading a CSV file.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
