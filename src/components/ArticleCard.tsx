import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  slug: string;
  isPremium?: boolean;
}

const ArticleCard = ({ title, excerpt, category, readTime, image, slug, isPremium = false }: ArticleCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-medium transition-all duration-300 border-border">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isPremium && (
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
            Premium
          </Badge>
        )}
      </div>
      
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
            {category}
          </Badge>
          <div className="flex items-center text-muted-foreground text-sm">
            <Clock className="h-4 w-4 mr-1" />
            {readTime}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
      </CardContent>

      <CardFooter>
        <Link
          to={`/article/${slug}`}
          className="inline-flex items-center text-primary hover:text-primary-light font-medium group/link"
        >
          Leer Más
          <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
