import { notFound } from 'next/navigation';
import { getToolsByPersona, Persona } from '@/lib/data';
import PersonaDetailClient from './PersonaDetailClient';

const validPersonas: Persona[] = ["students", "developers", "marketers"];

export function generateStaticParams() {
  return validPersonas.map((persona) => ({ persona }));
}

export async function generateMetadata(props: { params: Promise<{ persona: string }> }) {
  const { persona } = await props.params;
  
  if (!validPersonas.includes(persona as Persona)) {
    return { title: 'Not Found — KIRO' };
  }

  const title = `Best AI Tools for ${persona.charAt(0).toUpperCase() + persona.slice(1)} | KIRO`;
  const description = `Discover the top AI tools curated specifically for ${persona}. Save time and boost your workflow with KIRO.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function PersonaPage(props: { params: Promise<{ persona: string }> }) {
  const { persona } = await props.params;

  if (!validPersonas.includes(persona as Persona)) {
    notFound();
  }

  const tools = getToolsByPersona(persona as Persona);

  return <PersonaDetailClient persona={persona as Persona} tools={tools} />;
}
