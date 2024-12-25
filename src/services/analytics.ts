import { supabase } from '../lib/supabase';

interface VideoProgress {
  userId: string;
  courseId: string;
  lessonId: string;
  videoId: string;
  progress: number;
  watchTime: number;
  completed: boolean;
}

export const updateVideoProgress = async (data: VideoProgress) => {
  const { error } = await supabase
    .from('video_progress')
    .upsert({
      user_id: data.userId,
      course_id: data.courseId,
      lesson_id: data.lessonId,
      video_id: data.videoId,
      progress: data.progress,
      watch_time: data.watchTime,
      completed: data.completed,
      last_watched: new Date().toISOString()
    }, {
      onConflict: 'user_id,video_id'
    });

  if (error) throw error;
};

export const getStudentAnalytics = async (userId: string) => {
  const { data, error } = await supabase
    .from('video_progress')
    .select(`
      *,
      courses:course_id (title),
      lessons:lesson_id (title)
    `)
    .eq('user_id', userId)
    .order('last_watched', { ascending: false });

  if (error) throw error;
  return data;
};

export const getCourseAnalytics = async (courseId: string) => {
  const { data, error } = await supabase
    .from('video_progress')
    .select(`
      *,
      users:user_id (name, email),
      lessons:lesson_id (title)
    `)
    .eq('course_id', courseId)
    .order('last_watched', { ascending: false });

  if (error) throw error;
  return data;
};