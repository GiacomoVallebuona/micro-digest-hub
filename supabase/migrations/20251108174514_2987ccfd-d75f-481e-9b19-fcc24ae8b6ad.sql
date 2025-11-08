-- Create articles table for dynamic content management
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL CHECK (category IN ('news', 'business', 'new')),
  image_url TEXT,
  author TEXT,
  read_time TEXT DEFAULT '5 min read',
  is_premium BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read articles (public content)
CREATE POLICY "Anyone can view published articles" 
ON public.articles 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample articles for Today's News
INSERT INTO public.articles (title, content, excerpt, category, image_url, author, read_time, is_premium) VALUES
(
  'Avances en Inteligencia Artificial Transforman la Industria',
  'La inteligencia artificial continúa revolucionando diversos sectores de la economía global. Empresas líderes están implementando soluciones de IA para optimizar sus procesos, mejorar la experiencia del cliente y desarrollar nuevos productos innovadores.

Los expertos señalan que estamos en un punto de inflexión donde la IA ya no es solo una herramienta experimental, sino una necesidad competitiva. Las organizaciones que adopten estas tecnologías de manera estratégica tendrán ventajas significativas en los próximos años.

Además, la democratización de las herramientas de IA está permitiendo que pequeñas y medianas empresas también puedan beneficiarse de estas tecnologías, nivelando el campo de juego en muchas industrias.',
  'Descubre cómo la IA está cambiando el panorama empresarial y qué significa para el futuro del trabajo.',
  'news',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
  'María González',
  '6 min read',
  false
),
(
  'Nuevas Regulaciones Financieras Entran en Vigor',
  'A partir de este mes, entran en vigor importantes regulaciones financieras diseñadas para proteger a los consumidores y fortalecer la estabilidad del sistema bancario. Las nuevas normativas incluyen requisitos más estrictos de transparencia y límites en ciertas operaciones de alto riesgo.

Los reguladores argumentan que estas medidas son necesarias para prevenir crisis financieras futuras y garantizar que las instituciones operen de manera más responsable. Sin embargo, algunos actores del sector expresan preocupación sobre el posible impacto en la innovación y la competitividad.

Los analistas recomiendan que tanto empresas como consumidores se familiaricen con estos cambios para adaptarse adecuadamente.',
  'Conoce las nuevas regulaciones financieras y cómo afectarán tus inversiones y operaciones bancarias.',
  'news',
  'https://images.unsplash.com/photo-1554224311-beee4ece8217?w=800&q=80',
  'Carlos Rodríguez',
  '5 min read',
  true
),
(
  'Tendencias de Mercado para el Próximo Trimestre',
  'Los analistas financieros proyectan un panorama mixto para los próximos meses. Mientras algunos sectores muestran señales de crecimiento sostenido, otros enfrentan desafíos significativos debido a factores económicos globales.

El sector tecnológico continúa atrayendo inversiones, especialmente en áreas de inteligencia artificial, computación en la nube y ciberseguridad. Por otro lado, sectores tradicionales están experimentando procesos de transformación digital para mantenerse competitivos.

Los expertos recomiendan diversificar las carteras y mantenerse informados sobre los desarrollos económicos globales que podrían impactar los mercados locales.',
  'Análisis profundo de las tendencias que definirán los mercados en los próximos meses.',
  'news',
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
  'Ana Martínez',
  '7 min read',
  true
);