export default function formatTMDBDate(dateStr) {
  if (!dateStr) return "TBD";

  let year, month, day;

  if (dateStr.includes("-")) {
    [year, month, day] = dateStr.split("-");
  } else if (dateStr.length === 8) {
    year = dateStr.slice(0, 4);
    month = dateStr.slice(4, 6);
    day = dateStr.slice(6, 8);
  } else {
    return dateStr; // fallback
  }

  const dateObj = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(dateObj);
}
