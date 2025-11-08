import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const News = () => {
  const { data: articles, isLoading, error } = useQuery({
    queryKey: ["news-articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("category", "news")
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Set up realtime subscription for live updates
  useEffect(() => {
    const channel = supabase
      .channel("news-articles-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "articles",
          filter: "category=eq.news",
        },
        () => {
          // Refetch articles when changes occur
          window.location.reload();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Noticias de Hoy
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Mantente informado con nuestras últimas noticias curadas. Contenido actualizado diariamente para que no te pierdas nada importante.
            </p>
          </div>

          {/* Error State */}
          {error && (
            <Alert variant="destructive" className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Hubo un error al cargar las noticias. Por favor, intenta de nuevo más tarde.
              </AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          )}

          {/* Articles Grid */}
          {!isLoading && articles && articles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt || article.content.substring(0, 150) + "..."}
                  category="Noticias"
                  readTime={article.read_time || "5 min read"}
                  image={article.image_url || "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80"}
                  slug={article.id}
                  isPremium={article.is_premium}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && articles && articles.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                No hay noticias disponibles
              </h3>
              <p className="text-muted-foreground">
                Vuelve pronto para ver las últimas actualizaciones.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default News;
