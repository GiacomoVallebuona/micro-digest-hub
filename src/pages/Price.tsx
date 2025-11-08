import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";

const Price = () => {
  const features = [
    "Unlimited access to all articles",
    "Daily curated news digest",
    "Exclusive business insights",
    "Premium market analysis",
    "Early access to new content",
    "Ad-free reading experience",
    "Mobile app access",
    "Cancel anytime",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-16 lg:py-24">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              One plan, unlimited learning. Cancel anytime, no questions asked.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="max-w-lg mx-auto">
            <Card className="border-2 border-accent shadow-medium">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Premium Membership</CardTitle>
                <CardDescription className="text-base">
                  Full access to all premium content
                </CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-foreground">S/15</span>
                  <span className="text-muted-foreground text-lg">/month</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Link to="/auth" className="w-full">
                  <Button size="lg" className="w-full bg-accent hover:bg-accent-hover text-accent-foreground">
                    Get Started Today
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground text-center">
                  7-day money-back guarantee. No long-term contracts.
                </p>
              </CardFooter>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Can I cancel my subscription anytime?
                </h3>
                <p className="text-muted-foreground">
                  Yes! You can cancel your subscription at any time with no penalties. Your access will continue until the end of your current billing period.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, debit cards, and digital payment methods for your convenience.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Is there a free trial available?
                </h3>
                <p className="text-muted-foreground">
                  While we don't offer a traditional free trial, we do provide a 7-day money-back guarantee. If you're not satisfied within the first week, we'll refund your payment in full.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  How often is new content published?
                </h3>
                <p className="text-muted-foreground">
                  We publish new curated content daily, with fresh articles, news updates, and business insights added every morning to keep you informed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Price;
