import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { ProjectPage } from "@/components/project-page";

type Params = { params: Promise<{ slug: string }> };

// Build one static page per project at build time.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title.en,
    description: project.summary.en,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.title.en, description: project.summary.en, url: `/projects/${project.slug}` },
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  if (!getProject(slug)) notFound();
  return <ProjectPage slug={slug} />;
}
