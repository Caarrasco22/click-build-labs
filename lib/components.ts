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
} as const;

export type ToolSlug = keyof typeof TOOL_COMPONENTS;

export function hasToolComponent(slug: string): slug is ToolSlug {
  return slug in TOOL_COMPONENTS;
}
