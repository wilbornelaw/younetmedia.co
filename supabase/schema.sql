-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  cloudinary_public_id TEXT NOT NULL,
  video_url TEXT NOT NULL,
  hls_url TEXT,
  hls_ready BOOLEAN DEFAULT FALSE NOT NULL,
  thumbnail_url TEXT NOT NULL,
  thumbnail_offset_seconds INTEGER DEFAULT 2 NOT NULL,
  duration INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view videos"
  ON videos FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated users can write
CREATE POLICY "Authenticated users can insert videos"
  ON videos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update videos"
  ON videos FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete videos"
  ON videos FOR DELETE
  TO authenticated
  USING (true);
