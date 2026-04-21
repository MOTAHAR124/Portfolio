import {
  AUTHOR,
  EDUCATION,
  PROJECTS,
  WORK_EXPERIENCE,
} from "@/constants/portfolio";
import { PDFDocument, PDFName, PDFString, StandardFonts, rgb } from "pdf-lib";

export const runtime = "nodejs";

function portableTextToPlainText(blocks: any[] = []): string {
  return (
    blocks
      ?.map((block) =>
        block?._type === "block"
          ? block?.children?.map((child: any) => child?.text ?? "").join("")
          : ""
      )
      .join("\n\n") ?? ""
  );
}

function normalizeText(text: string): string {
  return text
    .replaceAll("\r\n", "\n")
    .replaceAll("Ã¢â‚¬Â¢", "-")
    .replaceAll("â€¢", "-")
    .replaceAll("•", "-")
    .replaceAll("\u2019", "'")
    .replaceAll("\u2014", "-")
    .trim();
}

function wrapText(
  text: string,
  maxWidth: number,
  getWidth: (value: string) => number
): string[] {
  if (!text) return [""];
  const words = text.split(/\s+/).filter(Boolean);
  if (!words.length) return [""];

  const lines: string[] = [];
  let line = words[0];

  for (let i = 1; i < words.length; i += 1) {
    const candidate = `${line} ${words[i]}`;
    if (getWidth(candidate) <= maxWidth) {
      line = candidate;
    } else {
      lines.push(line);
      line = words[i];
    }
  }
  lines.push(line);
  return lines;
}

type ParsedSkillLine = {
  label: string;
  value: string;
};

type ParsedSkillBlock = {
  title: string;
  details: ParsedSkillLine[];
};

function parseSkills(skills: string[] = []): ParsedSkillBlock[] {
  return skills
    .map((entry) => {
      const lines = entry
        .split("\n")
        .map((line) => normalizeText(line))
        .filter(Boolean);

      const parsed = lines
        .map((line) => {
          const colonIndex = line.indexOf(":");
          if (colonIndex === -1) return null;

          return {
            label: normalizeText(line.slice(0, colonIndex)),
            value: normalizeText(line.slice(colonIndex + 1)),
          };
        })
        .filter((line): line is ParsedSkillLine => Boolean(line && line.label && line.value));

      if (!parsed.length) return null;

      const [first, ...rest] = parsed;
      return {
        title: first.label,
        details: [{ label: "Core", value: first.value }, ...rest],
      };
    })
    .filter((block): block is ParsedSkillBlock => Boolean(block));
}

