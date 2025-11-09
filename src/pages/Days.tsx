import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface Dia {
  id: string;
  title: string;
  description: string;
  day_number: number;
  x_position: number;
  y_position: number;
  color: string;
}

interface Connection {
  from_dia_id: string;
  to_dia_id: string;
}

const Days = () => {
  const [hoveredDia, setHoveredDia] = useState<string | null>(null);

  const { data: dias, isLoading: diasLoading, error: diasError } = useQuery({
    queryKey: ["dias"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("dias")
        .select("*")
        .order("day_number", { ascending: true });

      if (error) throw error;
      return data as Dia[];
    },
  });

  const { data: connections, isLoading: connectionsLoading } = useQuery({
    queryKey: ["dia-connections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("dia_connections")
        .select("*");

      if (error) throw error;
      return data as Connection[];
    },
  });

  const isLoading = diasLoading || connectionsLoading;

  // Function to get SVG line coordinates
  const getLineCoordinates = (fromId: string, toId: string) => {
    const fromDia = dias?.find(d => d.id === fromId);
    const toDia = dias?.find(d => d.id === toId);
    
    if (!fromDia || !toDia) return null;

    return {
      x1: `${fromDia.x_position}%`,
      y1: `${fromDia.y_position}%`,
      x2: `${toDia.x_position}%`,
      y2: `${toDia.y_position}%`,
    };
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Días de Aprendizaje
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explora los diferentes temas de aprendizaje. Pasa el cursor sobre cada círculo para ver más detalles. Las líneas conectan temas relacionados.
            </p>
          </div>

          {/* Error State */}
          {diasError && (
            <Alert variant="destructive" className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Hubo un error al cargar los días. Por favor, intenta de nuevo más tarde.
              </AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center h-96">
              <div className="space-y-4 text-center">
                <Skeleton className="h-24 w-24 rounded-full mx-auto" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          )}

          {/* Interactive Canvas */}
          {!isLoading && dias && (
            <div className="relative w-full bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-lg border border-border overflow-hidden" style={{ height: "600px" }}>
              {/* SVG for connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                {connections?.map((connection, index) => {
                  const coords = getLineCoordinates(connection.from_dia_id, connection.to_dia_id);
                  if (!coords) return null;
                  
                  return (
                    <line
                      key={index}
                      x1={coords.x1}
                      y1={coords.y1}
                      x2={coords.x2}
                      y2={coords.y2}
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      strokeOpacity="0.3"
                      strokeDasharray="5,5"
                    />
                  );
                })}
              </svg>

              {/* Floating circles */}
              {dias.map((dia) => (
                <div
                  key={dia.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110"
                  style={{
                    left: `${dia.x_position}%`,
                    top: `${dia.y_position}%`,
                    zIndex: hoveredDia === dia.id ? 10 : 2,
                  }}
                  onMouseEnter={() => setHoveredDia(dia.id)}
                  onMouseLeave={() => setHoveredDia(null)}
                >
                  {/* Circle */}
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center cursor-pointer shadow-medium hover:shadow-lg transition-all duration-300"
                    style={{
                      backgroundColor: dia.color,
                      boxShadow: hoveredDia === dia.id ? `0 0 30px ${dia.color}` : undefined,
                    }}
                  >
                    <span className="text-white font-bold text-lg sm:text-xl">
                      Día {dia.day_number}
                    </span>
                  </div>

                  {/* Tooltip */}
                  {hoveredDia === dia.id && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-64 bg-card border border-border rounded-lg shadow-medium p-4 animate-fade-in">
                      <h3 className="font-bold text-foreground mb-2">{dia.title}</h3>
                      <p className="text-sm text-muted-foreground">{dia.description}</p>
                      <div className="mt-2 text-xs text-primary font-medium">
                        Día #{dia.day_number}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && dias && dias.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                No hay días disponibles
              </h3>
              <p className="text-muted-foreground">
                Vuelve pronto para explorar nuevos temas de aprendizaje.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Days;
