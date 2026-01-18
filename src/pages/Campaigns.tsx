import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import { campaigns } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const Campaigns = () => {
  const navigate = useNavigate();
  const [campaignsList, setCampaigns] = useState([]);
  useEffect(() => {
    const data = localStorage.getItem("Campaigns_List")
    if (data?.length > 0) {
      setCampaigns(JSON.parse(data));
    }else{
      setCampaigns(campaigns);
    }
  }, [])

  return (
    <>
      <Header title="Campaigns" subtitle="Manage your marketing campaigns" />
      <div className="flex-1 overflow-auto p-6">
        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary">
              All ({campaignsList.length})
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
              Active ({campaignsList.filter((c) => c.status === "active").length})
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
              Draft ({campaignsList.filter((c) => c.status === "draft").length})
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
              Completed ({campaignsList.filter((c) => c.status === "completed").length})
            </Badge>
          </div>
          <Button className="gap-2" onClick={() => navigate("/campaigns/create")}>
            <Plus className="w-4 h-4" />
            New Campaign
          </Button>
        </div>

        {/* Campaigns Table */}
        <div className="bg-card rounded-xl border border-border shadow-soft overflow-hidden animate-fade-in">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                <TableHead className="font-semibold">Campaign Name</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                {/* <TableHead className="font-semibold">Creators</TableHead> */}
                <TableHead className="font-semibold">Budget</TableHead>
                {/* <TableHead className="font-semibold">Progress</TableHead> */}
                <TableHead className="font-semibold">Engagement</TableHead>
                <TableHead className="font-semibold">Duration</TableHead>
                <TableHead className="font-semibold w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaignsList.map((campaign) => (
                <TableRow
                  key={campaign.id}
                  className="hover:bg-secondary/20 transition-colors"
                >
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{campaign.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs capitalize",
                        campaign.status === "active" && "bg-accent text-accent-foreground",
                        campaign.status === "completed" && "bg-muted text-muted-foreground",
                        campaign.status === "draft" && "bg-secondary text-secondary-foreground",
                        campaign.status === "paused" && "bg-destructive/10 text-destructive"
                      )}
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  {/* <TableCell className="text-muted-foreground">
                    {campaign.creators}
                  </TableCell> */}
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium text-foreground">
                        ${campaign.budget?.toLocaleString()}
                      </p>
                      {/* <p className="text-muted-foreground text-xs">
                        of ${campaign.budget.toLocaleString()}
                      </p> */}
                    </div>
                  </TableCell>
                  {/* <TableCell>
                    <div className="w-24">
                      <Progress
                        value={(campaign?.spent / campaign?.budget) * 100}
                        className="h-2"
                      />
                    </div>
                  </TableCell> */}
                  <TableCell className="font-medium text-primary">
                    {campaign.engagement || "5.2%"}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {campaign.startDate || "2024-06-01"} - {campaign.endDate || "2024-07-15"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={() => navigate(`/campaigns/${campaign.id}`)}
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Edit className="w-4 h-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Campaigns;
