import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPeriod = (period: string) => {
  const [start, end] = period.split(" - ");
  const isYearOnly = (value: string) => /^\d{4}$/.test(value.trim());
  const formatDate = (value: string) => {
    if (isYearOnly(value)) return value.trim();
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(value));
  };

  const startDate = formatDate(start);
  const endDate = end === "Present" ? end : formatDate(end);
  return `${startDate} - ${endDate}`;
};

export function portableTextToPlainText(blocks: any[] = []): string {
  return (
    blocks
      ?.map((block) =>
        block._type === "block"
          ? block.children?.map((child: any) => child.text).join("")
          : ""
      )
      .join("\n\n") ?? ""
  );
}
