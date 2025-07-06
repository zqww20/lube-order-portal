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
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-heading text-center">
                Welcome Back
              </CardTitle>
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
            </CardContent>
            
            <CardFooter>
              <Button className="w-full" size="lg">
                Sign In
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;