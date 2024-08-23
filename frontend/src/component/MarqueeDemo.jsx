import React from 'react';
import Marquee from '@/components/magicui/marquee';
import { cn } from '@/lib/utils';

const reviews = [
  {
    name: "Jack",
    body: "The content notes and flashcards are incredibly detailed and well-structured. They have significantly improved my study efficiency.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    body: "I love how the flashcards are organized into different levels. It helps me build my knowledge step by step.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    body: "These study materials are a game-changer. The slides are easy to follow, and the flashcards make retention so much easier.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    body: "The depth of information in the content notes is impressive. They provide a solid foundation for exam preparation.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    body: "I’ve seen a noticeable improvement in my grades since using these digital flashcards. Highly recommend them!",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    body: "These resources are exactly what I needed. The combination of slides and flashcards makes studying both effective and enjoyable.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, body }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-l">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
