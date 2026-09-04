import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { tenant } from "@/config/tenant";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";
import { SectionIntro } from "@/components/SectionIntro";
import { Border } from "@/components/Border";
import { ContactBlock } from "@/components/ContactBlock";
import { RealEstateAgentSchema } from "@/components/schema/RealEstateAgentSchema";
import { ProfilePageSchema } from "@/components/schema/ProfilePageSchema";
import { BreadcrumbListSchema } from "@/components/schema/BreadcrumbListSchema";
import { FAQSchema } from "@/components/schema/FAQSchema";
import { StatCardRow } from "@/components/sections/StatCardRow";

/*
 * FULL REWRITE (2026-09-04), from Becca's interview.
 *
 * This page used to be four value cards and three paragraphs pulled from
 * tenant.agent.storyLong, which meant the About page and the homepage said the
 * same thing twice. It now tells the long version in its own words and the
 * homepage keeps the short one, so the two do not compete.
 *
 * The order is deliberate: where she is from, how she got here, how she works,
 * who else you will hear from, and what home looks like. Geography first
 * because it is the thing that makes her specific, and because a reader who
 * recognises Eatonville or Westgate or Tehaleh has already decided something
 * about her before they reach the credentials.
 *
 * Copy rules for this tenant: first person, no em dashes, no X-not-Y framing,
 * no invented systems, no pills, no naming lenders. Voice Level 2.
 *
 * The Alzheimer's paragraph is deliberately short and says so. Becca is going
 * to write that story herself; this holds the place and points at it without
 * putting words in her mouth.
 */

export const metadata: Metadata = {
  title: "About Becca Pitts",
  description:
    "Becca Pitts grew up in Eatonville, went to Western Washington University, and has been a licensed Washington real estate broker since 2008. 270 closings, SRES® certified, eXp Icon Agent, working Pierce, King, and the surrounding counties from Bonney Lake.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Becca Pitts",
    description:
      "One blinking light in Eatonville, a business degree from Western, a license earned at the bottom of the 2008 market, and 270 closings since. Here is the whole story.",
    url: "/about",
    type: "profile",
  },
};

/*
 * How she actually works, in her words from the interview. Every one of these
 * is something she does, not a system built for her: the conversation, the
 * questionnaire with the snack question on it, raising the hard thing in week
 * one, the backup plans, the calls from other agents, and the closing gift.
 *
 * Titles are held short so the two-column grid does not run a card to three
 * lines while its neighbour sits at one.
 */
const HOW_I_WORK = [
  {
    title: "It's a conversation, not a script.",
    body: "I don't have a presentation I run at people. The first time we sit down, I want to hear what you're actually trying to do and why now, and I want you asking me anything, including the questions you're worried sound dumb. Those are usually the good ones. By the end of it we'll both know whether I'm the right person for this, and I'll tell you honestly if I'm not.",
  },
  {
    title: "The questionnaire asks about snacks.",
    body: "Before we get going I send you a questionnaire. Some of it is what you'd expect: timeline, budget, what you can't live without, what you won't put up with. Some of it asks what you like to snack on and what you drink when there's something worth toasting. I'm going to be in your life for a few months, occasionally on a hard day, and I'd like to show up with the right coffee.",
  },
  {
    title: "I bring up the hard thing first.",
    body: "The uncomfortable conversation is so much easier in week one than in week six. If the price isn't where you want it to be, if the roof is going to come up on inspection, if the timeline in your head doesn't match the one the calendar is offering, I'm going to say it at the start, while there's still room to do something about it.",
  },
  {
    title: "Plan A, Plan B, and usually Plan C.",
    body: "270 closings teach you exactly where deals break. So before we start, I've already thought through what we do if the appraisal comes in low, if financing wobbles, if the other side goes quiet for a week. You don't have to carry all three plans around in your head. You just need to know somebody has them.",
  },
  {
    title: "Other agents call me.",
    body: "Agents on the other side of a deal, agents I've never met, agents who hit something they haven't seen before. My phone rings and I pick it up. Partly because it's how I'd want to be treated, and partly because the agent I help this week is the agent reading your offer next spring, and they'll remember.",
  },
  {
    title: "Tequila and Sour Patch Kids.",
    body: "That's the closing gift. A bottle of tequila and a bag of Sour Patch Kids, because that's the transaction: sour, then sweet, and worth it at the end. And the relationship keeps going after that. I've helped clients load furniture, chase down things left in a garage, and sort out storage weeks after closing.",
  },
];

