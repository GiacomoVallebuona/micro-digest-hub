import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";

const Price = () => {
  const features = [
    "Acceso ilimitado a todos los artículos",
    "Resumen diario de noticias curadas",
    "Perspectivas empresariales exclusivas",
    "Análisis premium del mercado",
    "Acceso anticipado a contenido nuevo",
    "Experiencia de lectura sin anuncios",
    "Acceso a la app móvil",
    "Cancela en cualquier momento",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-16 lg:py-24">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Precios Simples y Transparentes
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un plan, aprendizaje ilimitado. Cancela en cualquier momento, sin preguntas.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="max-w-lg mx-auto">
            <Card className="border-2 border-accent shadow-medium">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Membresía Premium</CardTitle>
                <CardDescription className="text-base">
                  Acceso completo a todo el contenido premium
                </CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-foreground">S/15</span>
                  <span className="text-muted-foreground text-lg">/mes</span>
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
                    Comienza Hoy
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground text-center">
                  Garantía de devolución de dinero de 7 días. Sin contratos a largo plazo.
                </p>
              </CardFooter>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Preguntas Frecuentes
            </h2>
            
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  ¿Puedo cancelar mi suscripción en cualquier momento?
                </h3>
                <p className="text-muted-foreground">
                  ¡Sí! Puedes cancelar tu suscripción en cualquier momento sin penalizaciones. Tu acceso continuará hasta el final de tu período de facturación actual.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  ¿Qué métodos de pago aceptan?
                </h3>
                <p className="text-muted-foreground">
                  Aceptamos todas las principales tarjetas de crédito, tarjetas de débito y métodos de pago digitales para tu conveniencia.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  ¿Hay una prueba gratuita disponible?
                </h3>
                <p className="text-muted-foreground">
                  Aunque no ofrecemos una prueba gratuita tradicional, sí proporcionamos una garantía de devolución de dinero de 7 días. Si no estás satisfecho dentro de la primera semana, te devolveremos el pago completo.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  ¿Con qué frecuencia se publica contenido nuevo?
                </h3>
                <p className="text-muted-foreground">
                  Publicamos contenido curado nuevo diariamente, con artículos frescos, actualizaciones de noticias y perspectivas empresariales agregadas cada mañana para mantenerte informado.
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
