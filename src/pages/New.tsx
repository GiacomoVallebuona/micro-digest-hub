import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatAI from "@/components/ChatAI";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const New = () => {
  const { data: article, isLoading, error } = useQuery({
    queryKey: ["new-article"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("new_articles")
        .select("*")
        .order("published_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 py-12 lg:py-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <Alert variant="destructive" className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No se pudo cargar el artículo. Por favor, intenta de nuevo más tarde.
              </AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <div className="flex gap-4">
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-96 w-full rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : article ? (
            <>
              {/* Article Header */}
              <header className="mb-8">
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
                </div>
              </header>

              {/* Hero Image */}
              {article.hero_image_url && (
                <div className="mb-10 rounded-lg overflow-hidden shadow-medium">
                  <img
                    src={article.hero_image_url}
                    alt={article.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* Article Content with Markdown-style formatting */}
              <div className="article-content prose prose-lg max-w-none">
                {article.content.split('\n').map((line, index) => {
                  // Handle H1
                  if (line.startsWith('# ')) {
                    return (
                      <h1 key={index} className="text-3xl font-bold text-foreground mt-8 mb-4">
                        {line.substring(2)}
                      </h1>
                    );
                  }
                  // Handle H2
                  if (line.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl font-bold text-foreground mt-6 mb-3">
                        {line.substring(3)}
                      </h2>
                    );
                  }
                  // Handle H3
                  if (line.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-xl font-semibold text-foreground mt-5 mb-2">
                        {line.substring(4)}
                      </h3>
                    );
                  }
                  // Handle list items
                  if (line.startsWith('- ')) {
                    return (
                      <li key={index} className="text-foreground leading-relaxed ml-6">
                        {line.substring(2)}
                      </li>
                    );
                  }
                  // Handle empty lines
                  if (line.trim() === '') {
                    return <br key={index} />;
                  }
                  // Regular paragraphs
                  return (
                    <p key={index} className="mb-4 text-foreground leading-relaxed">
                      {line}
                    </p>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                No hay artículos disponibles
              </h3>
              <p className="text-muted-foreground">
                Vuelve pronto para descubrir contenido nuevo.
              </p>
            </div>
          )}
        </article>

        {/* Chat AI */}
        {article && (
          <div className="px-4 sm:px-6 lg:px-8">
            <ChatAI />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default New;
