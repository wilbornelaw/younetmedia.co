-- Run this in the Supabase SQL editor after the initial schema

ALTER TABLE videos
  ADD COLUMN IF NOT EXISTS thumbnail_offset_seconds INTEGER DEFAULT 2 NOT NULL;
