import Layout from "@/components/Layout";
import StatsCard from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3,
  TrendingUp,
  Recycle,
  Users,
  Calendar,
  MapPin,
  Package,
  Leaf
} from "lucide-react";

const Analytics = () => {
  // Mock analytics data
  const monthlyStats = [
    { title: "January", collected: 2400, requests: 45 },
    { title: "February", collected: 2100, requests: 38 },
    { title: "March", collected: 2800, requests: 52 },
    { title: "April", collected: 2600, requests: 48 },
    { title: "May", collected: 3200, requests: 61 },
    { title: "June", collected: 2900, requests: 54 }
  ];

  const wasteTypeData = [
    { type: "Mobile Phones", quantity: 456, percentage: 28 },
    { type: "Laptops", quantity: 234, percentage: 15 },
    { type: "Desktop Computers", quantity: 189, percentage: 12 },
    { type: "Tablets", quantity: 167, percentage: 10 },
    { type: "Televisions", quantity: 145, percentage: 9 },
    { type: "Printers", quantity: 123, percentage: 8 },
    { type: "Other Electronics", quantity: 286, percentage: 18 }
  ];

  const cityStats = [
    { city: "Mumbai", requests: 89, weight: "1,245 kg" },
    { city: "Delhi", requests: 76, weight: "1,098 kg" },
    { city: "Bangalore", requests: 68, weight: "987 kg" },
    { city: "Chennai", requests: 45, weight: "654 kg" },
    { city: "Hyderabad", requests: 38, weight: "543 kg" }
  ];

  const overallStats = [
    {
      title: "Total Weight Processed",
      value: "15.2 tons",
      change: "+15% from last quarter",
      changeType: "positive" as const,
      icon: Recycle
    },
    {
      title: "Total Requests",
      value: "1,847",
      change: "+23% from last quarter",
      changeType: "positive" as const,
      icon: Package
    },
    {
      title: "Active Users",
      value: "1,284",
      change: "+18% from last quarter",
      changeType: "positive" as const,
      icon: Users
    },
    {
      title: "Environmental Impact",
      value: "8.4 tons CO₂",
      change: "Emissions prevented",
      changeType: "neutral" as const,
      icon: Leaf
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into e-waste management performance
          </p>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {overallStats.map((stat, index) => (
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Collection Trends */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>Monthly Collection Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Month</span>
                  <span>Weight (kg)</span>
                  <span>Requests</span>
                </div>
                {monthlyStats.map((month, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{month.title}</span>
                      <span className="text-sm">{month.collected} kg</span>
                      <span className="text-sm">{month.requests}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                        style={{ width: `${(month.collected / 3500) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* E-Waste Type Distribution */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-primary" />
                <span>E-Waste Type Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {wasteTypeData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.type}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.quantity} units ({item.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* City-wise Performance & Environmental Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* City-wise Statistics */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>City-wise Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cityStats.map((city, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{city.city}</p>
                        <p className="text-sm text-muted-foreground">
                          {city.requests} requests
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{city.weight}</p>
                      <p className="text-sm text-muted-foreground">collected</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Environmental Impact Details */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="w-5 h-5 text-success" />
                <span>Environmental Impact Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-success to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-success mb-1">Positive Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    Making a difference for our planet
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm font-medium">CO₂ Emissions Saved</span>
                    <span className="text-success font-bold">8.4 tons</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm font-medium">Energy Conserved</span>
                    <span className="text-success font-bold">45,600 kWh</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm font-medium">Water Saved</span>
                    <span className="text-success font-bold">68,400 L</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm font-medium">Trees Equivalent</span>
                    <span className="text-success font-bold">376 trees</span>
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    * Calculations based on EPA standard environmental impact metrics
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Summary */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Performance Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <p className="text-2xl font-bold text-primary">98.5%</p>
                <p className="text-sm text-muted-foreground">Request Completion Rate</p>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-success">4.8/5</p>
                <p className="text-sm text-muted-foreground">Average User Rating</p>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-accent">2.3 days</p>
                <p className="text-sm text-muted-foreground">Average Processing Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Analytics;