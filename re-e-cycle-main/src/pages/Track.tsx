import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Package, 
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Truck,
  User,
  Phone
} from "lucide-react";

const Track = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock tracking data
  const trackingData = [
    {
      id: "EWM001234",
      user: "Asamoah Gyan",
      phone: "+233 54 321 0987",
      email: "asamoah@example.com",
      items: ["2 Laptops", "1 Mobile Phone", "1 Tablet"],
      status: "pending",
      submittedDate: "2026-02-15",
      scheduledDate: "2026-02-18",
      location: " Madina, Accra",
      estimatedWeight: "3.2 kg",
      timeline: [
        { step: "Request Submitted", completed: true, date: "2026-02-15" },
        { step: "Request Verified", completed: true, date: "2026-02-16" },
        { step: "Pickup Scheduled", completed: false, date: "2026-02-18" },
        { step: "Items Collected", completed: false, date: "" },
        { step: "Processing Complete", completed: false, date: "" }
      ]
    },
    {
      id: "EWM001235",
      user: "Janet Laryea",
      phone: "+233 24 567 8901",
      email: "janet@example.com",
      items: ["1 Desktop Computer", "3 Keyboards", "2 Mice"],
      status: "in-progress",
      submittedDate: "2026-02-14",
      scheduledDate: "2026-02-16",
      location: " Dansoman, Accra",
      estimatedWeight: "8.5 kg",
      timeline: [
        { step: "Request Submitted", completed: true, date: "2026-02-14" },
        { step: "Request Verified", completed: true, date: "2026-02-15" },
        { step: "Pickup Scheduled", completed: true, date: "2026-02-16" },
        { step: "Items Collected", completed: true, date: "2026-02-16" },
        { step: "Processing Complete", completed: false, date: "" }
      ]
    },
    {
      id: "EWM001236",
      user: "Mikel Yankson",
      phone: "+233 20 123 4567",
      email: "mikel@example.com",
      items: ["1 Television", "2 Printers", "5 Cables"],
      status: "completed",
      submittedDate: "2026-01-13",
      scheduledDate: "2026-01-15",
      location: " Bortianor, Accra",
      estimatedWeight: "12.3 kg",
      timeline: [
        { step: "Request Submitted", completed: true, date: "2026-01-13" },
        { step: "Request Verified", completed: true, date: "2026-01-13" },
        { step: "Pickup Scheduled", completed: true, date: "2026-01-15" },
        { step: "Items Collected", completed: true, date: "2026-01-15" },
        { step: "Processing Complete", completed: true, date: "2026-01-16" }
      ]
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
        return Truck;
      default:
        return Clock;
    }
  };

  const filteredData = trackingData.filter(item =>
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Track E-Waste Requests</h1>
          <p className="text-muted-foreground">
            Monitor the status of all e-waste collection requests
          </p>
        </div>

        {/* Search */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="flex space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Request ID or User Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button>Search</Button>
            </div>
          </CardContent>
        </Card>

        {/* Requests List */}
        <div className="space-y-6">
          {filteredData.map((request) => {
            const StatusIcon = getStatusIcon(request.status);
            return (
              <Card key={request.id} className="shadow-soft">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start space-y-2 sm:space-y-0">
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <StatusIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="text-lg">{request.id}</span>
                        <Badge className={`ml-2 ${getStatusColor(request.status)}`}>
                          {request.status}
                        </Badge>
                      </div>
                    </CardTitle>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Estimated Weight</p>
                      <p className="font-medium">{request.estimatedWeight}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Request Details */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{request.user}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{request.phone}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                        <span className="text-sm text-muted-foreground">{request.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Scheduled: {request.scheduledDate}
                        </span>
                      </div>
                      
                      {/* Items List */}
                      <div>
                        <p className="font-medium mb-2">E-Waste Items:</p>
                        <div className="space-y-1">
                          {request.items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Package className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <h4 className="font-medium mb-4">Progress Timeline</h4>
                      <div className="space-y-4">
                        {request.timeline.map((step, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                              step.completed 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {step.completed ? (
                                <CheckCircle className="w-3 h-3" />
                              ) : (
                                <div className="w-2 h-2 rounded-full bg-current" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm ${
                                step.completed ? 'font-medium' : 'text-muted-foreground'
                              }`}>
                                {step.step}
                              </p>
                              {step.date && (
                                <p className="text-xs text-muted-foreground">{step.date}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Requests Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or check back later.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Track;