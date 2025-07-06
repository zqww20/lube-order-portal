import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logisticsBackground from "@/assets/logistics-background.jpg";

const Login = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Column - Branding */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${logisticsBackground})` }}
      >
        {/* Navy overlay */}
        <div className="absolute inset-0 bg-primary/70"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-12">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/lovable-uploads/5a3219f9-f6bb-4b5b-936f-6484a5d764f6.png" 
              alt="Bluewater Group Logo" 
              className="h-16 w-auto object-contain"
            />
          </div>
          
          {/* Tagline */}
          <h1 className="text-4xl font-heading font-bold text-white mb-4">
            Keeps You Moving
          </h1>
          
          <p className="text-xl text-white/90 font-light max-w-md">
            Professional logistics solutions for your business needs
          </p>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <img 
              src="/lovable-uploads/5a3219f9-f6bb-4b5b-936f-6484a5d764f6.png" 
              alt="Bluewater Group Logo" 
              className="h-12 w-auto object-contain mx-auto mb-4"
            />
            <h1 className="text-2xl font-heading font-bold text-primary">
              Keeps You Moving
            </h1>
          </div>

          <Card className="border-0 shadow-none">
            <CardHeader className="space-y-1 pb-8">
              <CardTitle className="text-2xl font-heading text-primary text-center">
                Welcome Back
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Sign in to your B2B portal
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-primary">
                  Customer Code / Email
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your customer code or email"
                  className="h-12 px-4 border-input focus:border-primary focus:ring-primary/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-primary">
                  Password
                </Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  className="h-12 px-4 border-input focus:border-primary focus:ring-primary/20"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="rounded border-input text-primary focus:ring-primary/20"
                  />
                  <span className="text-sm text-muted-foreground">Remember me</span>
                </label>
                
                <a 
                  href="#" 
                  className="text-sm text-primary hover:text-primary/80 font-medium"
                >
                  Request Access
                </a>
              </div>
              
              <Button 
                variant="brand-red" 
                className="w-full h-12 text-base font-semibold"
              >
                Sign In
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Need help?{" "}
                  <a href="#" className="text-primary hover:text-primary/80 font-medium">
                    Contact Support
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center text-xs text-muted-foreground">
            © 2024 Bluewater Group. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;