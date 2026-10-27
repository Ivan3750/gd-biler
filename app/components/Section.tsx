import { container } from "./ui";

const tones = {
  white: "bg-background text-foreground",
  gray: "bg-secondary text-foreground",
  navy: "bg-navy text-navy-foreground",
};

export function Section({
  tone = "white",
  id,
  className = "",
  children,
}: {
  tone?: keyof typeof tones;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`${tones[tone]} py-16 lg:py-20 ${className}`}>
      <div className={container}>{children}</div>
    </section>
  );
}

export function SectionHeading({
  title,
  lead,
  tone = "white",
  as: Tag = "h2",
  className = "mb-10",
}: {
  title: string;
  lead?: string;
  tone?: keyof typeof tones;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <div className="mb-4 h-0.5 w-10 bg-brand" aria-hidden />
      <Tag className="text-balance text-2xl font-bold sm:text-3xl">{title}</Tag>
      {lead && (
        <p className={`mt-4 text-lg leading-relaxed ${tone === "navy" ? "text-white/75" : "text-muted-foreground"}`}>{lead}</p>
      )}
    </div>
  );
}

/** Title block at the top of inner pages. */
export function PageHeader({ title, lead, children }: { title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <div className="border-b border-border bg-secondary py-12 lg:py-14">
      <div className={container}>
        {children}
        <div className="mb-4 h-0.5 w-10 bg-brand" aria-hidden />
        <h1 className="text-balance text-3xl font-bold sm:text-4xl">{title}</h1>
        {lead && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{lead}</p>}
      </div>
    </div>
  );
}
