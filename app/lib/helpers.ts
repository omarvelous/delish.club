export function dasherize(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Convert camelCase to dash-case
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with dashes
    .toLowerCase(); // Convert to lowercase
}