export async function GET() {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let page = pdfDoc.addPage([612, 792]); // US Letter
  const margin = 48;
  const contentWidth = page.getWidth() - margin * 2;
  const bottomGuard = margin + 24;
  let y = page.getHeight() - margin;

  const colors = {
    text: rgb(0.1, 0.1, 0.1),
    muted: rgb(0.35, 0.35, 0.35),
    heading: rgb(0.06, 0.06, 0.06),
    line: rgb(0.82, 0.82, 0.82),
    link: rgb(0.03, 0.28, 0.66),
  };

  const sizes = {
    name: 27,
    title: 12,
    section: 11,
    body: 10.5,
    meta: 9.6,
  };

  const lineHeight = 14;

  const ensureSpace = (required = bottomGuard) => {
    if (y < required) {
      page = pdfDoc.addPage([612, 792]);
      y = page.getHeight() - margin;
    }
  };

  const drawDivider = () => {
    y -= 4;
    ensureSpace();
    page.drawLine({
      start: { x: margin, y },
      end: { x: page.getWidth() - margin, y },
      thickness: 1,
      color: colors.line,
    });
    y -= 10;
  };

  const drawLines = (
    lines: string[],
    options?: { bold?: boolean; size?: number; color?: "text" | "muted"; indent?: number }
  ) => {
    const drawFont = options?.bold ? boldFont : font;
    const size = options?.size ?? sizes.body;
    const color = options?.color === "muted" ? colors.muted : colors.text;
    const indent = options?.indent ?? 0;
    for (const line of lines) {
      ensureSpace();
      page.drawText(line, {
        x: margin + indent,
        y,
        size,
        font: drawFont,
        color,
      });
      y -= lineHeight;
    }
  };

  const addUriLink = (
    linkPage: typeof page,
    url: string,
    x: number,
    yBottom: number,
    x2: number,
    yTop: number
  ) => {
    const annotation = pdfDoc.context.obj({
      Type: PDFName.of("Annot"),
      Subtype: PDFName.of("Link"),
      Rect: [x, yBottom, x2, yTop],
      Border: [0, 0, 0],
      A: {
        Type: PDFName.of("Action"),
        S: PDFName.of("URI"),
        URI: PDFString.of(url),
        NewWindow: true,
      },
    });
    const annotationRef = pdfDoc.context.register(annotation);
    linkPage.node.addAnnot(annotationRef);
  };

  const drawParagraph = (
    text: string,
    options?: {
      bold?: boolean;
      size?: number;
      color?: "text" | "muted";
      gapAfter?: number;
      indent?: number;
    }
  ) => {
    const drawFont = options?.bold ? boldFont : font;
    const size = options?.size ?? sizes.body;
    const indent = options?.indent ?? 0;
    const lines = wrapText(
      text,
      contentWidth - indent,
      (value) => drawFont.widthOfTextAtSize(value, size)
    );
    drawLines(lines, { ...options, indent });
    if (options?.gapAfter) y -= options.gapAfter;
  };

  const drawLink = (
    label: string,
    url: string,
    options?: { size?: number; gapAfter?: number; indent?: number }
  ) => {
    const size = options?.size ?? sizes.meta;
    const indent = options?.indent ?? 0;
    const lines = wrapText(
      label,
      contentWidth - indent,
      (value) => font.widthOfTextAtSize(value, size)
    );

    for (const line of lines) {
      ensureSpace();
      const lineY = y;
      const textWidth = font.widthOfTextAtSize(line, size);
      const x = margin + indent;

      page.drawText(line, {
        x,
        y: lineY,
        size,
        font,
        color: colors.link,
      });

      // Underline for stronger visual affordance in PDF viewers.
      page.drawLine({
        start: { x, y: lineY - 1.2 },
        end: { x: x + textWidth, y: lineY - 1.2 },
        thickness: 0.6,
        color: colors.link,
      });

      addUriLink(page, url, x, lineY - 2, x + textWidth, lineY + size + 2);
      y -= lineHeight;
    }

    if (options?.gapAfter) y -= options.gapAfter;
  };

  const drawBulletItem = (text: string, gapAfter = 0) => {
    const bullet = "- ";
    const bulletWidth = font.widthOfTextAtSize(bullet, sizes.body);
    const wrapped = wrapText(
      text,
      contentWidth - 14 - bulletWidth,
      (value) => font.widthOfTextAtSize(value, sizes.body)
    );
    if (wrapped.length === 0) return;

    drawLines([`${bullet}${wrapped[0]}`], { size: sizes.body, indent: 14 });
    if (wrapped.length > 1) {
      drawLines(wrapped.slice(1), {
        size: sizes.body,
        indent: 14 + bulletWidth,
      });
    }
    if (gapAfter) y -= gapAfter;
  };

  const drawSection = (label: string) => {
    ensureSpace(margin + 36);
    y -= 6;
    const sectionWidth = boldFont.widthOfTextAtSize(label, sizes.section);
    const sectionX = margin + (contentWidth - sectionWidth) / 2;
    page.drawText(label, {
      x: sectionX,
      y,
      size: sizes.section,
      font: boldFont,
      color: colors.heading,
    });
    y -= 14;
  };

  const summary = normalizeText(portableTextToPlainText(AUTHOR.summary ?? []));
  const location = AUTHOR.location || "India";
  const email = AUTHOR.social?.email || "";
  const linkedin = AUTHOR.social?.linkedin || "";
  const github = AUTHOR.social?.github || "";

  page.drawText(AUTHOR.name || "Md Motahar", {
    x: margin,
    y,
    size: sizes.name,
    font: boldFont,
    color: colors.heading,
  });
  y -= 28;

  drawParagraph("Full Stack Developer", {
    size: sizes.title,
    color: "muted",
    gapAfter: 2,
  });
  drawParagraph(`${location} | ${email}`, { size: sizes.meta, color: "muted" });
  if (linkedin) {
    drawLink(`LinkedIn: ${linkedin}`, linkedin, { size: sizes.meta });
  }
  if (github) {
    drawLink(`GitHub: ${github}`, github, { size: sizes.meta, gapAfter: 4 });
  }
  drawDivider();

  drawSection("PROFESSIONAL SUMMARY");
  drawParagraph(summary, { gapAfter: 4 });
  drawDivider();

  drawSection("SKILLS");
  const skillBlocks = parseSkills(AUTHOR.skills ?? []);
  for (const block of skillBlocks) {
    drawParagraph(block.title.toUpperCase(), { bold: true, gapAfter: 0 });
    for (const detail of block.details) {
      drawParagraph(`${detail.label}: ${detail.value}`, {
        size: sizes.meta,
        color: "text",
        indent: 14,
        gapAfter: 0,
      });
    }
    y -= 2;
  }
  y -= 3;
  drawDivider();

  drawSection("WORK EXPERIENCE");
  for (const role of WORK_EXPERIENCE) {
    drawParagraph(`${role.title} | ${role.company}`, { bold: true });
    drawParagraph(
      `${role.location ?? "Remote"} | ${role.startDate} - ${role.endDate ?? "Present"}`,
      { size: sizes.meta, color: "muted", gapAfter: 2 }
    );

    const roleLines = normalizeText(portableTextToPlainText(role.description ?? []))
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    for (const line of roleLines) {
      if (line.toLowerCase().endsWith("included:")) {
        drawParagraph(line, { gapAfter: 1 });
        continue;
      }
      drawBulletItem(line.replace(/^-+\s*/, ""), 1);
    }
    y -= 2;
  }
  drawDivider();

  drawSection("PROJECTS");
  for (const project of PROJECTS) {
    const projectIndent = 14 + font.widthOfTextAtSize("- ", sizes.body);
    drawParagraph(project.title, { bold: true });
    const projectBlocks = (project.description ?? []).filter(
      (block: any) => block?._type === "block"
    );

    for (const block of projectBlocks) {
      const text = normalizeText(
        (block?.children ?? []).map((child: any) => child?.text ?? "").join("")
      );
      if (!text) continue;

      if (block?.listItem === "bullet") {
        drawBulletItem(text, 1);
      } else {
        drawParagraph(text, { gapAfter: 1 });
      }
    }

    if (project.technologies?.length) {
      drawParagraph(`Tech Stack: ${project.technologies.join(", ")}`, {
        size: sizes.meta,
        color: "muted",
        indent: projectIndent,
      });
    }

    const githubUrl = project.links?.find((item) => item.type === "code")?.url;
    const demoUrl = project.links?.find((item) => item.type === "demo")?.url;
    if (githubUrl && githubUrl !== "#") {
      drawLink(`GitHub: ${githubUrl}`, githubUrl, {
        size: sizes.meta,
        indent: projectIndent,
      });
    }
    if (demoUrl && demoUrl !== "#") {
      drawLink(`Live Demo: ${demoUrl}`, demoUrl, {
        size: sizes.meta,
        indent: projectIndent,
      });
    }
    y -= 2;
  }
  drawDivider();

  if (EDUCATION.length > 0) {
    drawSection("EDUCATION");
    for (const edu of EDUCATION) {
      drawParagraph(`${edu.degree}`, { bold: true });
      drawParagraph(`${edu.school}`, { gapAfter: 0 });
      drawParagraph(`${edu.startDate} - ${edu.endDate}`, {
        size: sizes.meta,
        color: "muted",
        gapAfter: 2,
      });
    }
  }

  const bytes = await pdfDoc.save();
  const body = Uint8Array.from(bytes);

  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="Md-Motahar-Resume-ATS.pdf"',
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
