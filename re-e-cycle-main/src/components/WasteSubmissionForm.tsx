import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, MapPin, Smartphone } from "lucide-react";

interface WasteItem {
  type: string;
  quantity: number;
  description: string;
}

const WasteSubmissionForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    pickupDate: ""
  });
  const [wasteItems, setWasteItems] = useState<WasteItem[]>([
    { type: "", quantity: 1, description: "" }
  ]);

  const wasteTypes = [
    "Mobile Phones",
    "Laptops",
    "Desktop Computers",
    "Tablets",
    "Televisions",
    "Printers",
    "Keyboards & Mice",
    "Cables & Chargers",
    "Batteries",
    "Other Electronics"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWasteItemChange = (index: number, field: keyof WasteItem, value: string | number) => {
    const updatedItems = wasteItems.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setWasteItems(updatedItems);
  };

  const addWasteItem = () => {
    setWasteItems([...wasteItems, { type: "", quantity: 1, description: "" }]);
  };

  const removeWasteItem = (index: number) => {
    if (wasteItems.length > 1) {
      setWasteItems(wasteItems.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (wasteItems.some(item => !item.type || item.quantity < 1)) {
      toast({
        title: "Invalid Waste Items",
        description: "Please specify type and quantity for all items.",
        variant: "destructive"
      });
      return;
    }

    // Generate a mock request ID
    const requestId = `EWM${Date.now().toString().slice(-6)}`;
    
    toast({
      title: "Request Submitted Successfully!",
      description: `Your e-waste pickup request has been submitted. Reference ID: ${requestId}`,
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
      pickupDate: ""
    });
    setWasteItems([{ type: "", quantity: 1, description: "" }]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Submit E-Waste for Pickup</h1>
        <p className="text-muted-foreground">
          Schedule a pickup for your electronic waste and help protect the environment
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-primary" />
              </div>
              <span>Contact Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickupDate">Preferred Pickup Date</Label>
                <Input
                  id="pickupDate"
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => handleInputChange("pickupDate", e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <span>Pickup Address</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Street Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter complete address"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Enter city"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  placeholder="Enter pincode"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* E-Waste Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>E-Waste Items</span>
              <Button type="button" onClick={addWasteItem} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {wasteItems.map((item, index) => (
              <div key={index} className="p-4 border border-border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Item {index + 1}</h4>
                  {wasteItems.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeWasteItem(index)}
                      size="sm"
                      variant="destructive"
                    >
                      Remove
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Type of E-Waste *</Label>
                    <Select
                      value={item.type}
                      onValueChange={(value) => handleWasteItemChange(index, "type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {wasteTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Quantity *</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleWasteItemChange(index, "quantity", parseInt(e.target.value) || 1)}
                      placeholder="Quantity"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => handleWasteItemChange(index, "description", e.target.value)}
                      placeholder="Brand, model, condition"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button type="submit" size="lg" className="px-8">
            Submit E-Waste Request
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WasteSubmissionForm;