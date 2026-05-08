import { getExerciseById } from "@/lib/prompt";
import PracticeDetail from "./PracticeDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const exercise = getExerciseById(id);
  if (!exercise) return { title: "练习未找到 | AI编程之家" };
  return {
    title: `${exercise.title} | AI编程之家`,
    description: exercise.description,
  };
}

export default async function PracticePage({ params }: PageProps) {
  const { id } = await params;
  const exercise = getExerciseById(id);
  return <PracticeDetail exercise={exercise} />;
}
