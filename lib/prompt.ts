import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PromptTemplate, Course, CaseStudy, Exercise, DifficultyLevel, PromptCategory } from '../types/prompt';

const promptsDirectory = path.join(process.cwd(), 'content/prompts');
const coursesDirectory = path.join(process.cwd(), 'content/courses');
const caseStudiesDirectory = path.join(process.cwd(), 'content/case-studies');
const exercisesDirectory = path.join(process.cwd(), 'content/exercises');

// Utility function to get all files in a directory
function getAllFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = entries
    .filter(entry => entry.isFile() && entry.name.endsWith('.md'))
    .map(entry => entry.name);
  return files;
}

// Load a single prompt template
export function getPromptById(id: string): PromptTemplate | null {
  try {
    const fullPath = path.join(promptsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Parse variables
    const variables = data.variables || [];

    return {
      id,
      title: data.title,
      description: data.description,
      category: data.category as PromptCategory,
      difficulty: data.difficulty as DifficultyLevel,
      aiModel: data.aiModel,
      tags: data.tags || [],
      template: content,
      variables,
      examples: data.examples || [],
      learningObjectives: data.learningObjectives || [],
      author: data.author,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      likes: data.likes || 0,
      views: data.views || 0,
      isFeatured: data.isFeatured || false,
    };
  } catch (error) {
    return null;
  }
}

// Load all prompt templates
export function getAllPrompts(): PromptTemplate[] {
  const files = getAllFiles(promptsDirectory);
  const allPrompts = files.map((file) => {
    const id = file.replace(/\.md$/, '');
    return getPromptById(id);
  }).filter(Boolean) as PromptTemplate[];

  // Sort by views descending
  return allPrompts.sort((a, b) => b.views - a.views);
}

// Get featured templates
export function getFeaturedTemplates(): PromptTemplate[] {
  const allPrompts = getAllPrompts();
  return allPrompts.filter(prompt => prompt.isFeatured).slice(0, 6);
}

// Get templates by category
export function getPromptsByCategory(category: PromptCategory): PromptTemplate[] {
  const allPrompts = getAllPrompts();
  return allPrompts.filter(prompt => prompt.category === category);
}

// Get templates by difficulty
export function getPromptsByDifficulty(difficulty: DifficultyLevel): PromptTemplate[] {
  const allPrompts = getAllPrompts();
  return allPrompts.filter(prompt => prompt.difficulty === difficulty);
}

// Search templates
export function searchPrompts(query: string): PromptTemplate[] {
  const allPrompts = getAllPrompts();
  const lowercaseQuery = query.toLowerCase();

  return allPrompts.filter(prompt =>
    prompt.title.toLowerCase().includes(lowercaseQuery) ||
    prompt.description.toLowerCase().includes(lowercaseQuery) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

// Load all courses
export function getCourses(): Course[] {
  const files = getAllFiles(coursesDirectory);
  const allCourses = files.map((file) => {
    const id = file.replace(/\.md$/, '');
    return getCourseById(id);
  }).filter(Boolean) as Course[];

  // Sort by enrolled count descending
  return allCourses.sort((a, b) => b.enrolledCount - a.enrolledCount);
}

// Load a single course
export function getCourseById(id: string): Course | null {
  try {
    const fullPath = path.join(coursesDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      id,
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail,
      difficulty: data.difficulty as DifficultyLevel,
      duration: data.duration,
      modules: data.modules || [],
      prerequisites: data.prerequisites || [],
      learningObjectives: data.learningObjectives || [],
      enrolledCount: data.enrolledCount || 0,
      completionRate: data.completionRate || 0,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  } catch (error) {
    return null;
  }
}

// Load all case studies
export function getAllCaseStudies(): CaseStudy[] {
  const files = getAllFiles(caseStudiesDirectory);
  const allCaseStudies = files.map((file) => {
    const id = file.replace(/\.md$/, '');
    return getCaseStudyById(id);
  }).filter(Boolean) as CaseStudy[];

  // Sort by likes descending
  return allCaseStudies.sort((a, b) => b.likes - a.likes);
}

// Load a single case study
export function getCaseStudyById(id: string): CaseStudy | null {
  try {
    const fullPath = path.join(caseStudiesDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      id,
      title: data.title,
      description: data.description,
      industry: data.industry,
      challenge: data.challenge,
      solution: data.solution,
      results: data.results,
      lessons: data.lessons || [],
      tags: data.tags || [],
      author: data.author,
      createdAt: new Date(data.createdAt),
      likes: data.likes || 0,
    };
  } catch (error) {
    return null;
  }
}

// Load all exercises
export function getAllExercises(): Exercise[] {
  const files = getAllFiles(exercisesDirectory);
  const allExercises = files.map((file) => {
    const id = file.replace(/\.md$/, '');
    return getExerciseById(id);
  }).filter(Boolean) as Exercise[];

  return allExercises;
}

// Load a single exercise
export function getExerciseById(id: string): Exercise | null {
  try {
    const fullPath = path.join(exercisesDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      id,
      title: data.title,
      description: data.description,
      type: data.type,
      difficulty: data.difficulty as DifficultyLevel,
      prompt: content,
      expectedOutput: data.expectedOutput,
      hints: data.hints || [],
      sampleSolution: data.sampleSolution,
      points: data.points || 10,
    };
  } catch (error) {
    return null;
  }
}

// Get daily challenge
export function getDailyChallenge(): Exercise | null {
  const allExercises = getAllExercises();
  // For now, return the first exercise
  // In a real app, this would be based on date rotation
  return allExercises[0] || null;
}

// Get all categories with counts
export function getAllCategories(): Array<{ name: PromptCategory; count: number }> {
  const allPrompts = getAllPrompts();
  const categoryCounts = allPrompts.reduce((acc, prompt) => {
    acc[prompt.category] = (acc[prompt.category] || 0) + 1;
    return acc;
  }, {} as Record<PromptCategory, number>);

  return Object.entries(categoryCounts).map(([name, count]) => ({
    name: name as PromptCategory,
    count,
  }));
}

// Get all tags with counts
export function getAllTags(): Array<{ name: string; count: number }> {
  const allPrompts = getAllPrompts();
  const tagCounts = allPrompts.reduce((acc, prompt) => {
    prompt.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}