/*
 * AEO. These are the questions people ask out loud about an agent before they
 * call one, answered in the first sentence and expanded in the second, which is
 * the shape an answer engine can lift cleanly. Rendered on the page and emitted
 * as FAQPage structured data from the same array, so the two cannot drift.
 */
const FAQS = [
  {
    question: "Where does Becca Pitts work?",
    answer:
      "I work across Pierce County and South King County most of the time, and I go wherever the right house is. I've closed deals from Everett to Morton and from Grays Harbor to Roslyn. I live in Bonney Lake, I grew up in Eatonville, and I've lived in Pierce, King, and Whatcom counties, so a lot of this region I know from the inside rather than from a map.",
  },
  {
    question: "How long has Becca Pitts been a real estate agent?",
    answer:
      "I've been a licensed real estate broker in Washington since 2008 and I've closed more than 270 transactions. Before real estate I spent eight years in event production doing sales, project management, and creative work. I'm currently with eXp Realty and I was named an eXp Icon Agent in 2022.",
  },
  {
    question: "What does SRES® certification mean?",
    answer:
      "SRES® stands for Seniors Real Estate Specialist, a designation from the National Association of REALTORS® that takes additional training in reverse mortgages, aging in place, care placement timelines, and the tax side of selling a home someone has lived in for decades. It matters most when a move involves a parent and the whole family is in the decision. It's the work I care about most, for reasons that come out of my own family.",
  },
  {
    question: "What is the first meeting with Becca like?",
    answer:
      "It's a conversation, not a script. I ask what you're trying to do and why now, you ask me anything you want, and we figure out together whether I'm the right fit. Then I send you a questionnaire that covers timeline and budget and also asks what snacks you like. Nobody signs anything at a first meeting.",
  },
  {
    question: "Who is Allbree Warner?",
    answer:
      "Allbree is my right-hand person, and when you hear from Allbree you're hearing from me. She knows where your file stands and has the same answers I do. Most clients hear from both of us, and she's very often the reason a deadline gets caught early.",
  },
  {
    question: "Does Becca Pitts only work with seniors?",
    answer:
      "No. Senior transitions are the work I specialize in, and they're one part of a normal week. First-time buyers, move-up buyers, sellers, investors, people relocating to Washington, people buying raw land to build on: the questions change, the way I work them stays the same.",
  },
];

