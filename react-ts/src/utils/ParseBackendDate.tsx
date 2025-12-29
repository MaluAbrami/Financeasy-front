export function parseBackendDate(dateTime?: string) {
  if (!dateTime) return null;

  return new Date(
    dateTime.replace(" ", "T").slice(0, 23)
  );
}