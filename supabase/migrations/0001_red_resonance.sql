/*
  # Video Analytics Schema

  1. New Tables
    - video_progress
      - Tracks individual student progress on videos
      - Stores watch time and completion status
      - Enables real-time analytics

  2. Security
    - Enable RLS
    - Add policies for student and teacher access
*/

-- Create video progress tracking table
CREATE TABLE IF NOT EXISTS video_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  video_id text NOT NULL,
  progress float NOT NULL DEFAULT 0,
  watch_time float NOT NULL DEFAULT 0,
  completed boolean NOT NULL DEFAULT false,
  last_watched timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  
  UNIQUE(user_id, video_id)
);

-- Enable RLS
ALTER TABLE video_progress ENABLE ROW LEVEL SECURITY;

-- Students can read and update their own progress
CREATE POLICY "Students can manage their own progress"
  ON video_progress
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Teachers can view progress for their courses
CREATE POLICY "Teachers can view course progress"
  ON video_progress
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = video_progress.course_id
      AND courses.instructor_id = auth.uid()
    )
  );