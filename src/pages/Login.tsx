import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SimpleHeader from "@/components/SimpleHeader";

const Login = () => {
  return (
    <>
      <SimpleHeader />
      <div className="min-h-screen flex items-center justify-center bg-muted/30 pt-16">
        <div className="w-full max-w-md space-y-8 px-4">
          <div className="text-center">
            <h1 className="text-3xl font-heading font-bold text-primary">
              Bluewater Group
            </h1>
            <p className="mt-2 text-muted-foreground">
              B2B Portal
            </p>
          </div>
          
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-heading text-center">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-input" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" size="lg">
                Sign In
              </Button>
              
              <div className="text-center text-sm text-muted-foreground">
                Need access?{" "}
                <a href="#" className="text-primary hover:underline">
                  Contact administrator
                </a>
              </div>
            </CardFooter>
          </Card>
          
          <div className="text-center text-xs text-muted-foreground">
            © 2024 Bluewater Group. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;