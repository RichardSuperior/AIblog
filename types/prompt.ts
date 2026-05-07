export interface PromptVariable {
  id: string;
  name: string;
  description: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  required: boolean;
  placeholder?: string;
  options?: string[]; // For select type
  defaultValue?: string | number;
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: PromptCategory;
  difficulty: DifficultyLevel;
  aiModel: AIType;
  tags: string[];
  template: string;
  variables: PromptVariable[];
  examples: PromptExample[];
  learningObjectives: string[];
  author?: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  views: number;
  isFeatured: boolean;
}

export interface PromptExample {
  id: string;
  title: string;
  inputValues: Record<string, string | number>;
  outputPreview?: string;
  explanation?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  difficulty: DifficultyLevel;
  duration: number; // in minutes
  modules: CourseModule[];
  prerequisites?: string[];
  learningObjectives: string[];
  enrolledCount: number;
  completionRate: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  content: ModuleContent[];
  exercises: Exercise[];
  estimatedTime: number; // in minutes
}

export interface ModuleContent {
  id: string;
  type: 'text' | 'video' | 'code' | 'interactive';
  title: string;
  content: string;
  order: number;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  type: 'prompt-completion' | 'comparison' | 'scenario' | 'analysis';
  difficulty: DifficultyLevel;
  prompt: string;
  expectedOutput?: string;
  hints: string[];
  sampleSolution?: string;
  points: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  industry: string;
  challenge: string;
  solution: {
    originalPrompt: string;
    improvedPrompt: string;
    explanation: string;
  };
  results: {
    before: string;
    after: string;
    metrics: string[];
  };
  lessons: string[];
  tags: string[];
  author?: string;
  createdAt: Date;
  likes: number;
}

export type PromptCategory =
  | 'content-creation'
  | 'coding-assistance'
  | 'data-analysis'
  | 'problem-solving'
  | 'learning-teaching'
  | 'creativity'
  | 'business'
  | 'research'
  | 'productivity'
  | 'communication';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type AIType = 'gpt-3.5' | 'gpt-4' | 'gpt-4o' | 'claude-3' | 'gemini-pro' | 'generic';

export interface UserProgress {
  id: string;
  userId: string;
  courseId?: string;
  exerciseId?: string;
  templateId?: string;
  completed: boolean;
  score?: number;
  timeSpent: number; // in minutes
  completedAt?: Date;
  lastAccessedAt: Date;
  attempts: number;
  feedback?: string;
}

export interface UserAchievement {
  id: string;
  userId: string;
  type: 'course-completed' | 'exercise-mastered' | 'template-created' | 'streak' | 'explorer';
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  metadata?: Record<string, any>;
}