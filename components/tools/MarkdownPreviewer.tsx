'use client';

import { useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { Copy, Check, RefreshCw } from 'lucide-react';

function parseMarkdown(text: string): string {
  if (!text) return '';
  return DOMPurify.sanitize(marked.parse(text, { async: false }), {
    ALLOWED_TAGS: ['p', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'del', 'blockquote', 'pre', 'code', 'ul', 'ol', 'li', 'a', 'hr', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
    ALLOWED_ATTR: ['href', 'title'],
    ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|#)/i,
    ALLOW_DATA_ATTR: false,
  });
}

export function MarkdownPreviewer() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const preview = parseMarkdown(input);

  const copyHtml = async () => {
    await navigator.clipboard.writeText(preview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-zinc-500">Supports headings, lists, links and fenced code blocks. Embedded images, scripts and other active HTML are removed; external links open only when you select them.</p>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Markdown</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="# Heading&#10;**bold** and *italic*&#10;- list item&#10;[link](https://example.com)..."
            className="w-full h-64 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
          <div className="flex gap-2">
            <button onClick={() => setInput('')} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200">
              <RefreshCw className="h-4 w-4 inline" />
              Clear
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Preview</label>
            {preview && (
              <button onClick={copyHtml} className="px-3 py-1.5 text-sm rounded-md bg-zinc-100 text-zinc-600 hover:bg-zinc-200">
                {copied ? <Check className="h-4 w-4 inline" /> : <Copy className="h-4 w-4 inline" />}
                {copied ? 'Copied!' : 'Copy HTML'}
              </button>
            )}
          </div>
          <div
            className="w-full h-64 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm overflow-auto prose prose-zinc dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        </div>
      </div>
    </div>
  );
}
