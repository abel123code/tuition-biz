import GradualSpacing from "@/components/magicui/gradual-spacing";

export function GradualSpacingDemo({ text }) {
  return (
    <GradualSpacing
      className="font-display text-left text-lg sm:text-xl font-bold tracking-[-0.05em] text-black dark:text-white leading-snug sm:leading-tight md:text-2xl md:leading-[2rem] lg:text-3xl lg:leading-[2.5rem] break-words"
      text={text}
    />
  );
}
