import Header from "@/components/layout/Header";
import StatCard from "@/components/dashboard/StatCard";
import { dashboardStats, revenueData, campaigns } from "@/data/mockData";
import { Megaphone, Users, DollarSign, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const iconMap = {
  1: Megaphone,
  2: Users,
  3: DollarSign,
  4: TrendingUp,
};

const Dashboard = () => {
  return (
    <>
      <Header title="Dashboard" subtitle="Welcome back, Hardi" />
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {dashboardStats.map((stat, index) => (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={iconMap[(index + 1) as keyof typeof iconMap]}
            />
          ))}
        </div>

        {/* Charts and Recent */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="xl:col-span-2 bg-card rounded-xl p-6 border border-border shadow-soft animate-fade-in">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Revenue vs Spend
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(174 72% 40%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(174 72% 40%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(190 80% 45%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(190 80% 45%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(174 72% 40%)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                  <Area
                    type="monotone"
                    dataKey="spend"
                    stroke="hsl(190 80% 45%)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSpend)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Campaigns */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-soft animate-fade-in">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Recent Campaigns
            </h3>
            <div className="space-y-4">
              {campaigns.slice(0, 4).map((campaign) => (
                <div
                  key={campaign.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {campaign.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {campaign.creators} creators
                    </p>
                  </div>
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
