CREATE TABLE public.compliments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  compliment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.compliments ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a compliment
CREATE POLICY "Anyone can insert compliments"
  ON public.compliments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 100
    AND char_length(compliment) BETWEEN 1 AND 1000
  );

-- No public read access; reading is done via secured edge function only.