import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const Login = () => {
  return <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Stripe-Inspired Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-secondary opacity-90"></div>
      <div className="absolute inset-0 bg-gradient-radial from-secondary/30 via-transparent to-primary/20"></div>
      
      {/* Centered Login Card */}
      <Card className="w-full max-w-[450px] bg-white shadow-2xl relative z-10">
        <CardContent className="p-12">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-heading font-bold text-primary">Bluewater Portal Login</h1>
          </div>
          
          {/* Form Fields */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Customer Code / Email
              </Label>
              <Input id="email" type="email" placeholder="Enter your customer code or email" className="h-11 px-4" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <Input id="password" type="password" placeholder="Enter your password" className="h-11 px-4" />
            </div>
            
            {/* Action Button */}
            <div className="pt-4">
              <Button className="w-full h-11 text-base font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90">
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
    </div>;
};
export default Login;