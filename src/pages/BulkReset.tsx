import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText } from "lucide-react";
import Header from "@/components/Header";

const BulkReset = () => {
  const [baseCustomerId, setBaseCustomerId] = useState("");
  const [targetCustomerIds, setTargetCustomerIds] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      setCsvFile(file);
      setTargetCustomerIds(""); // Clear textarea when file is uploaded
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async () => {
    if (!baseCustomerId.trim()) {
      setAlert({ type: "error", message: "Base Customer ID is required" });
      return;
    }

    const hasTextInput = targetCustomerIds.trim();
    const hasFileInput = csvFile;

    if (!hasTextInput && !hasFileInput) {
      setAlert({ type: "error", message: "Please provide target customer IDs either by text input or CSV file" });
      return;
    }

    setIsLoading(true);
    setAlert(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay

      let targetIds: string[] = [];

      if (hasFileInput) {
        // Mock CSV processing
        targetIds = ["CUST001", "CUST002", "CUST003"]; // Mock data from CSV
      } else {
        // Parse textarea input
        targetIds = targetCustomerIds
          .split(/[\n,]/)
          .map(id => id.trim().toUpperCase())
          .filter(id => id.length > 0);
      }

      if (targetIds.length === 0) {
        throw new Error("No valid customer IDs found");
      }

      // Mock validation
      const invalidIds = targetIds.filter(id => id.length < 3);
      if (invalidIds.length > 0) {
        throw new Error(`Invalid customer IDs: ${invalidIds.join(", ")}`);
      }

      setAlert({ 
        type: "success", 
        message: `Password successfully copied from ${baseCustomerId} to ${targetIds.length} customer(s): ${targetIds.join(", ")}` 
      });
      
      toast({
        title: "Bulk Reset Completed",
        description: `${targetIds.length} passwords updated successfully`,
      });

      // Clear form after success
      setBaseCustomerId("");
      setTargetCustomerIds("");
      setCsvFile(null);
      // Reset file input
      const fileInput = document.getElementById("csvFile") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

    } catch (error) {
      setAlert({ 
        type: "error", 
        message: error instanceof Error ? error.message : "Failed to reset passwords" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBaseCustomerIdChange = (value: string) => {
    if (value.length <= 11) {
      setBaseCustomerId(value.toUpperCase());
    }
  };

  return (
    <div className="min-h-screen bg-cfs-light-bg">
      <Header />
      
      <div className="container mx-auto px-4 py-10">
        {alert && (
          <Alert className={`mb-8 max-w-3xl mx-auto cfs-card-shadow border-0 ${alert.type === "error" ? "bg-destructive/10 text-destructive" : "bg-green-50 text-green-800 border-green-200"}`}>
            <AlertDescription className="text-base font-medium">
              {alert.message}
            </AlertDescription>
          </Alert>
        )}

        <div className="max-w-3xl mx-auto bg-card rounded-2xl cfs-card-shadow p-8 border-0">
          <h2 className="text-3xl font-bold text-center mb-8 text-cfs-dark-text">Bulk Reset</h2>
          
          <div className="space-y-8">
            <div>
              <Label htmlFor="baseCustomerId">Base Customer ID</Label>
              <Input
                id="baseCustomerId"
                type="text"
                value={baseCustomerId}
                onChange={(e) => handleBaseCustomerIdChange(e.target.value)}
                placeholder="Enter base customer ID"
                maxLength={11}
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground mt-1">
                {baseCustomerId.length}/11 characters
              </p>
            </div>

            <div>
              <Label htmlFor="targetCustomerIds">Target Customer IDs</Label>
              <Textarea
                id="targetCustomerIds"
                value={targetCustomerIds}
                onChange={(e) => setTargetCustomerIds(e.target.value)}
                placeholder="Enter customer IDs separated by commas or new lines&#10;Example:&#10;CUST001&#10;CUST002&#10;CUST003"
                rows={6}
                className="mt-1"
                disabled={!!csvFile}
              />
              {csvFile && (
                <p className="text-sm text-muted-foreground mt-1">
                  Text input disabled - CSV file uploaded
                </p>
              )}
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">OR</p>
            </div>

            <div>
              <Label htmlFor="csvFile">Upload CSV File</Label>
              <div className="mt-1">
                <input
                  id="csvFile"
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("csvFile")?.click()}
                  className="w-full"
                  type="button"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {csvFile ? `Selected: ${csvFile.name}` : "Choose CSV File"}
                </Button>
              </div>
              {csvFile && (
                <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                  <FileText size={16} />
                  File uploaded: {csvFile.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCsvFile(null);
                      const fileInput = document.getElementById("csvFile") as HTMLInputElement;
                      if (fileInput) fileInput.value = "";
                    }}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleUpdate} 
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? "Processing..." : "Update"}
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

export default BulkReset;