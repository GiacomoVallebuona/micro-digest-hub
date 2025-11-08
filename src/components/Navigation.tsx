import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Today's News", path: "/news" },
    { name: "Something New", path: "/new" },
    { name: "Business", path: "/business" },
    { name: "Price", path: "/price" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <BookOpen className="h-6 w-6 text-primary group-hover:text-primary-light transition-colors" />
            <span className="text-xl font-bold text-primary">MicroLearn</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-secondary">
                  {link.name}
                </Button>
              </Link>
            ))}
            <Link to="/auth" className="ml-4">
              <Button variant="default" className="bg-accent hover:bg-accent-hover text-accent-foreground">
                Subscribe
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-foreground hover:bg-secondary"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary hover:bg-secondary">
                  {link.name}
                </Button>
              </Link>
            ))}
            <Link to="/auth" onClick={() => setIsOpen(false)}>
              <Button variant="default" className="w-full bg-accent hover:bg-accent-hover text-accent-foreground mt-2">
                Subscribe
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
