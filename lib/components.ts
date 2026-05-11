import { lazy } from 'react';

export const TOOL_COMPONENTS = {
  'uuid-generator': lazy(() => import('@/components/tools/UuidGenerator').then((m) => ({ default: m.UuidGenerator }))),
  'base64-encode': lazy(() => import('@/components/tools/Base64Encoder').then((m) => ({ default: m.Base64Encoder }))),
  'password-generator': lazy(() => import('@/components/tools/PasswordGenerator').then((m) => ({ default: m.PasswordGenerator }))),
  'json-formatter': lazy(() => import('@/components/tools/JsonFormatter').then((m) => ({ default: m.JsonFormatter }))),
  'slug-generator': lazy(() => import('@/components/tools/SlugGenerator').then((m) => ({ default: m.SlugGenerator }))),
  'hash-generator': lazy(() => import('@/components/tools/HashGenerator').then((m) => ({ default: m.HashGenerator }))),
  'color-converter': lazy(() => import('@/components/tools/ColorConverter').then((m) => ({ default: m.ColorConverter }))),
  'lorem-ipsum': lazy(() => import('@/components/tools/LoremIpsumGenerator').then((m) => ({ default: m.LoremIpsumGenerator }))),
  'word-counter': lazy(() => import('@/components/tools/WordCounter').then((m) => ({ default: m.WordCounter }))),
  'character-counter': lazy(() => import('@/components/tools/CharacterCounter').then((m) => ({ default: m.CharacterCounter }))),
  'case-converter': lazy(() => import('@/components/tools/CaseConverter').then((m) => ({ default: m.CaseConverter }))),
  'url-encoder-decoder': lazy(() => import('@/components/tools/UrlEncoderDecoder').then((m) => ({ default: m.UrlEncoderDecoder }))),
  'html-entity-encoder-decoder': lazy(() => import('@/components/tools/HtmlEntityEncoderDecoder').then((m) => ({ default: m.HtmlEntityEncoderDecoder }))),
  'timestamp-converter': lazy(() => import('@/components/tools/TimestampConverter').then((m) => ({ default: m.TimestampConverter }))),
  'percentage-calculator': lazy(() => import('@/components/tools/PercentageCalculator').then((m) => ({ default: m.PercentageCalculator }))),
  'text-diff-checker': lazy(() => import('@/components/tools/TextDiffChecker').then((m) => ({ default: m.TextDiffChecker }))),
  'markdown-previewer': lazy(() => import('@/components/tools/MarkdownPreviewer').then((m) => ({ default: m.MarkdownPreviewer }))),
  'json-to-csv': lazy(() => import('@/components/tools/JsonToCsvConverter').then((m) => ({ default: m.JsonToCsvConverter }))),
} as const;

export type ToolSlug = keyof typeof TOOL_COMPONENTS;

export function hasToolComponent(slug: string): slug is ToolSlug {
  return slug in TOOL_COMPONENTS;
}
