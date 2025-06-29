import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserPlus, ArrowRight, Shield, Globe, Check, Gift } from "lucide-react";

export default function Register() {
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
          <p className="text-sm text-georgian-gray">Join Our Cultural Journey</p>
        </div>

        {/* Registration Card */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl">Create Your Account</CardTitle>
            <CardDescription>
              Start your journey through Georgia's rich cultural heritage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* What You Get */}
            <div className="space-y-3 p-4 bg-georgian-gold/5 rounded-lg">
              <div className="flex items-center gap-2 text-georgian-wine font-medium">
                <Gift className="h-4 w-4" />
                <span className="text-sm">What you get with your account:</span>
              </div>
              <div className="space-y-2 text-sm text-georgian-gray">
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-georgian-wine flex-shrink-0" />
                  <span>Access to exclusive cultural tours and experiences</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-georgian-wine flex-shrink-0" />
                  <span>Personalized recommendations based on your interests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-georgian-wine flex-shrink-0" />
                  <span>Save favorite regions, tours, and stories</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-georgian-wine flex-shrink-0" />
                  <span>Purchase authentic Georgian products</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-georgian-wine flex-shrink-0" />
                  <span>Early access to new cultural content</span>
                </div>
              </div>
            </div>

            {/* Registration Button */}
            <Button 
              onClick={() => window.location.href = '/api/login'}
              className="w-full bg-georgian-wine hover:bg-georgian-wine/90 text-white py-6 text-base font-medium"
              size="lg"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Create Account with Replit
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Separator className="my-4" />

            {/* Security & Privacy */}
            <div className="flex items-start gap-2 p-3 bg-georgian-wine/5 rounded-lg">
              <Shield className="h-4 w-4 text-georgian-wine mt-0.5 flex-shrink-0" />
              <div className="text-xs text-georgian-gray">
                <p className="font-medium text-georgian-wine mb-1">Secure & Private</p>
                <p>Your account is created instantly and securely. We respect your privacy and never share your personal information.</p>
              </div>
            </div>

            {/* Already have account */}
            <div className="text-center pt-2">
              <p className="text-sm text-georgian-gray">
                Already have an account?{" "}
                <Link href="/login" className="text-georgian-wine hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-georgian-gray space-y-1">
          <p>Registration is free and takes just one click.</p>
          <p>
            By creating an account, you agree to explore Georgia's cultural heritage respectfully and help preserve these traditions for future generations.
          </p>
        </div>
      </div>
    </div>
  );
}