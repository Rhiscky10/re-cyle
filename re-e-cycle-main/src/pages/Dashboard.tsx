import StatsCard from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Recycle, 
  TrendingUp, 
  Users, 
  Package, 
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data for demonstration
  const stats = [
    {
      title: "Total E-Waste Collected",
      value: "2,847 kg",
      change: "+12% from last month",
      changeType: "positive" as const,
      icon: Recycle
    },
    {
      title: "Active Requests",
      value: "23",
      change: "+3 new today",
      changeType: "positive" as const,
      icon: Package
    },
    {
      title: "Registered Users",
      value: "1,284",
      change: "+8% from last month",
      changeType: "positive" as const,
      icon: Users
    },
    {
      title: "CO₂ Saved",
      value: "1.2 tons",
      change: "Environmental impact",
      changeType: "neutral" as const,
      icon: TrendingUp
    }
  ];

  const recentRequests = [
    {
      id: "EWM001234",
      user: "Asamoah Gyan",
      items: "2 Laptops, 1 Mobile Phone",
      status: "pending",
      date: "2026-02-15",
      location: "Madina, Accra"
    },
    {
      id: "EWM001235",
      user: "Janet Laryea",
      items: "1 Desktop, 3 Keyboards",
      status: "in-progress",
      date: "2026-02-14",
      location: "Dansoman, Accra"
    },
    {
      id: "EWM001236",
      user: "Mikel Yankson",
      items: "1 Television, 2 Printers",
      status: "completed",
      date: "2026-01-13",
      location: "Bortianor, Accra"
    },
    {
      id: "EWM001237",
      user: "Sarah Coffie",
      items: "5 Mobile Phones, Chargers",
      status: "pending",
      date: "2026-02-12",
      location: "Chabar, Accra"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "in-progress":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "in-progress":
        return Clock;
      default:
        return AlertCircle;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">E-Waste Management Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage electronic waste collection efficiently
          </p>
        </div>
        <Link to="/submit">
          <Button size="lg" className="shadow-soft">
            <Plus className="w-5 h-5 mr-2" />
            New Request
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Recent Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-primary" />
              <span>Recent Requests</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request) => {
                const StatusIcon = getStatusIcon(request.status);
                return (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <StatusIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{request.id}</p>
                        <p className="text-sm text-muted-foreground">{request.user}</p>
                        <p className="text-xs text-muted-foreground">{request.items}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{request.date}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{request.location}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-center">
              <Link to="/track">
                <Button variant="outline" size="sm">
                  View All Requests
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Impact */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-success" />
              <span>Environmental Impact</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-success to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Recycle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-success">1.2 tons</h3>
                <p className="text-sm text-muted-foreground">CO₂ emissions prevented</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">E-waste recycled</span>
                  <span className="font-medium">2,847 kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Energy saved</span>
                  <span className="font-medium">5,694 kWh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Water conserved</span>
                  <span className="font-medium">8,541 L</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Trees equivalent</span>
                  <span className="font-medium">47 trees</span>
                </div>
              </div>

              <div className="text-center pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Together, we're making a positive impact on our environment
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;