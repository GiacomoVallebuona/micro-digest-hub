import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { Sparkles, TrendingUp, Newspaper, Award } from "lucide-react";

const Index = () => {
  const sampleArticles = [
    {
      title: "The Future of Sustainable Business Practices",
      excerpt: "Discover how leading companies are transforming their operations to prioritize environmental sustainability while maintaining profitability.",
      category: "Business",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
      slug: "future-sustainable-business",
      isPremium: true,
    },
    {
      title: "Breaking: Tech Giants Announce Strategic Partnership",
      excerpt: "Major technology companies join forces to develop next-generation AI solutions, marking a significant shift in the industry landscape.",
      category: "News",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
      slug: "tech-giants-partnership",
      isPremium: false,
    },
    {
      title: "5 Emerging Markets to Watch in 2024",
      excerpt: "Financial experts reveal the most promising investment opportunities in rapidly developing economies around the globe.",
      category: "Business",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      slug: "emerging-markets-2024",
      isPremium: true,
    },
  ];

  const features = [
    {
      icon: Newspaper,
      title: "Daily Curated News",
      description: "Stay informed with handpicked articles from trusted sources worldwide.",
    },
    {
      icon: TrendingUp,
      title: "Business Insights",
      description: "Deep dive into market trends and strategic business analysis.",
    },
    {
      icon: Sparkles,
      title: "Something New",
      description: "Discover fresh perspectives on innovation and emerging technologies.",
    },
    {
      icon: Award,
      title: "Premium Content",
      description: "Access exclusive in-depth reports and expert commentary.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 lg:py-32">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Learn Something New,{" "}
              <span className="text-primary">Every Day</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              Your daily dose of curated news and business insights. Join thousands of professionals staying ahead with micro-education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-accent hover:bg-accent-hover text-accent-foreground px-8">
                  Start Learning - S/15/month
                </Button>
              </Link>
              <Link to="/price">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  View Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose MicroLearn?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We deliver high-quality, curated content designed for busy professionals who value their time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-card p-6 rounded-lg border border-border hover:shadow-medium transition-all duration-300"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Featured Articles
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore our latest curated content
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleArticles.map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/news">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join our community and get access to premium content, exclusive insights, and daily curated news for just S/15 per month.
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-accent hover:bg-accent-hover text-accent-foreground px-8">
              Subscribe Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
