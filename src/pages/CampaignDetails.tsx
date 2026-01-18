import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { campaigns, creators, payments } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Edit,
  Pause,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CampaignDetails = () => {
  const { id } = useParams();
  const campaign = campaigns.find((c) => c.id === Number(id));

  if (!campaign) {
    return (
      <>
        <Header title="Campaign Not Found" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Campaign not found</p>
            <Button asChild>
              <Link to="/campaigns">Back to Campaigns</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  const budgetUsed = (campaign.spent / campaign.budget) * 100;
  const assignedCreators = creators.slice(0, campaign.creators);
  const campaignPayments = payments.filter(
    (p) => p.campaign === campaign.name
  );

  return (
    <>
      <Header title={campaign.name} subtitle="Campaign Details" />
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Back Button & Actions */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild className="gap-2">
            <Link to="/campaigns">
              <ArrowLeft className="w-4 h-4" />
              Back to Campaigns
            </Link>
          </Button>
          <div className="flex gap-2">
            {campaign.status === "active" ? (
              <Button variant="outline" className="gap-2">
                <Pause className="w-4 h-4" />
                Pause
              </Button>
            ) : (
              <Button variant="outline" className="gap-2">
                <Play className="w-4 h-4" />
                Resume
              </Button>
            )}
            <Button className="gap-2">
              <Edit className="w-4 h-4" />
              Edit Campaign
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="animate-fade-in">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Budget</p>
                  <p className="text-2xl font-bold">
                    ${campaign.budget.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "50ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Spent</p>
                  <p className="text-2xl font-bold">
                    ${campaign.spent.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Creators</p>
                  <p className="text-2xl font-bold">{campaign.creators}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "150ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-chart-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Engagement</p>
                  <p className="text-2xl font-bold">{campaign.engagement}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Info & Budget */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg">Campaign Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge
                  variant="secondary"
                  className={cn(
                    "capitalize",
                    campaign.status === "active" && "bg-accent text-accent-foreground",
                    campaign.status === "draft" && "bg-secondary text-secondary-foreground",
                    campaign.status === "completed" && "bg-primary/10 text-primary",
                    campaign.status === "paused" && "bg-chart-4/10 text-chart-4"
                  )}
                >
                  {campaign.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Start Date</span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  {campaign.startDate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">End Date</span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  {campaign.endDate}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg">Budget Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={budgetUsed} className="h-3" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  ${campaign.spent.toLocaleString()} spent
                </span>
                <span className="text-muted-foreground">
                  ${(campaign.budget - campaign.spent).toLocaleString()} remaining
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {budgetUsed.toFixed(1)}% of budget used
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Assigned Creators */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">Assigned Creators</CardTitle>
          </CardHeader>
          <CardContent>
            {assignedCreators.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {assignedCreators.map((creator) => (
                  <div
                    key={creator.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {creator.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{creator.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {creator.platform} • {creator.followers}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No creators assigned yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Campaign Payments */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            {campaignPayments.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Creator</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaignPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        {payment.creator}
                      </TableCell>
                      <TableCell>${payment.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {payment.method}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {payment.date}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "capitalize",
                            payment.status === "completed" && "bg-accent text-accent-foreground",
                            payment.status === "pending" && "bg-chart-4/10 text-chart-4"
                          )}
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No payments recorded
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CampaignDetails;
