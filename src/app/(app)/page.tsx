import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CinematicSection } from "@/components/cinematic-section";
import { portableTextToPlainText } from "@/lib/utils";
import {
  getAuthorData,
  getEducation,
  getProjects,
  getWorkExperience,
} from "@/lib/data";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export const dynamic = "force-static";
export const revalidate = 604800; // 1 week

export default async function Page() {
  const [author, work, education, projects] = await Promise.all([
    getAuthorData(),
    getWorkExperience(),
    getEducation(),
    getProjects(),
  ]);

  if (!author) return null;

  return (
    <main className="flex flex-col min-h-dvh space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Hi, I'm ${author.name ?? ""}`}
              />
              <BlurFadeText
                className="max-w-150 md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={portableTextToPlainText(author.description!)}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 1.2}>
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <a
                    href="/api/resume"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-lg bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                  >
                    View Resume (PDF)
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-lg bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                  >
                    Contact Me
                  </Link>
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="shrink-0 -mt-5">
              <Avatar className="size-28 border">
                <AvatarImage
                  alt={author.name ?? ""}
                  src={author.avatar?.asset?.url ?? ""}
                  className="object-cover scale-160"
                />
                <AvatarFallback>{author.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            <PortableText value={author.summary ?? []} />
          </div>
        </BlurFade>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {work.map((item, id) => (
            <BlurFade key={item._id} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
              <ResumeCard
                key={item._id}
                logoUrl={item.logo?.asset?.url ?? ""}
                altText={item.company ?? ""}
                title={item.company ?? ""}
                subtitle={item.title ?? ""}
                href={item.url ?? ""}
                period={`${item.startDate} - ${item.endDate ?? "Present"}`}
                description={portableTextToPlainText(item.description!)}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {education.map((item, id) => (
            <BlurFade key={item._id} delay={BLUR_FADE_DELAY * 8 + id * 0.05}>
              <ResumeCard
                key={item._id}
                href={item.url ?? ""}
                logoUrl={item.logo?.asset?.url ?? ""}
                altText={item.school ?? ""}
                title={item.school ?? ""}
                subtitle={item.degree ?? ""}
                period={`${item.startDate} - ${item.endDate}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {author.skills?.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <CinematicSection />
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="mx-3 mt-8 rounded-2xl border border-border/70 bg-muted/30 p-3 sm:mx-auto sm:mt-10 sm:max-w-[52rem] sm:p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {projects.map((project, id) => {
                const demoLink =
                  project.links?.find((item) => item.type === "demo")?.url ?? "";

                return (
                  <BlurFade
                    key={project._id}
                    delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                  >
                    <ProjectCard
                      key={project._id}
                      title={project.title ?? ""}
                      description={project.description ?? []}
                      tags={project.technologies ?? []}
                      image={project.image?.asset?.url ?? ""}
                      video={project.video ?? ""}
                      links={project.links ?? []}
                      href={demoLink}
                    />
                  </BlurFade>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <Link
                href="/contact"
                className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm"
              >
                Contact
              </Link>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-150 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Feel free to{" "}
                <Link
                  href="/contact"
                  className="text-blue-500 hover:underline"
                >
                  send me an email
                </Link>{" "}
                or reach out on{" "}
                <Link
                  href={author.social?.github ?? ""}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
                . I&apos;ll respond whenever I can.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
      <footer className="pb-12 sm:pb-6 text-center text-xs text-muted-foreground">
        <p>
          Built with Next.js and Tailwind CSS.
        </p>
      </footer>
    </main>
  );
}
