// utils/contentRenderer.ts
export const renderContentWithLinks = (
  content: string,
  onLinkClick: (linkText: string) => void
): React.ReactNode[] => {
  const linkPattern = /\[\[([^\]]+)\]\]/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }
    
    const linkText = match[1];
    parts.push(
      <button 
        key={match.index}
        className="text-blue-600 hover:text-blue-800 cursor-pointer bg-blue-50 px-1 rounded transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onLinkClick(linkText);
        }}
      >
        {linkText}
      </button>
    );
    
    lastIndex = match.index + match[0].length;
  }
  
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }
  
  return parts;
};