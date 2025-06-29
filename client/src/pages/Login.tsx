import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserCircle, ArrowRight, Shield, Globe } from "lucide-react";

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-georgian-wine/5 to-georgian-gold/5">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-georgian-wine"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-georgian-wine/5 to-georgian-gold/5 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Brand */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-georgian-wine rounded-full flex items-center justify-center">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-georgian-wine">Georgian Heritage</h1>
          <p className="text-sm text-georgian-gray">Discover Georgia's Cultural Treasures</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your account and continue exploring Georgian heritage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Login Button */}
            <Button 
              onClick={() => window.location.href = '/api/login'}
              className="w-full bg-georgian-wine hover:bg-georgian-wine/90 text-white py-6 text-base font-medium"
              size="lg"
            >
              <UserCircle className="mr-2 h-5 w-5" />
              Sign In with Replit
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Separator className="my-4" />

            {/* Features */}
            <div className="space-y-3 text-sm text-georgian-gray">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-georgian-gold rounded-full flex-shrink-0"></div>
                <span>Access exclusive cultural tours and experiences</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-georgian-gold rounded-full flex-shrink-0"></div>
                <span>Save your favorite regions and stories</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-georgian-gold rounded-full flex-shrink-0"></div>
                <span>Purchase authentic Georgian products</span>
              </div>
            </div>

            {/* Security Notice */}
            <div className="flex items-start gap-2 p-3 bg-georgian-wine/5 rounded-lg">
              <Shield className="h-4 w-4 text-georgian-wine mt-0.5 flex-shrink-0" />
              <div className="text-xs text-georgian-gray">
                <p className="font-medium text-georgian-wine mb-1">Secure Authentication</p>
                <p>Your account is protected with secure authentication. We never store your password.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-georgian-gray">
          <p>Don't have an account? Registration happens automatically when you sign in.</p>
          <p className="mt-1">
            By signing in, you agree to explore Georgia's rich cultural heritage responsibly.
          </p>
        </div>
      </div>
    </div>
  );
}