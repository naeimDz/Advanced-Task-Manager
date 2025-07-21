import { Timestamp } from "firebase/firestore";

export const formatDate = (date: Date | Timestamp): string => {
  const d = date instanceof Date ? date : date.toDate();
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
};