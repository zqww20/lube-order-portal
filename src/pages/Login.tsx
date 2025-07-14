import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();

  const handleGuestAccess = () => {
    navigate('/guest/dashboard');
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/85a47f68-5b7a-442a-89b1-43de0ae350ac.png" 
            alt="Bluewater Group Logo" 
            className="w-16 h-16 mx-auto mb-4 rounded-full"
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
              
              {/* Guest Access */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full h-12 text-base font-semibold"
                onClick={handleGuestAccess}
              >
                Continue as Guest
              </Button>
              
              <div className="text-center space-y-3 pt-4">
                <div className="flex justify-center items-center space-x-4 text-sm">
                  <Button 
                    variant="link" 
                    className="text-primary hover:text-primary/80 transition-colors p-0 h-auto"
                    onClick={() => navigate('/')}
                  >
                    Request Access
                  </Button>
                  <span className="text-muted-foreground">•</span>
                  <Button 
                    variant="link" 
                    className="text-primary hover:text-primary/80 transition-colors p-0 h-auto"
                    onClick={() => navigate('/')}
                  >
                    Forgot Password?
                  </Button>
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