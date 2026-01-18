import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowLeft, CalendarIcon, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
 
const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
    category: "",
    platform: "",
    status: "Completed"
  });
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
 
    const payload = {
      campaign_name: formData.name,
      target_audience: formData.category,
      budget: formData.budget,
    };
 
    saveToLocalStorage("Campaigns_List", formData , "campaign");
    try {
      const response = await fetch(
        "https://hardi.app.n8n.cloud/webhook-test/822a8de7-4c92-4c78-909c-6fc7dcfe5759",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
 
      if (!response.ok) {
        throw new Error("Failed to create campaign");
      }
 
      const result = await response.json();
      saveToLocalStorage("Creators_List", result);
      toast({
        title: "Campaign Created",
        description: "Your campaign has been created successfully.",
      });
 
      navigate("/campaigns");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while creating the campaign.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
 
 
  // Get existing data
//   const saveToLocalStorage = (key, newRecord , string?:any) => {
//     const existing = JSON.parse(localStorage.getItem(key)) || [];
//   if(string == 'campaign'){
//     existing.push(newRecord);
//   }else{
//     existing.push(...newRecord);
//   }
//   localStorage.setItem(key, JSON.stringify(existing));
// };

const saveToLocalStorage = (key, newRecord, string?: any) => {
    let existing : any = null;
    if (string == 'campaign') {
      existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.push(newRecord);
    } else {
      existing = newRecord;
      // existing.push(...newRecord);
    }
    localStorage.setItem(key, JSON.stringify(existing));
  };
 
  return (
    <>
      <Header title="Create Campaign" subtitle="Set up a new marketing campaign" />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="gap-2 mb-6"
            onClick={() => navigate("/campaigns")}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Campaigns
          </Button>
 
          {/* Form Card */}
          <div className="bg-card rounded-xl border border-border shadow-soft p-8 animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campaign Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter campaign name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
 
              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your campaign goals and requirements..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
 
              {/* Category and Platform */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Target Audience *</Label>
                  <Input
                  id="category"
                  placeholder="Enter target audience"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                />
                  {/* <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="beauty">Beauty</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                    </SelectContent>
                  </Select> */}
                </div>
 
                <div className="space-y-2">
                  <Label>Platform *</Label>
                  <Select
                    value={formData.platform}
                    onValueChange={(value) =>
                      setFormData({ ...formData, platform: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="twitter">Twitter/X</SelectItem>
                      <SelectItem value="multi">Multi-Platform</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
 
              {/* Budget */}
              <div className="space-y-2">
                <Label htmlFor="budget">Budget *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="budget"
                    type="number"
                    placeholder="10000"
                    className="pl-10"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
 
              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
 
                <div className="space-y-2">
                  <Label>End Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
 
              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/campaigns")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Campaign"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
 
export default CreateCampaign;
 
 