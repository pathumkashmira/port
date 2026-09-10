import { notFound } from 'next/navigation';
import { INITIAL_PROJECTS } from '@/data/projects';
import { ProjectCaseStudy } from '@/components/work/ProjectCaseStudy';
import { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return INITIAL_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = INITIAL_PROJECTS.find((p) => p.slug === params.slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} — 3D Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Pethum Kashmira`,
      description: project.description,
      images: [{ url: project.heroImage }],
    },
  };
}

export default function ProjectPage({ params }: PageProps) {
  const projectIndex = INITIAL_PROJECTS.findIndex((p) => p.slug === params.slug);
  if (projectIndex === -1) {
    notFound();
  }

  const project = INITIAL_PROJECTS[projectIndex];
  const nextProject = INITIAL_PROJECTS[(projectIndex + 1) % INITIAL_PROJECTS.length];

  return <ProjectCaseStudy project={project} nextProject={nextProject} />;
}
