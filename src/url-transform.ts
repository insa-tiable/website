import { FieldHook } from "payload";



export default function titleToUrl(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
    }


export const formatSlug = (val: string): string =>
  val
    .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
        .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
    .toLowerCase();

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ originalDoc, value }) => {
    return value ? formatSlug(value) : originalDoc.slug
  }