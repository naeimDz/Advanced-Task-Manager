// utils/extractLinks.ts
export const extractLinks = (text: string): string[] => {
  const linkPattern = /\[\[([^\]]+)\]\]/g;
  const links: string[] = [];
  let match;

  while ((match = linkPattern.exec(text)) !== null) {
    links.push(match[1]);
  }

  return links;
};
