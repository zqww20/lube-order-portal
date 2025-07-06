import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col items-center justify-center px-4 py-12">
      {/* Logo Element - Brand Identity */}
      <div className="mb-8">
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg">
          <img 
            src="/lovable-uploads/5a3219f9-f6bb-4b5b-936f-6484a5d764f6.png" 
            alt="Bluewater Group Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>
      </div>

      {/* Login Card - Action */}
      <Card className="w-full max-w-[450px] bg-white shadow-lg">
        <CardContent className="p-12">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-heading font-bold text-primary">
              Portal Login
            </h1>
          </div>
          
          {/* Form Fields */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Customer Code / Email
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your customer code or email"
                className="h-11 px-4"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password"
                className="h-11 px-4"
              />
            </div>
            
            {/* Action Button */}
            <div className="pt-4">
              <Button 
                variant="brand-red" 
                className="w-full h-11 text-base font-semibold"
              >
                Sign In
              </Button>
            </div>
            
            {/* Links */}
            <div className="text-center pt-6">
              <div className="flex justify-center space-x-4 text-sm">
                <a href="#" className="text-primary hover:text-primary/80">
                  Request Access
                </a>
                <span className="text-muted-foreground">•</span>
                <a href="#" className="text-primary hover:text-primary/80">
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;