export default function AboutPage() {
  const allbree = tenant.team[0];

  return (
    <>
      <RealEstateAgentSchema />
      <ProfilePageSchema />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "/" },
          { name: "About Becca Pitts", url: "/about" },
        ]}
      />
      <FAQSchema items={FAQS} />

      <section className="bg-[var(--color-surface)]">
        <Container className="pt-16 pb-12 lg:pt-24 lg:pb-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <FadeIn className="lg:col-span-7">
              <p className="eyebrow">About</p>
              {/* The blinking light is the hook and it is literally true, which
                  is why it leads. Everything else on this page is downstream of
                  growing up somewhere that small. */}
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                I grew up in a town with one blinking light.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-neutral-600 md:text-xl">
                {tenant.agent.bio}
              </p>
            </FadeIn>
            <FadeIn scaleIn className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-white shadow-xl">
                <Image
                  src={tenant.agent.headshot}
                  alt={`${tenant.agent.name} portrait`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <StatCardRow
        stats={tenant.stats}
        eyebrow="Credentials"
        heading="Becca Pitts: 270 closings across Western Washington"
      />

      {/* Geography. The longest section on the page on purpose: it is the part
          that makes her a specific person from a specific place rather than an
          agent with a headshot, and it is the part search engines and answer
          engines have nothing else to work with on. */}
      <section className="bg-white py-20 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-3xl">
            <p className="eyebrow">Where I&apos;m from</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
              Eatonville, Washington. You&apos;d miss it if you blinked at the
              blinking light.
            </h2>
            <div className="mt-8 space-y-5 text-lg text-neutral-700">
              <p>
                Eatonville sits at the foot of Mount Rainier and it was founded
                by the Van Eaton family, which I mean literally and not as a
                piece of local trivia. Dr. Tom Van Eaton delivered me. My best
                friend growing up was Gloria Van Eaton, and she is now Dr.
                Gloria Low, the doctor in that same town.
              </p>
              <p>
                So that&apos;s the kind of place it is. The people you grow up
                with are the people who take care of you later, and everybody
                knows exactly how you treated the last person you dealt with.
                Honestly, I think that&apos;s most of what I carried into this
                business. Your name is the whole thing, and it follows you
                around a county the same way it follows you around a town.
              </p>
              <p>
                From there I went north to Bellingham and got a BA in Business
                Administration from Western Washington University. Then
                Puyallup. Then Tacoma, over in Westgate, for about ten years. A
                short stretch in Renton after that. And since 2017, Bonney Lake,
                where I&apos;m on my second house. I bought this one on purpose
                because it has an ADU, and my mom lives in it.
              </p>
              <p>
                Which means when I say I know Pierce County, I mean I&apos;ve
                paid property taxes in it. I&apos;ve lived in King County and in
                Whatcom County too. And I&apos;ve written deals from Everett to
                Morton and from Grays Harbor to Roslyn, because I have never had
                a house simply come to me. I go where the right one is.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Career. The 2008 story is the credibility argument on this whole site:
          she did not learn the business in an easy market. */}
      <section className="surface-warm py-20 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-3xl">
            <p className="eyebrow">How I got here</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
              I got my license in 2008. Everyone told me that was insane.
            </h2>
            <div className="mt-8 space-y-5 text-lg text-neutral-700">
              <p>
                Before real estate I spent eight years in event production,
                doing sales, project management, and the creative side of it. If
                you have ever been in a room full of people having a great time
                and never once thought about how the room got that way, that was
                the job. Budgets, vendors, drawings, deadlines, and about forty
                things that all had to land on the same day or everybody could
                see it.
              </p>
              <p>
                Then the Great Recession showed up and I got laid off. So I got
                my real estate license in 2008, at the absolute bottom of the
                market. On paper it was a terrible idea.
              </p>
              <p>
                It turned out to be the best training I could have gotten. My
                first years were short sales, foreclosures, and REOs, which is
                to say the files nobody wanted. The seller is a bank, the
                paperwork is punishing, the timelines belong to somebody in
                another state, and nothing closes unless a human being keeps
                pushing on it every single day. I learned this business on the
                hardest version of it. A normal transaction has never rattled me
                since, and when a file gets complicated is usually the point
                where I get useful.
              </p>
              <p>
                Steve Hiatt at Keller Williams gave me my start and my first
                real footing in the business. From there I went to Best Choice,
                and for the last six years I&apos;ve been at eXp Realty, where I
                was named an Icon Agent in 2022. Two hundred seventy closings
                later, I&apos;m still doing the same thing I was doing on the
                distressed files: answering my own phone and telling people the
                truth about what&apos;s actually in front of them.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-24">
        <Container>
          <SectionIntro
            eyebrow="How I work"
            title="Six things you can count on from me."
          />
          <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2">
            {HOW_I_WORK.map((v) => (
              <FadeIn key={v.title}>
                <div className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-7 shadow-sm">
                  <h3 className="font-display text-xl font-semibold text-balance">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-neutral-600">
                    {v.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      {/* Allbree. Portrait frame on the left, her introduction on the right.
          While tenant.team[0].photo is empty this renders a labelled frame
          instead of pointing next/image at a file that is not there yet. Drop
          the headshot into public/photos/headshots and fill in `photo` in
          src/config/tenant.ts and the photo appears with no other change. */}
      {allbree && (
        <section className="surface-warm py-20 md:py-24">
          <Container>
            <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-12 md:gap-14">
              <FadeIn scaleIn className="md:col-span-5">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-3xl bg-white shadow-xl md:max-w-none">
                  {allbree.photo ? (
                    <Image
                      src={allbree.photo}
                      alt={`${allbree.name}, ${allbree.role}`}
                      fill
                      sizes="(min-width: 768px) 33vw, 80vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 border border-dashed border-black/15 bg-[var(--color-fog)] p-6 text-center">
                      <span
                        aria-hidden="true"
                        className="font-display text-4xl font-semibold text-[var(--color-moss)]"
                      >
                        AW
                      </span>
                      <span className="text-sm text-neutral-500">
                        Photo of {allbree.name} coming soon
                      </span>
                    </div>
                  )}
                </div>
              </FadeIn>
              <FadeIn className="md:col-span-7">
                <p className="eyebrow">Who else you&apos;ll hear from</p>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
                  {allbree.name}
                </h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                  {allbree.role}
                </p>
                <p className="mt-5 text-lg leading-relaxed text-neutral-700">
                  {allbree.bio}
                </p>
              </FadeIn>
            </div>
          </Container>
        </section>
      )}

      {/* Home, and where the SRES work comes from. The Alzheimer's paragraph is
          intentionally brief and says outright that the full story is coming.
          Do not expand it here; it is Becca's to write. */}
      <section className="bg-white py-20 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-3xl">
            <p className="eyebrow">At home</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
              Ryan, my mom, and the reason I got certified.
            </h2>
            <div className="mt-8 space-y-5 text-lg text-neutral-700">
              <p>
                My husband Ryan is a full-stack developer and runs Selden
                Furnishings, so dinner around here swings between contract
                addenda and database migrations, and somehow we both find that
                relaxing.
              </p>
              <p>
                My mom lives in the ADU. We bought this house specifically
                because it had one, which is its own quiet lesson about this
                job: the house you need at fifty is often not the house you were
                shopping for at forty, and a lot of families figure that out
                under a deadline.
              </p>
              <p>
                The SRES® certification came out of something harder than that.
                My dad had Alzheimer&apos;s, and I learned from the inside what
                that does to a family. The decisions nobody is ready for, the
                timeline nobody chose, and a house sitting in the middle of all
                of it. That story is mine to tell properly and I&apos;m going to
                write it out here soon.
              </p>
              <p>
                What I&apos;ll say for now is that it changed what I&apos;m good
                for. SRES® certification is real training in reverse mortgages,
                aging in place, care placement, and the tax side of selling a
                home somebody has lived in for forty years. When a family calls
                me about a parent, I already know the shape of the week
                they&apos;re having. It&apos;s the work I care about most, and
                it is one part of a normal week alongside first-time buyers,
                move-up buyers, sellers, and people moving here from somewhere
                else entirely.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="surface-warm py-20 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-3xl">
            <SectionIntro
              eyebrow={tenant.podcast.name}
              title="Education first, always."
            >
              <p>{tenant.podcast.description}</p>
            </SectionIntro>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/podcast" className="btn-primary">
                Listen to the podcast
              </Link>
              <a
                href={tenant.videos.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                YouTube channel
              </a>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* The questions people ask before they call anybody. Plain headings and
          paragraphs rather than an accordion, so the answers are on the page
          for a reader and for anything crawling it. */}
      <section className="bg-white py-20 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-3xl">
            <p className="eyebrow">Common questions</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
              What people ask before they call me.
            </h2>
            <dl className="mt-10 space-y-8">
              {FAQS.map((faq) => (
                <div key={faq.question} className="border-t border-black/10 pt-6">
                  <dt className="font-display text-xl font-semibold text-neutral-950">
                    {faq.question}
                  </dt>
                  <dd className="mt-3 text-base leading-relaxed text-neutral-700 md:text-lg">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-[var(--color-fog)] py-16 md:py-20">
        <Container>
          <FadeIn className="mx-auto max-w-3xl">
            <p className="eyebrow">Part of the family</p>
            <h2 className="mt-3 font-display text-2xl font-semibold md:text-3xl">
              {tenant.sibling.name}
            </h2>
            <p className="mt-4 text-base text-neutral-600">
              {tenant.sibling.description} When a family I am working with needs
              care placement as part of the move, this is the sister business I
              point them to.
            </p>
            <a
              href={tenant.sibling.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-medium text-[var(--color-moss)] hover:underline"
            >
              Visit {tenant.sibling.name}
            </a>
          </FadeIn>
        </Container>
      </section>

      <section className="surface-warm py-12">
        <Container>
          <FadeIn>
            <Border className="pt-8">
              <div className="mx-auto max-w-3xl text-sm text-neutral-600">
                <p className="font-semibold text-neutral-950">
                  Brokerage disclosure
                </p>
                <p className="mt-3">{tenant.agent.brokerageDisclosure}</p>
                <p className="mt-2">
                  The brokerage relationship is {tenant.agent.brokerage}, license{" "}
                  {tenant.agent.license}.
                </p>
              </div>
            </Border>
          </FadeIn>
        </Container>
      </section>

      <ContactBlock heading="Let's have a conversation.">
        <p>
          No presentation, no pressure, and nothing to sign. Tell me what
          you&apos;re trying to do and when, and I&apos;ll tell you what that
          actually takes. If somebody else is the better fit, I&apos;ll say so
          and point you to them.
        </p>
      </ContactBlock>
    </>
  );
}
