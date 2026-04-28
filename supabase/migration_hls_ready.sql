-- Run this in the Supabase SQL editor after the initial schema

ALTER TABLE videos ADD COLUMN IF NOT EXISTS hls_ready BOOLEAN DEFAULT FALSE;

-- Existing videos have likely had HLS generated on-demand already; mark them ready
UPDATE videos SET hls_ready = TRUE WHERE hls_url IS NOT NULL;
