import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const QuickReset = () => {
  const [baseCustomerId, setBaseCustomerId] = useState("");
  const [targetCustomerId, setTargetCustomerId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const { toast } = useToast();

  const handleUpdate = async () => {
    if (!baseCustomerId.trim() || !targetCustomerId.trim()) {
      setAlert({ type: "error", message: "Both Customer IDs are required" });
      return;
    }

    setIsLoading(true);
    setAlert(null);

    // Mock API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      // Mock success/error based on ID format
      if (baseCustomerId.length < 3 || targetCustomerId.length < 3) {
        throw new Error("Customer ID must be at least 3 characters");
      }

      setAlert({ 
        type: "success", 
        message: `Password successfully copied from ${baseCustomerId} to ${targetCustomerId}` 
      });
      toast({
        title: "Success",
        description: "Password reset completed successfully",
      });
      
      // Clear form after success
      setBaseCustomerId("");
      setTargetCustomerId("");
    } catch (error) {
      setAlert({ 
        type: "error", 
        message: error instanceof Error ? error.message : "Failed to reset password" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value: string, setter: (value: string) => void) => {
    if (value.length <= 11) {
      setter(value.toUpperCase());
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {alert && (
          <Alert className={`mb-6 ${alert.type === "error" ? "border-destructive" : "border-green-500"}`}>
            <AlertDescription className={alert.type === "error" ? "text-destructive" : "text-green-700"}>
              {alert.message}
            </AlertDescription>
          </Alert>
        )}

        <div className="max-w-md mx-auto bg-card rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Quick Reset</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="baseCustomerId">Base Customer ID</Label>
              <Input
                id="baseCustomerId"
                type="text"
                value={baseCustomerId}
                onChange={(e) => handleInputChange(e.target.value, setBaseCustomerId)}
                placeholder="Enter base customer ID"
                maxLength={11}
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground mt-1">
                {baseCustomerId.length}/11 characters
              </p>
            </div>

            <div>
              <Label htmlFor="targetCustomerId">Target Customer ID</Label>
              <Input
                id="targetCustomerId"
                type="text"
                value={targetCustomerId}
                onChange={(e) => handleInputChange(e.target.value, setTargetCustomerId)}
                placeholder="Enter target customer ID"
                maxLength={11}
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground mt-1">
                {targetCustomerId.length}/11 characters
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleUpdate} 
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? "Updating..." : "Update"}
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link to="/">Cancel</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickReset;