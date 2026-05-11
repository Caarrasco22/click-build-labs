'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

function parseMarkdown(text: string): string {
  let html = text;

  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/`(.+?)`/g, '<code>$1</code>');

  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

  html = html.replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>');
  html = html.replace(/^[-*] (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ol>$1</ol>');

  html = html.replace(/\n\n/g, '</p><p>');
  html = '<p>' + html + '</p>';
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>(<[hoOl][^>]*>)/g, '$1');
  html = html.replace(/(<\/h[123]>)<\/p>/g, '$1');
  html = html.replace(/(<\/li>)<\/p>/g, '$1');

  return html;
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
