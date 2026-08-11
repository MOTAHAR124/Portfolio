"use client";

import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type SubmitState = "idle" | "sending" | "sent" | "error";

export function ContactForm({ accessKey }: { accessKey: string }) {
  const [state, setState] = useState<SubmitState>("idle");

  useEffect(() => {
    if (state === "sent") {
      const timer = setTimeout(() => {
        setState("idle");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("botcheck")) {
      setState("sent");
      form.reset();
      return;
    }

    formData.append("access_key", accessKey);
    formData.append("from_name", "Portfolio Contact Form");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      const result = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !result?.success) {
        console.error("Web3Forms error:", result?.message || response.statusText);
        setState("error");
        return;
      }

      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 w-full max-w-150 space-y-5 rounded-lg border bg-card/40 p-5 shadow-sm sm:p-6"
    >
      <input type="checkbox" name="botcheck" className="hidden" />

      {state === "sent" ? (
        <p className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
          Message sent successfully.
        </p>
      ) : null}

      {state === "error" ? (
        <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
          Message could not be sent. Please try again.
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            required
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Your Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="What is this about?"
          required
          className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Write your message..."
          required
          rows={6}
          className="min-h-40 w-full resize-y rounded-md border border-input bg-background px-3 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
        />
      </div>

      <div className="flex justify-center">
        <Button
          type="submit"
          size="lg"
          disabled={state === "sending" || !accessKey}
          className="w-full max-w-72 cursor-pointer gap-2 uppercase sm:w-72"
        >
          <Send className="size-4" aria-hidden="true" />
          {state === "sending" ? "SENDING" : "SUBMIT"}
        </Button>
      </div>
    </form>
  );
}
