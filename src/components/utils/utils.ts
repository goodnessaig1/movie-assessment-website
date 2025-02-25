import { DateTime } from "luxon";

export const STALE_TIME = 1 * 24 * 60 * 60 * 1000; // 1 day
export const CACHE_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days

export const formatDate = (dateString: string) => {
  const now = DateTime.utc();
  const date = DateTime.fromISO(dateString, { zone: "utc" });
  const diff = now
    .diff(date, [
      "years",
      "months",
      "weeks",
      "days",
      "hours",
      "minutes",
      "seconds",
    ])
    .toObject();

  if (diff.years && diff.years >= 1)
    return `${Math.floor(diff.years)} year${diff.years > 1 ? "s" : ""} ago`;
  if (diff.months && diff.months >= 1)
    return `${Math.floor(diff.months)} month${diff.months > 1 ? "s" : ""} ago`;
  if (diff.weeks && diff.weeks >= 1)
    return `${Math.floor(diff.weeks)} week${diff.weeks > 1 ? "s" : ""} ago`;
  if (diff.days && diff.days >= 1)
    return `${Math.floor(diff.days)} day${diff.days > 1 ? "s" : ""} ago`;
  if (diff.hours && diff.hours >= 1)
    return `${Math.floor(diff.hours)} hour${diff.hours > 1 ? "s" : ""} ago`;
  if (diff.minutes && diff.minutes >= 1)
    return `${Math.floor(diff.minutes)} min${diff.minutes > 1 ? "s" : ""} ago`;
  return `${Math.floor(diff.seconds ?? 0)} sec ago`;
};
