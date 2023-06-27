export function convertToReadableDate(createdAt: any) {
  const date = new Date(createdAt);
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleString("en-US", options);
}
