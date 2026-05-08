import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  CodeSquare,
  List,
  ListOrdered,
  Link,
  Image,
  Minus,
  Quote,
  Table,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Eye,
  EyeOff,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Save,
  RotateCcw,
} from "lucide-react";

// ── Lightweight Markdown → HTML parser ──────────────────────────────────────

const escapeHtml = (str) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const parseInline = (text) => {
  let html = escapeHtml(text);

  // images: ![alt](url)
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="md-img" />'
  );
  // links: [text](url)
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="md-link">$1</a>'
  );
  // bold + italic: ***text*** or ___text___
  html = html.replace(
    /\*\*\*(.+?)\*\*\*/g,
    "<strong><em>$1</em></strong>"
  );
  html = html.replace(
    /___(.+?)___/g,
    "<strong><em>$1</em></strong>"
  );
  // bold: **text** or __text__
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");
  // italic: *text* or _text_
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(
    /(?<!\w)_(.+?)_(?!\w)/g,
    "<em>$1</em>"
  );
  // strikethrough: ~~text~~
  html = html.replace(/~~(.+?)~~/g, "<del>$1</del>");
  // inline code: `code`
  html = html.replace(/`([^`]+)`/g, '<code class="md-inline-code">$1</code>');

  return html;
};

const parseMarkdownToHtml = (markdown) => {
  if (!markdown) return "";

  const lines = markdown.split("\n");
  let html = "";
  let inCodeBlock = false;
  let codeContent = "";
  let codeLang = "";
  let inTable = false;
  let tableRows = [];
  let inBlockquote = false;
  let blockquoteLines = [];
  let inUl = false;
  let inOl = false;

  const flushBlockquote = () => {
    if (blockquoteLines.length > 0) {
      const inner = blockquoteLines.map((l) => parseInline(l)).join("<br />");
      html += `<blockquote class="md-blockquote">${inner}</blockquote>\n`;
      blockquoteLines = [];
    }
    inBlockquote = false;
  };

  const flushTable = () => {
    if (tableRows.length < 2) {
      tableRows = [];
      inTable = false;
      return;
    }

    const headerCells = tableRows[0];
    const bodyRows = tableRows.slice(2); // skip separator row

    let t = '<div class="md-table-wrap"><table class="md-table"><thead><tr>';
    headerCells.forEach((cell) => {
      t += `<th>${parseInline(cell.trim())}</th>`;
    });
    t += "</tr></thead><tbody>";
    bodyRows.forEach((row) => {
      t += "<tr>";
      row.forEach((cell) => {
        t += `<td>${parseInline(cell.trim())}</td>`;
      });
      t += "</tr>";
    });
    t += "</tbody></table></div>\n";
    html += t;
    tableRows = [];
    inTable = false;
  };

  const flushList = () => {
    if (inUl) {
      html += "</ul>\n";
      inUl = false;
    }
    if (inOl) {
      html += "</ol>\n";
      inOl = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.trimStart().startsWith("```")) {
      if (inCodeBlock) {
        html += `<pre class="md-code-block"><code class="${codeLang ? `language-${codeLang}` : ""}">${escapeHtml(codeContent.replace(/\n$/, ""))}</code></pre>\n`;
        inCodeBlock = false;
        codeContent = "";
        codeLang = "";
      } else {
        flushBlockquote();
        flushList();
        if (inTable) flushTable();
        inCodeBlock = true;
        codeLang = line.trimStart().slice(3).trim();
      }
      continue;
    }
    if (inCodeBlock) {
      codeContent += line + "\n";
      continue;
    }

    // Table rows (| col | col |)
    const tableMatch = line.match(/^\|(.+)\|$/);
    if (tableMatch) {
      flushBlockquote();
      flushList();
      if (!inTable) inTable = true;
      const cells = tableMatch[1].split("|");
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Blockquotes (> text)
    const bqMatch = line.match(/^>\s?(.*)/);
    if (bqMatch) {
      flushList();
      inBlockquote = true;
      blockquoteLines.push(bqMatch[1]);
      continue;
    } else if (inBlockquote) {
      flushBlockquote();
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headingMatch) {
      flushList();
      const level = headingMatch[1].length;
      const text = parseInline(headingMatch[2]);
      html += `<h${level} class="md-h${level}">${text}</h${level}>\n`;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line.trim())) {
      flushList();
      html += '<hr class="md-hr" />\n';
      continue;
    }

    // Unordered list
    const ulMatch = line.match(/^(\s*)[-*+]\s+(.*)/);
    if (ulMatch) {
      if (inOl) {
        html += "</ol>\n";
        inOl = false;
      }
      if (!inUl) {
        html += '<ul class="md-ul">\n';
        inUl = true;
      }
      html += `<li>${parseInline(ulMatch[2])}</li>\n`;
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^(\s*)\d+\.\s+(.*)/);
    if (olMatch) {
      if (inUl) {
        html += "</ul>\n";
        inUl = false;
      }
      if (!inOl) {
        html += '<ol class="md-ol">\n';
        inOl = true;
      }
      html += `<li>${parseInline(olMatch[2])}</li>\n`;
      continue;
    }

    // If we were in a list but this line is not a list item, flush
    if (inUl || inOl) {
      flushList();
    }

    // Empty line = paragraph break
    if (line.trim() === "") {
      html += "\n";
      continue;
    }

    // HTML passthrough (alignment divs, etc.)
    if (/^<\/?div[\s>]|^<\/?p[\s>]/i.test(line.trim())) {
      html += line + "\n";
      continue;
    }

    // Regular paragraph
    html += `<p class="md-p">${parseInline(line)}</p>\n`;
  }

  // Flush remaining open blocks
  if (inCodeBlock) {
    html += `<pre class="md-code-block"><code>${escapeHtml(codeContent)}</code></pre>\n`;
  }
  if (inBlockquote) flushBlockquote();
  if (inTable) flushTable();
  flushList();

  return html;
};

