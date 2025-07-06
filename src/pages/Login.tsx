import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md bg-white shadow-lg border-t-4 border-t-primary">
        <CardHeader className="text-center pb-6">
          {/* Logo */}
          <div className="mb-6">
            <div className="bg-primary/5 rounded-lg p-4 inline-block">
              <img 
                src="/lovable-uploads/5a3219f9-f6bb-4b5b-936f-6484a5d764f6.png" 
                alt="Bluewater Group Logo" 
                className="h-12 w-auto object-contain mx-auto"
              />
            </div>
          </div>
          
          {/* Heading */}
          <CardTitle className="text-2xl font-heading text-primary">
            Portal Login
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Form Fields */}
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
          <Button 
            variant="brand-red" 
            className="w-full h-11 text-base font-semibold"
          >
            Sign In
          </Button>
          
          {/* Links */}
          <div className="text-center space-y-2 pt-4">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;