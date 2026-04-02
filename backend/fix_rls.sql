-- Fix RLS: Allow public read access to files table (only metadata, not the actual PDFs)
-- The actual PDF content is protected by Supabase Storage signed URLs

-- Drop the old restrictive policy
DROP POLICY IF EXISTS "Auth users can read files" ON files;

-- Add a public read policy
CREATE POLICY "Anyone can read file metadata" ON files FOR SELECT USING (true);

-- Also make videos publicly readable
DROP POLICY IF EXISTS "Auth users can read videos" ON videos;
CREATE POLICY "Anyone can read videos" ON videos FOR SELECT USING (true);
