import { supabase } from '../lib/supabase';

interface Point {
  x: number;
  y: number;
}

interface AuthResponse {
  user: any;
  error: any;
}

const TOLERANCE = 20; // Pixel tolerance for point matching

const comparePoints = (savedPoints: Point[], inputPoints: Point[]): boolean => {
  if (savedPoints.length !== inputPoints.length) return false;

  return inputPoints.every((point, index) => {
    const savedPoint = savedPoints[index];
    const xDiff = Math.abs(point.x - savedPoint.x);
    const yDiff = Math.abs(point.y - savedPoint.y);
    return xDiff <= TOLERANCE && yDiff <= TOLERANCE;
  });
};

export const registerWithPassPoints = async (
  email: string,
  points: Point[],
  section: string,
  role: 'teacher' | 'student'
): Promise<AuthResponse> => {
  try {
    const { data: { user }, error } = await supabase.auth.signUp({
      email,
      password: crypto.randomUUID(), // Generate random password as we'll use PassPoints
    });

    if (error) throw error;

    // Store PassPoints data
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        user_id: user?.id,
        pass_points: points,
        section,
        role
      });

    if (profileError) throw profileError;

    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

export const loginWithPassPoints = async (
  email: string,
  points: Point[]
): Promise<AuthResponse> => {
  try {
    // Get stored points for user
    const { data: profiles, error: profileError } = await supabase
      .from('user_profiles')
      .select('pass_points, role, section')
      .eq('email', email)
      .single();

    if (profileError) throw profileError;

    const isValid = comparePoints(profiles.pass_points, points);
    if (!isValid) {
      throw new Error('Invalid PassPoints');
    }

    // Login user
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password: 'dummy', // Actual authentication is done via PassPoints
    });

    if (error) throw error;

    return { 
      user: {
        ...user,
        role: profiles.role,
        section: profiles.section
      }, 
      error: null 
    };
  } catch (error) {
    return { user: null, error };
  }
};