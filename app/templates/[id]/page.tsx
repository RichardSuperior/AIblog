import { getPromptById, getAllPrompts } from "@/lib/prompt";
import TemplateDetail from "./TemplateDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const prompt = getPromptById(id);
  if (!prompt) return { title: "模板未找到 | AI编程之家" };
  return {
    title: `${prompt.title} | AI编程之家`,
    description: prompt.description,
  };
}

export default async function TemplatePage({ params }: PageProps) {
  const { id } = await params;
  const prompt = getPromptById(id);
  const allPrompts = getAllPrompts();
  const relatedPrompts = allPrompts
    .filter(p => p.id !== id && (!prompt || p.category === prompt.category))
    .slice(0, 3);

  return <TemplateDetail prompt={prompt} relatedPrompts={relatedPrompts} />;
}
