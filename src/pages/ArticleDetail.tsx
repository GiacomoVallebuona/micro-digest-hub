import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Clock, Calendar, User, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: article, isLoading, error } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-1 py-12">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No se pudo cargar el artículo. Por favor, intenta de nuevo más tarde.
              </AlertDescription>
            </Alert>
            <Link to="/news" className="mt-8 inline-block">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Noticias
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 py-12 lg:py-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link to="/news" className="inline-block mb-8">
            <Button variant="ghost" className="text-primary hover:text-primary-light">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Noticias
            </Button>
          </Link>

          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <div className="flex gap-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-96 w-full rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : (
            article && (
              <>
                {/* Article Header */}
                <header className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                      {article.category === "news" ? "Noticias" : article.category === "business" ? "Negocios" : "Algo Nuevo"}
                    </Badge>
                    {article.is_premium && (
                      <Badge className="bg-accent text-accent-foreground">
                        Premium
                      </Badge>
                    )}
                  </div>

                  <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                    {article.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                    {article.author && (
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        <span>{article.author}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>
                        {format(new Date(article.published_at), "d 'de' MMMM, yyyy", { locale: es })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{article.read_time}</span>
                    </div>
                  </div>
                </header>

                {/* Featured Image */}
                {article.image_url && (
                  <div className="mb-10 rounded-lg overflow-hidden shadow-medium">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                {/* Article Content */}
                <div className="article-content prose prose-lg max-w-none">
                  {article.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-6 text-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* CTA Section */}
                <div className="mt-12 p-8 bg-muted rounded-lg border border-border">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    ¿Te gustó este artículo?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Suscríbete para acceder a contenido exclusivo y análisis profundos.
                  </p>
                  <Link to="/auth">
                    <Button className="bg-accent hover:bg-accent-hover text-accent-foreground">
                      Suscríbete por S/15/mes
                    </Button>
                  </Link>
                </div>
              </>
            )
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
