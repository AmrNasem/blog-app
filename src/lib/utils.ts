export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function normalizeBy1000(num: number): string | number {
  if (!Math.floor(num % 1000000000)) return `${Math.floor(num / 1000000000)}B`;
  if (!Math.floor(num % 1000000)) return `${Math.floor(num / 1000000)}M`;
  if (!Math.floor(num % 1000)) return `${Math.floor(num / 1000)}K`;
  return num;
}
