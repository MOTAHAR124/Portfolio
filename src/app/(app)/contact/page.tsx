import BlurFade from "@/components/magicui/blur-fade";
import { ContactForm } from "@/components/contact-form";

const BLUR_FADE_DELAY = 0.04;

export const dynamic = "force-static";
export const revalidate = 604800; // 1 week

export default function ContactPage() {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY ?? "";

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
              Send a message and I will get back to you soon.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <ContactForm accessKey={accessKey} />
        </BlurFade>
      </section>
    </main>
  );
}
