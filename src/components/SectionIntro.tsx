import { cn } from "@/lib/cn";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";

type Props = {
  title: string;
  eyebrow?: string;
  children?: React.ReactNode;
  smaller?: boolean;
  invert?: boolean;
  className?: string;
  aside?: React.ReactNode;
};

export function SectionIntro({
  title,
  eyebrow,
  children,
  smaller = false,
  invert = false,
  className,
  aside,
}: Props) {
  const copy = (
    <FadeIn className="max-w-2xl">
      <h2>
        {eyebrow && (
          <>
            {/* The site's one eyebrow style, so a section intro and a
                hand-built section never disagree about what an eyebrow is.
                Geist, never Playfair: it is 14px. */}
            <span
              className={cn(
                "eyebrow mb-4 block",
                invert && "text-white/80",
              )}
            >
              {eyebrow}
            </span>
            <span className="sr-only"> - </span>
          </>
        )}
        <span
          className={cn(
            // The same h2 sizes every hand-built section uses: 35px on a
            // phone, 44px from md. 55px was a page-title size doing a section
            // heading's job.
            "block font-display text-balance",
            smaller ? "text-2xl" : "text-3xl md:text-4xl",
            invert ? "text-white" : "text-ink",
          )}
        >
          {title}
        </span>
      </h2>
      {children && (
        <div
          className={cn(
            "measure mt-6 text-lg",
            invert ? "text-white/80" : "text-muted",
          )}
        >
          {children}
        </div>
      )}
    </FadeIn>
  );

  return (
    <Container className={className}>
      {aside ? (
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {copy}
          <div className="w-full lg:justify-self-end">{aside}</div>
        </div>
      ) : (
        copy
      )}
    </Container>
  );
}
