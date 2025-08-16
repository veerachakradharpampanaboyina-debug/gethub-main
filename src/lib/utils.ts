import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function markdownToHtml(markdown: string): string {
  // Basic markdown to HTML conversion
  let html = markdown
    // Headings (e.g., #, ##, ###, ####)
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    // Italics
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    // Horizontal Rule
    .replace(/^\s*(\*|-|_){3,}\s*$/gim, '<hr>')
    // Unordered lists
    .replace(/^\s*[-*] (.*)/gim, '<ul>\n<li>$1</li>\n</ul>')
    .replace(/<\/ul>\n<ul>/g, '')
     // Ordered lists
    .replace(/^\s*\d+\. (.*)/gim, '<ol>\n<li>$1</li>\n</ol>')
    .replace(/<\/ol>\n<ol>/g, '')
    // Newlines to <br>
    .replace(/\n/g, '<br />');

  return html;
}
