import BlurFade from "@/components/magicui/blur-fade";
import { getAuthorData } from "@/lib/data";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export const dynamic = "force-static";
export const revalidate = 604800; // 1 week

export default async function ContactPage() {
  const author = await getAuthorData();

  if (!author) return null;

  const contactItems = [
    { label: "Name", value: author.name ?? "" },
    { label: "Location", value: author.location ?? "" },
    {
      label: "Email",
      value: author.social?.email ?? "",
      href: author.social?.email ? `mailto:${author.social.email}` : "",
    },
    {
      label: "GitHub",
      value: author.social?.github ?? "",
      href: author.social?.github ?? "",
    },
    {
      label: "LinkedIn",
      value: author.social?.linkedin ?? "",
      href: author.social?.linkedin ?? "",
    },
    {
      label: "Twitter",
      value: author.social?.twitter ?? "",
      href: author.social?.twitter ?? "",
    },
    {
      label: "YouTube",
      value: author.social?.youtube ?? "",
      href: author.social?.youtube ?? "",
    },
  ].filter((item) => item.value);

  return (
    <main className="flex flex-col min-h-dvh space-y-10">
      <section className="w-full py-12">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="space-y-3 text-center">
            <div className="inline-block rounded-lg bg-foreground px-3 py-1 text-sm text-background">
              Contact
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mx-auto max-w-150 text-muted-foreground md:text-xl/relaxed">
              All my contact details are listed below. Reach out through email
              or social links.
            </p>
          </div>
        </BlurFade>

        <div className="mx-auto mt-10 w-full max-w-150 space-y-3">
          {contactItems.map((item, id) => {
            const isExternal = Boolean(item.href && /^https?:\/\//.test(item.href));

            return (
              <BlurFade key={item.label} delay={BLUR_FADE_DELAY * 2 + id * 0.05}>
                <div className="rounded-xl border bg-card/40 p-4">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  {item.href ? (
                    <Link
                      href={item.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="break-all text-base text-blue-500 hover:underline"
                    >
                      {item.value}
                    </Link>
                  ) : (
                    <p className="break-all text-base">{item.value}</p>
                  )}
                </div>
              </BlurFade>
            );
          })}
        </div>
      </section>
    </main>
  );
}
