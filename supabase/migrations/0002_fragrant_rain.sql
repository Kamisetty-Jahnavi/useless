/*
  # Authentication Schema

  1. New Tables
    - user_profiles
      - Stores PassPoints and user metadata
      - Links to auth.users
      - Includes role and section information

  2. Security
    - Enable RLS
    - Add policies for secure access
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  pass_points jsonb NOT NULL,
  role text NOT NULL CHECK (role IN ('teacher', 'student')),
  section text,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_login timestamptz
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Teachers can view profiles in their section
CREATE POLICY "Teachers can view section profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles teacher
      WHERE teacher.user_id = auth.uid()
      AND teacher.role = 'teacher'
      AND teacher.section = user_profiles.section
    )
  );