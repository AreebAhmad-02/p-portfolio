import raw from "@/data/portfolio.json";
import type { Portfolio } from "@/types/portfolio";

/**
 * Single source of truth for all site content.
 * Swap `src/data/portfolio.json` to rebrand the entire site for someone else.
 */
// `raw` is cast through `unknown`: TS widens JSON array literals (e.g. each
// project `palette`) to `string[]`, which doesn't structurally match the
// tuple/union types in `Portfolio`. The JSON is the source of truth, so we
// assert the richer type here and let consumers rely on it.
export const portfolio = raw as unknown as Portfolio;
