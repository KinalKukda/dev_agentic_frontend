import Header from "@/components/layout/Header";
import { payments } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Plus, CreditCard, DollarSign, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const statusIcons = {
  completed: DollarSign,
  pending: Clock,
  processing: Clock,
  failed: AlertCircle,
};

const Payments = () => {
  const totalPaid = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments
    .filter((p) => p.status === "pending" || p.status === "processing")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <>
      <Header title="Payments" subtitle="Track and manage creator payments" />
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-6 border border-border shadow-soft animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-2xl font-bold text-foreground">
                  ${totalPaid.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border shadow-soft animate-fade-in" style={{ animationDelay: "50ms" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-chart-4" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-foreground">
                  ${pendingAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border shadow-soft animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-2xl font-bold text-foreground">{payments.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Transaction History</h3>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Payment
            </Button>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-card rounded-xl border border-border shadow-soft overflow-hidden animate-fade-in">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                <TableHead className="font-semibold">Creator</TableHead>
                <TableHead className="font-semibold">Campaign</TableHead>
                <TableHead className="font-semibold">Amount</TableHead>
                <TableHead className="font-semibold">Method</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => {
                const StatusIcon = statusIcons[payment.status as keyof typeof statusIcons];
                return (
                  <TableRow
                    key={payment.id}
                    className="hover:bg-secondary/20 transition-colors"
                  >
                    <TableCell className="font-medium">{payment.creator}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {payment.campaign}
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${payment.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {payment.method}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{payment.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "gap-1 capitalize",
                          payment.status === "completed" && "bg-accent text-accent-foreground",
                          payment.status === "pending" && "bg-chart-4/10 text-chart-4",
                          payment.status === "processing" && "bg-chart-3/10 text-chart-3",
                          payment.status === "failed" && "bg-destructive/10 text-destructive"
                        )}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {payment.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Payments;
