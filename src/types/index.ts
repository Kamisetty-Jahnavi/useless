export interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  completed: boolean;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  duration: number;
}