// ── Component ───────────────────────────────────────────────────────────────

const HEADING_OPTIONS = [
  { level: 1, label: "Heading 1", icon: Heading1, size: "text-xl" },
  { level: 2, label: "Heading 2", icon: Heading2, size: "text-lg" },
  { level: 3, label: "Heading 3", icon: Heading3, size: "text-base" },
  { level: 4, label: "Heading 4", icon: Heading4, size: "text-sm" },
  { level: 5, label: "Heading 5", icon: Heading5, size: "text-xs" },
  { level: 6, label: "Heading 6", icon: Heading6, size: "text-xs" },
];

export default function PlacementMarkdownEditor({
  value = "",
  onChange,
  onSave,
  saving = false,
  placeholder = "# Start writing...\n\nUse the toolbar above to format your content.",
}) {
  const [showPreview, setShowPreview] = useState(true);
  const [headingOpen, setHeadingOpen] = useState(false);
  const [alignOpen, setAlignOpen] = useState(false);
  const textareaRef = useRef(null);
  const headingRef = useRef(null);
  const alignRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (headingRef.current && !headingRef.current.contains(e.target)) {
        setHeadingOpen(false);
      }
      if (alignRef.current && !alignRef.current.contains(e.target)) {
        setAlignOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ── Helpers ─────────────────────────────────────────────────────────────

  const getTextarea = () => textareaRef.current;

  const getSelection = () => {
    const ta = getTextarea();
    if (!ta) return { start: 0, end: 0, text: "" };
    return {
      start: ta.selectionStart,
      end: ta.selectionEnd,
      text: value.slice(ta.selectionStart, ta.selectionEnd),
    };
  };

  const replaceRange = (start, end, replacement, cursorOffset) => {
    const before = value.slice(0, start);
    const after = value.slice(end);
    const newText = before + replacement + after;
    onChange(newText);

    // Set cursor after React re-render
    requestAnimationFrame(() => {
      const ta = getTextarea();
      if (!ta) return;
      const pos =
        cursorOffset !== undefined
          ? start + cursorOffset
          : start + replacement.length;
      ta.focus();
      ta.setSelectionRange(pos, pos);
    });
  };

  // ── Insertion functions ─────────────────────────────────────────────────

  const insertWrapped = useCallback(
    (before, after, placeholder_) => {
      const ta = getTextarea();
      if (!ta) return;
      const { start, end, text } = getSelection();

      if (text) {
        // Check if already wrapped — toggle off
        const prevBefore = value.slice(
          Math.max(0, start - before.length),
          start
        );
        const nextAfter = value.slice(end, end + after.length);
        if (prevBefore === before && nextAfter === after) {
          // Remove wrapping
          const newStart = start - before.length;
          const newEnd = end + after.length;
          const inner = value.slice(start, end);
          replaceRange(newStart, newEnd, inner, inner.length);
          return;
        }
        replaceRange(start, end, before + text + after, before.length + text.length);
      } else {
        replaceRange(
          start,
          end,
          before + placeholder_ + after,
          before.length
        );
        // Select the placeholder
        requestAnimationFrame(() => {
          ta.setSelectionRange(
            start + before.length,
            start + before.length + placeholder_.length
          );
        });
      }
    },
    [value, onChange]
  );

  const insertHeading = useCallback(
    (level) => {
      const ta = getTextarea();
      if (!ta) return;
      const { start } = getSelection();

      // Find line start
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const lineEnd = value.indexOf("\n", start);
      const actualEnd = lineEnd === -1 ? value.length : lineEnd;
      const currentLine = value.slice(lineStart, actualEnd);

      const prefix = "#".repeat(level) + " ";

      // Check if line already has this heading — toggle off
      if (currentLine.startsWith(prefix)) {
        replaceRange(lineStart, actualEnd, currentLine.slice(prefix.length));
        return;
      }

      // Remove any existing heading prefix
      const stripped = currentLine.replace(/^#{1,6}\s*/, "");
      const newLine = prefix + (stripped || "Heading text");
      replaceRange(lineStart, actualEnd, newLine, prefix.length);
      if (!stripped) {
        requestAnimationFrame(() => {
          ta.setSelectionRange(
            lineStart + prefix.length,
            lineStart + newLine.length
          );
        });
      }

      setHeadingOpen(false);
    },
    [value, onChange]
  );

  const insertBlockquote = useCallback(() => {
    const ta = getTextarea();
    if (!ta) return;
    const { start, end, text } = getSelection();

    if (text) {
      const quoted = text
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n");
      replaceRange(start, end, quoted, quoted.length);
    } else {
      const template = "> Quote line one\n> Quote line two\n> Quote line three";
      replaceRange(start, end, template, 2);
      requestAnimationFrame(() => {
        ta.setSelectionRange(start + 2, start + 16); // select "Quote line one"
      });
    }
  }, [value, onChange]);

  const insertCodeBlock = useCallback(() => {
    const ta = getTextarea();
    if (!ta) return;
    const { start, end, text } = getSelection();

    if (text) {
      const block = "```\n" + text + "\n```";
      replaceRange(start, end, block, block.length);
    } else {
      const block = "```\ncode here\n```";
      replaceRange(start, end, block, 4);
      requestAnimationFrame(() => {
        ta.setSelectionRange(start + 4, start + 13); // select "code here"
      });
    }
  }, [value, onChange]);

  const insertLink = useCallback(() => {
    const ta = getTextarea();
    if (!ta) return;
    const { start, end, text } = getSelection();

    if (text) {
      const link = `[${text}](url)`;
      replaceRange(start, end, link, text.length + 3);
      requestAnimationFrame(() => {
        ta.setSelectionRange(start + text.length + 3, start + text.length + 6);
      });
    } else {
      const link = "[link text](url)";
      replaceRange(start, end, link, 1);
      requestAnimationFrame(() => {
        ta.setSelectionRange(start + 1, start + 10); // select "link text"
      });
    }
  }, [value, onChange]);

  const insertImage = useCallback(() => {
    const ta = getTextarea();
    if (!ta) return;
    const { start, end, text } = getSelection();

    if (text) {
      const img = `![${text}](image-url)`;
      replaceRange(start, end, img, text.length + 4);
      requestAnimationFrame(() => {
        ta.setSelectionRange(
          start + text.length + 4,
          start + text.length + 13
        );
      });
    } else {
      const img = "![alt text](image-url)";
      replaceRange(start, end, img, 2);
      requestAnimationFrame(() => {
        ta.setSelectionRange(start + 2, start + 10); // select "alt text"
      });
    }
  }, [value, onChange]);

  const insertTable = useCallback(() => {
    const ta = getTextarea();
    if (!ta) return;
    const { start, end } = getSelection();

    const table =
      "\n| Header 1 | Header 2 | Header 3 |\n| -------- | -------- | -------- |\n| Cell 1   | Cell 2   | Cell 3   |\n| Cell 4   | Cell 5   | Cell 6   |\n";
    replaceRange(start, end, table, table.length);
  }, [value, onChange]);

  const insertHorizontalRule = useCallback(() => {
    const ta = getTextarea();
    if (!ta) return;
    const { start, end } = getSelection();
    replaceRange(start, end, "\n---\n", 5);
  }, [value, onChange]);

  const insertList = useCallback(
    (ordered) => {
      const ta = getTextarea();
      if (!ta) return;
      const { start, end, text } = getSelection();

      if (text) {
        const items = text.split("\n").map((line, i) =>
          ordered ? `${i + 1}. ${line}` : `- ${line}`
        );
        const result = items.join("\n");
        replaceRange(start, end, result, result.length);
      } else {
        const template = ordered
          ? "1. Item one\n2. Item two\n3. Item three"
          : "- Item one\n- Item two\n- Item three";
        const prefixLen = ordered ? 3 : 2;
        replaceRange(start, end, template, prefixLen);
        requestAnimationFrame(() => {
          ta.setSelectionRange(start + prefixLen, start + prefixLen + 8);
        });
      }
    },
    [value, onChange]
  );

  const insertAlignment = useCallback(
    (align) => {
      const ta = getTextarea();
      if (!ta) return;
      const { start, end, text } = getSelection();
      const content = text || "Your text here";
      const wrapped = `<div align="${align}">${content}</div>`;
      replaceRange(start, end, wrapped);
      setAlignOpen(false);
    },
    [value, onChange]
  );

  // ── Toolbar button component ────────────────────────────────────────────

  const ToolBtn = ({ icon: Icon, label, onClick, active, className = "" }) => (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`p-2 rounded-lg transition-all duration-150 ${
        active
          ? "bg-orange-600/20 text-orange-400"
          : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/60"
      } ${className}`}
    >
      <Icon size={16} strokeWidth={2} />
    </button>
  );

  const Divider = () => (
    <div className="w-px h-6 bg-gray-700 mx-1 self-center shrink-0" />
  );

  // ── Render ──────────────────────────────────────────────────────────────

  const renderedHtml = parseMarkdownToHtml(value || "");

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-xl border border-gray-700/60 shadow-xl">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 bg-gray-800/90 border-b border-gray-700/60 select-none relative z-10">
        {/* ── Heading dropdown ─────────────────────────── */}
        <div className="relative" ref={headingRef}>
          <button
            type="button"
            onClick={() => setHeadingOpen((o) => !o)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium text-gray-300 hover:text-gray-100 hover:bg-gray-700/60 transition-colors"
          >
            <Heading1 size={16} />
            <span className="hidden sm:inline text-xs">Heading</span>
            <ChevronDown
              size={14}
              className={`transition-transform ${headingOpen ? "rotate-180" : ""}`}
            />
          </button>
          {headingOpen && (
            <div className="absolute top-full left-0 mt-1 z-[100] w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl py-1 animate-in fade-in slide-in-from-top-2">
              {HEADING_OPTIONS.map(({ level, label, icon: HIcon, size }) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => insertHeading(level)}
                  className={`flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-gray-700/60 transition-colors ${size} text-gray-300 hover:text-gray-100`}
                >
                  <HIcon size={18} className="text-gray-500 shrink-0" />
                  <span className="font-semibold">{label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <Divider />

        {/* ── Text formatting ──────────────────────────── */}
        <ToolBtn
          icon={Bold}
          label="Bold (Ctrl+B)"
          onClick={() => insertWrapped("**", "**", "bold text")}
        />
        <ToolBtn
          icon={Italic}
          label="Italic (Ctrl+I)"
          onClick={() => insertWrapped("*", "*", "italic text")}
        />
        <ToolBtn
          icon={Strikethrough}
          label="Strikethrough"
          onClick={() => insertWrapped("~~", "~~", "strikethrough")}
        />
        <ToolBtn
          icon={Code}
          label="Inline Code"
          onClick={() => insertWrapped("`", "`", "code")}
        />

        <Divider />

        {/* ── Alignment dropdown (HTML-based) ──────────── */}
        <div className="relative" ref={alignRef}>
          <button
            type="button"
            onClick={() => setAlignOpen((o) => !o)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-700/60 transition-colors"
            title="Text Alignment (uses HTML)"
          >
            <AlignCenter size={16} />
            <ChevronDown
              size={14}
              className={`transition-transform ${alignOpen ? "rotate-180" : ""}`}
            />
          </button>
          {alignOpen && (
            <div className="absolute top-full left-0 mt-1 z-[100] w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl py-1">
              <div className="px-3 py-2 text-[11px] text-amber-400/80 border-b border-gray-700/60">
                ⚠ Alignment requires HTML — not native Markdown
              </div>
              {[
                { align: "left", icon: AlignLeft, label: "Align Left" },
                { align: "center", icon: AlignCenter, label: "Align Center" },
                { align: "right", icon: AlignRight, label: "Align Right" },
              ].map(({ align, icon: AIcon, label }) => (
                <button
                  key={align}
                  type="button"
                  onClick={() => insertAlignment(align)}
                  className="flex items-center gap-3 w-full px-3 py-2 text-left text-gray-300 hover:text-gray-100 hover:bg-gray-700/60 transition-colors text-sm"
                >
                  <AIcon size={16} className="text-gray-500" />
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        <Divider />

        {/* ── Lists & blockquotes ──────────────────────── */}
        <ToolBtn
          icon={List}
          label="Unordered List"
          onClick={() => insertList(false)}
        />
        <ToolBtn
          icon={ListOrdered}
          label="Ordered List"
          onClick={() => insertList(true)}
        />
        <ToolBtn
          icon={Quote}
          label="Blockquote"
          onClick={insertBlockquote}
        />

        <Divider />

        {/* ── Insert elements ──────────────────────────── */}
        <ToolBtn icon={Link} label="Insert Link" onClick={insertLink} />
        <ToolBtn icon={Image} label="Insert Image" onClick={insertImage} />
        <ToolBtn
          icon={CodeSquare}
          label="Code Block"
          onClick={insertCodeBlock}
        />
        <ToolBtn icon={Table} label="Insert Table" onClick={insertTable} />
        <ToolBtn
          icon={Minus}
          label="Horizontal Rule"
          onClick={insertHorizontalRule}
        />

        {/* ── Spacer + right-side actions ──────────────── */}
        <div className="flex-1" />

        <ToolBtn
          icon={showPreview ? EyeOff : Eye}
          label={showPreview ? "Hide Preview" : "Show Preview"}
          onClick={() => setShowPreview((p) => !p)}
          active={showPreview}
        />

        {onSave && (
          <>
            <Divider />
            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-600/50 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {saving ? (
                <RotateCcw size={14} className="animate-spin" />
              ) : (
                <Save size={14} />
              )}
              {saving ? "Saving…" : "Save"}
            </button>
          </>
        )}
      </div>

      {/* Editor + Preview */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Editor pane */}
        <div
          className={`flex flex-col ${showPreview ? "w-1/2 border-r border-gray-700/60" : "w-full"}`}
        >
          <div className="px-3 py-1.5 bg-gray-800/40 border-b border-gray-700/40">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Markdown
            </span>
          </div>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            spellCheck={false}
            className="flex-1 w-full resize-none bg-gray-900 text-gray-200 p-4 font-mono text-sm leading-relaxed placeholder-gray-600 focus:outline-none overflow-y-auto"
            onKeyDown={(e) => {
              // Ctrl/Cmd+B → Bold
              if ((e.ctrlKey || e.metaKey) && e.key === "b") {
                e.preventDefault();
                insertWrapped("**", "**", "bold text");
              }
              // Ctrl/Cmd+I → Italic
              if ((e.ctrlKey || e.metaKey) && e.key === "i") {
                e.preventDefault();
                insertWrapped("*", "*", "italic text");
              }
              // Ctrl/Cmd+S → Save
              if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                if (onSave) onSave();
              }
              // Tab → insert 2 spaces
              if (e.key === "Tab") {
                e.preventDefault();
                const { start, end } = getSelection();
                replaceRange(start, end, "  ", 2);
              }
            }}
          />
        </div>

        {/* Preview pane */}
        {showPreview && (
          <div className="w-1/2 flex flex-col">
            <div className="px-3 py-1.5 bg-gray-800/40 border-b border-gray-700/40">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                Preview
              </span>
            </div>
            <div
              className="flex-1 overflow-y-auto p-5 md-preview"
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
