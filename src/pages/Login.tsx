import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const Login = () => {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <img 
            src="/placeholder.svg" 
            alt="Bluewater Group Logo" 
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-heading font-bold text-primary mb-2">
            Bluewater Portal
          </h1>
          <p className="text-muted-foreground">
            Sign in to access your account
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Customer Code / Email
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your credentials" 
                  className="h-12" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  className="h-12" 
                />
              </div>
              
              <Button className="w-full h-12 text-base font-semibold">
                Sign In
              </Button>
              
              <div className="text-center space-y-3 pt-4">
                <div className="flex justify-center items-center space-x-4 text-sm">
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                    Request Access
                  </a>
                  <span className="text-muted-foreground">•</span>
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                    Forgot Password?
                  </a>
                </div>
                <p className="text-xs text-muted-foreground">
                  © {new Date().getFullYear()} Bluewater Group. All rights reserved.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Login;