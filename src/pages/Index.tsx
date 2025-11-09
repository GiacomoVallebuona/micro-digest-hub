import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { Sparkles, TrendingUp, Newspaper, Award } from "lucide-react";

const Index = () => {
  const sampleArticles = [
    {
      title: "El Futuro de las Prácticas Empresariales Sostenibles",
      excerpt: "Descubre cómo las empresas líderes están transformando sus operaciones para priorizar la sostenibilidad ambiental mientras mantienen la rentabilidad.",
      category: "Negocios",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
      slug: "future-sustainable-business",
      isPremium: true,
    },
    {
      title: "Última Hora: Gigantes Tecnológicos Anuncian Asociación Estratégica",
      excerpt: "Las principales compañías tecnológicas unen fuerzas para desarrollar soluciones de IA de próxima generación, marcando un cambio significativo en el panorama de la industria.",
      category: "Noticias",
      readTime: "4 min",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
      slug: "tech-giants-partnership",
      isPremium: false,
    },
    {
      title: "5 Mercados Emergentes a Observar en 2024",
      excerpt: "Expertos financieros revelan las oportunidades de inversión más prometedoras en economías en rápido desarrollo alrededor del mundo.",
      category: "Negocios",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      slug: "emerging-markets-2024",
      isPremium: true,
    },
  ];

  const features = [
    {
      icon: Newspaper,
      title: "Noticias Curadas Diariamente",
      description: "Mantente informado con artículos seleccionados de fuentes confiables de todo el mundo.",
    },
    {
      icon: TrendingUp,
      title: "Perspectivas de Negocios",
      description: "Profundiza en las tendencias del mercado y análisis estratégicos empresariales.",
    },
    {
      icon: Sparkles,
      title: "Algo Nuevo",
      description: "Descubre perspectivas frescas sobre innovación y tecnologías emergentes.",
    },
    {
      icon: Award,
      title: "Contenido Premium",
      description: "Accede a informes exclusivos en profundidad y comentarios de expertos.",
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
              Aprende Algo Nuevo,{" "}
              <span className="text-primary">Cada Día</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              Tu dosis diaria de noticias curadas y perspectivas empresariales. Únete a miles de profesionales que se mantienen a la vanguardia con micro-educación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-accent hover:bg-accent-hover text-accent-foreground px-8">
                  Comenzar a Aprender - S/15/mes
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Ver Planes
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
              ¿Por Qué Elegir MicroLearn?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Entregamos contenido curado de alta calidad diseñado para profesionales ocupados que valoran su tiempo.
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
              Artículos Destacados
            </h2>
            <p className="text-muted-foreground text-lg">
              Explora nuestro último contenido curado
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
                Ver Todos los Artículos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            ¿Listo para Comenzar a Aprender?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Únete a nuestra comunidad y obtén acceso a contenido premium, perspectivas exclusivas y noticias curadas diariamente por solo S/15 al mes.
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-accent hover:bg-accent-hover text-accent-foreground px-8">
              Suscríbete Ahora
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
