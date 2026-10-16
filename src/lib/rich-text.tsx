export interface RichSegment {
  text: string;
  accent: boolean;
}

/**
 * Tiny markup for JSON copy: words wrapped in *asterisks* render as
 * italic accent text, e.g. "I build products that feel *effortless*."
 */
export function parseRich(text: string): RichSegment[] {
  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("*") && part.endsWith("*")
        ? { text: part.slice(1, -1), accent: true }
        : { text: part, accent: false },
    );
}

export interface RichWord {
  word: string;
  accent: boolean;
}

/** Flattens rich segments into individual words, preserving accent flags. */
export function richWords(text: string): RichWord[] {
  const words: RichWord[] = [];
  for (const segment of parseRich(text)) {
    for (const word of segment.text.split(/\s+/).filter(Boolean)) {
      words.push({ word, accent: segment.accent });
    }
  }
  return words;
}
