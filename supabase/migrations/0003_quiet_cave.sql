/*
  # Student Management Schema

  1. New Tables
    - student_progress
      - Tracks student progress across sections and videos
      - Links to user_profiles and videos
    - student_achievements
      - Stores student achievements and badges
      - Tracks progress milestones

  2. Security
    - Enable RLS
    - Add policies for student and teacher access
*/

CREATE TABLE IF NOT EXISTS student_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  section_id uuid NOT NULL,
  video_id text NOT NULL,
  progress float NOT NULL DEFAULT 0,
  watch_time integer NOT NULL DEFAULT 0,
  completed boolean NOT NULL DEFAULT false,
  last_watched timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS student_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  earned_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_achievements ENABLE ROW LEVEL SECURITY;

-- Students can read their own progress
CREATE POLICY "Students can read own progress"
  ON student_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM user_profiles WHERE id = student_progress.student_id
  ));

-- Teachers can view progress in their section
CREATE POLICY "Teachers can view section progress"
  ON student_progress
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.user_id = auth.uid()
      AND user_profiles.role = 'teacher'
      AND user_profiles.section = (
        SELECT section FROM user_profiles WHERE id = student_progress.student_id
      )
    )
  );