-- Create table for "Something New" articles (like McDonald's history)
CREATE TABLE public.new_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  hero_image_url TEXT,
  author TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for new_articles
ALTER TABLE public.new_articles ENABLE ROW LEVEL SECURITY;

-- Policy for public read access
CREATE POLICY "Anyone can view new articles" 
ON public.new_articles 
FOR SELECT 
USING (true);

-- Create table for "Días" (Days) - circles with topics
CREATE TABLE public.dias (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  day_number INTEGER NOT NULL,
  x_position FLOAT NOT NULL DEFAULT 50,
  y_position FLOAT NOT NULL DEFAULT 50,
  color TEXT DEFAULT '#3b82f6',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for connections between días
CREATE TABLE public.dia_connections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  from_dia_id UUID NOT NULL REFERENCES public.dias(id) ON DELETE CASCADE,
  to_dia_id UUID NOT NULL REFERENCES public.dias(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for dias
ALTER TABLE public.dias ENABLE ROW LEVEL SECURITY;

-- Policy for public read access
CREATE POLICY "Anyone can view dias" 
ON public.dias 
FOR SELECT 
USING (true);

-- Enable RLS for dia_connections
ALTER TABLE public.dia_connections ENABLE ROW LEVEL SECURITY;

-- Policy for public read access
CREATE POLICY "Anyone can view dia connections" 
ON public.dia_connections 
FOR SELECT 
USING (true);

-- Trigger for new_articles updated_at
CREATE TRIGGER update_new_articles_updated_at
BEFORE UPDATE ON public.new_articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger for dias updated_at
CREATE TRIGGER update_dias_updated_at
BEFORE UPDATE ON public.dias
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for "Something New" - McDonald's history article
INSERT INTO public.new_articles (title, content, hero_image_url, author) VALUES
(
  'La Historia de McDonald''s: De Puesto de Hot Dogs a Imperio Global',
  E'# El Comienzo Humilde\n\nEn 1940, los hermanos Richard y Maurice McDonald abrieron su primer restaurante en San Bernardino, California. Lo que comenzó como un simple puesto de hot dogs se transformaría en una de las marcas más reconocidas del mundo.\n\n## La Revolución del Sistema Speedee\n\nEn 1948, los hermanos McDonald revolucionaron la industria con su "Sistema Speedee", un enfoque de línea de ensamblaje para la preparación de alimentos. Este sistema reducía los tiempos de espera y los costos, mientras mantenía la calidad consistente.\n\n### Características Clave:\n- Menú limitado y simplificado\n- Preparación estandarizada\n- Servicio rápido y eficiente\n- Precios accesibles\n\n## La Era de Ray Kroc\n\nEn 1954, Ray Kroc, un vendedor de máquinas de batidos, visitó el restaurante y quedó impresionado por su eficiencia. En 1955, se convirtió en el agente de franquicias y abrió el primer McDonald''s franquiciado en Des Plaines, Illinois.\n\n## Expansión Global\n\nDesde los años 60, McDonald''s comenzó su expansión internacional:\n- 1967: Canadá y Puerto Rico\n- 1971: Japón, Alemania y Australia\n- 1990: Rusia (récord de 30,000 clientes el primer día)\n- Hoy: Más de 39,000 restaurantes en más de 100 países\n\n## Innovaciones Icónicas\n\n### Los Arcos Dorados\nEl logo de los arcos dorados, diseñado en 1962, es reconocido por el 88% de la población mundial.\n\n### El Big Mac\nLanzado en 1968, el Big Mac se ha convertido en el producto más emblemático, usado incluso como índice económico (The Economist''s Big Mac Index).\n\n### Happy Meal\nIntroducido en 1979, revolucionó la comida rápida familiar y estableció estándares de marketing para niños.\n\n## Impacto Cultural y Económico\n\nMcDonald''s no solo cambió la forma en que comemos, sino también:\n- Creó más de 2 millones de empleos directos\n- Estableció estándares de franquicia\n- Influyó en la cultura pop global\n- Innovó en logística y cadena de suministro\n\n## El Presente y el Futuro\n\nHoy, McDonald''s continúa innovando con:\n- Menús personalizables\n- Tecnología de pedidos digitales\n- Compromiso con la sostenibilidad\n- Adaptación a gustos locales\n\n## Conclusión\n\nDe un simple restaurante familiar a un símbolo global de la comida rápida, McDonald''s demuestra cómo la innovación, la estandarización y la adaptación pueden crear un imperio que trasciende fronteras y culturas.',
  'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80',
  'Equipo MicroLearn'
);

-- Insert sample data for "Días"
INSERT INTO public.dias (title, description, day_number, x_position, y_position, color) VALUES
('Historia de Empresas', 'Aprende sobre los orígenes de grandes corporaciones', 1, 30, 40, '#3b82f6'),
('Innovación Empresarial', 'Descubre cómo las empresas revolucionan sus industrias', 2, 50, 30, '#10b981'),
('Estrategias de Marketing', 'Estudia las tácticas que hicieron famosas a las marcas', 3, 70, 45, '#f59e0b');

-- Connect related días
INSERT INTO public.dia_connections (from_dia_id, to_dia_id)
SELECT 
  d1.id,
  d2.id
FROM public.dias d1
CROSS JOIN public.dias d2
WHERE d1.day_number = 1 AND d2.day_number = 2;

INSERT INTO public.dia_connections (from_dia_id, to_dia_id)
SELECT 
  d1.id,
  d2.id
FROM public.dias d1
CROSS JOIN public.dias d2
WHERE d1.day_number = 2 AND d2.day_number = 3;