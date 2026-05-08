import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import MarkdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import apiClient from "../../utils/apiClient";
import { useEdit } from "../../contexts/EditContext";
import { resolveUploadedAssetUrl } from "../../utils/uploadUrls";
import {
  FaCheck,
  FaTimes,
  FaEye,
  FaEdit,
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaHeading,
  FaListUl,
  FaListOl,
  FaCheckSquare,
  FaTable,
  FaColumns,
  FaMinus,
  FaLink,
  FaImage,
  FaFileUpload,
  FaQuoteRight,
  FaCode,
  FaUndo,
  FaRedo,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaChevronDown,
  FaInfoCircle,
  FaExclamationTriangle,
  FaExclamationCircle,
  FaLightbulb,
} from "react-icons/fa";

/** Tailwind-styled renderers for ReactMarkdown — no color overrides, clean & consistent */
const getChildrenText = (children) =>
  React.Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }
      if (React.isValidElement(child)) {
        return getChildrenText(child.props?.children);
      }
      return "";
    })
    .join("")
    .trim();

const isLikelyImageUrl = (href = "") =>
  /(\.png|\.jpe?g|\.gif|\.webp|\.bmp|\.svg|\.avif)(\?.*)?$/i.test(href) ||
  /\/images\//i.test(href);

const findFirstAnchor = (node) => {
  if (!React.isValidElement(node)) return null;
  if (typeof node.props?.href === "string") return node;

  const children = React.Children.toArray(node.props?.children);
  for (const child of children) {
    const anchor = findFirstAnchor(child);
    if (anchor) return anchor;
  }
  return null;
};

const extractLinkFromListItem = (listItemNode) => {
  const anchor = findFirstAnchor(listItemNode);
  if (!anchor) return null;
  return {
    href: anchor.props.href,
    label: getChildrenText(anchor.props.children),
  };
};

const parseFacilityGridMarkdown = (markdownText = "") => {
  if (typeof markdownText !== "string" || !markdownText.trim()) return null;

  const hasFacilitySignals =
    /\[Reference Image\]\(([^)]+)\)/i.test(markdownText) &&
    /^\s*###\s+/m.test(markdownText);

  if (!hasFacilitySignals) return null;

  const firstHeadingMatch = markdownText.match(/^\s*###\s+/m);
  if (!firstHeadingMatch || firstHeadingMatch.index === undefined) return null;

  const intro = markdownText.slice(0, firstHeadingMatch.index).trim();
  const facilityPart = markdownText.slice(firstHeadingMatch.index);
  const facilityRegex = /###\s+([^\n]+)\n([\s\S]*?)(?=(?:\n###\s+)|$)/g;

  const facilities = [];
  let match;

  while ((match = facilityRegex.exec(facilityPart)) !== null) {
    const title = (match[1] || "").trim();
    const body = (match[2] || "").trim();
    const departmentMatch = body.match(/\*\*Department:\*\*\s*([^\n]+)/i);
    const reportMatch = body.match(/\[View Detailed Report\]\(([^)]+)\)/i);
    const imageMatch = body.match(/\[Reference Image\]\(([^)]+)\)/i);

    if (!title || !imageMatch || !isLikelyImageUrl(imageMatch[1])) {
      continue;
    }

    const description = body
      .replace(/\*\*Department:\*\*\s*[^\n]+\n?/i, "")
      .replace(/-\s*\[View Detailed Report\]\([^)]+\)\s*\n?/i, "")
      .replace(/-\s*\[Reference Image\]\([^)]+\)\s*\n?/i, "")
      .trim();

    facilities.push({
      title,
      department: departmentMatch ? departmentMatch[1].trim() : "",
      description,
      reportUrl: reportMatch ? reportMatch[1].trim() : null,
      imageUrl: imageMatch[1].trim(),
    });
  }

  if (facilities.length < 2) return null;
  return { intro, facilities };
};

const parseResearchScholarMarkdown = (markdownText = "") => {
  if (typeof markdownText !== "string" || !markdownText.trim()) return null;

  const itemRegex =
    /(?:^|\n)\s*(\d+)\.\s+\*\*([^\n*]+)\*\*\s*\n([\s\S]*?)(?=\n\s*\d+\.\s+\*\*|$)/g;

  const scholars = [];
  let match;

  while ((match = itemRegex.exec(markdownText)) !== null) {
    const serial = (match[1] || "").trim();
    const name = (match[2] || "").trim();
    const body = (match[3] || "").trim();

    if (!name || !body) continue;

    const fields = [];
    const fieldRegex = /^\s*-\s*([^:\n]+):\s*(.+)\s*$/gm;
    let fieldMatch;

    while ((fieldMatch = fieldRegex.exec(body)) !== null) {
      fields.push({
        label: fieldMatch[1].trim(),
        value: fieldMatch[2].trim(),
      });
    }

    if (!fields.length) continue;

    const labels = fields.map((field) => field.label.toLowerCase());
    const isScholarPattern =
      labels.some((label) => label.includes("registration")) &&
      labels.some((label) => label.includes("research topic")) &&
      labels.some((label) => label.includes("status"));

    if (!isScholarPattern) continue;

    scholars.push({ serial, name, fields });
  }

  if (scholars.length < 1) return null;
  return scholars;
};

const getScholarStatusClass = (statusValue = "") => {
  const status = statusValue.toLowerCase();
  if (status.includes("completed")) {
    return "bg-green-50 text-green-700 border-green-200";
  }
  if (status.includes("thesis submitted")) {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }
  return "bg-blue-50 text-blue-700 border-blue-200";
};

const extractMarkdownLinks = (text = "") => {
  const links = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    links.push({
      label: (match[1] || "").trim(),
      href: (match[2] || "").trim(),
    });
  }

  return links;
};

const parseDepartmentPageLink = (markdownText = "") => {
  const pattern =
    /^\s*\*\*Department Page:\*\*\s*\[([^\]]+)\]\(([^)]+)\)\s*(?:\n|$)/i;
  const match = markdownText.match(pattern);

  if (!match) {
    return {
      departmentLink: null,
      content: markdownText,
    };
  }

  const content = markdownText.slice(match[0].length).replace(/^\s+/, "");
  return {
    departmentLink: {
      label: match[1].trim(),
      href: match[2].trim(),
    },
    content,
  };
};

const splitByH2Sections = (markdownText = "") => {
  const headingRegex = /^##\s+(.+)$/gm;
  const matches = Array.from(markdownText.matchAll(headingRegex));

  if (!matches.length) return null;

  const sections = [];
  for (let i = 0; i < matches.length; i += 1) {
    const current = matches[i];
    const start = current.index + current[0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : markdownText.length;
    sections.push({
      title: (current[1] || "").trim(),
      content: markdownText.slice(start, end).trim(),
    });
  }

  return {
    intro: markdownText.slice(0, matches[0].index).trim(),
    sections,
  };
};

const parseNumberedEntries = (markdownText = "") => {
  const itemRegex = /(?:^|\n)\s*(\d+)\.\s+([^\n]+)\n?([\s\S]*?)(?=(?:\n\s*\d+\.\s+[^\n]+)|$)/g;
  const entries = [];
  let match;

  while ((match = itemRegex.exec(markdownText)) !== null) {
    const serial = (match[1] || "").trim();
    let title = (match[2] || "").trim();
    const body = (match[3] || "").trim();

    const boldTitle = title.match(/^\*\*(.+)\*\*$/);
    if (boldTitle) {
      title = boldTitle[1].trim();
    }

    const fields = [];
    const fieldRegex = /^\s*-\s*([^:\n]+):\s*(.+)\s*$/gm;
    let fieldMatch;

    while ((fieldMatch = fieldRegex.exec(body)) !== null) {
      fields.push({
        label: fieldMatch[1].trim(),
        value: fieldMatch[2].trim(),
      });
    }

    const freeText = body
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !/^-+\s*[^:\n]+:\s*.+$/.test(line));

    entries.push({
      serial,
      title,
      fields,
      freeText,
    });
  }

  return entries.length ? entries : null;
};

const parseDocumentCardItems = (markdownText = "") => {
  const bulletLines = (markdownText.match(/^\s*-\s+.+$/gm) || []).map((line) =>
    line.trim(),
  );

  if (bulletLines.length < 2) return null;

  const items = [];
  for (const line of bulletLines) {
    const body = line.replace(/^\s*-\s+/, "").trim();
    const links = extractMarkdownLinks(body);
    if (!links.length) return null;

    const boldTitle = body.match(/\*\*([^*]+)\*\*/);
    const primaryLink = links[links.length - 1];
    const title = (boldTitle ? boldTitle[1] : primaryLink.label).trim();
    const description = body
      .replace(/\*\*[^*]+\*\*:?\s*/g, "")
      .replace(/\[[^\]]+\]\([^)]+\)/g, "")
      .replace(/\s{2,}/g, " ")
      .replace(/^[\s:-]+|[\s:-]+$/g, "")
      .trim();

    items.push({
      title,
      description,
      linkLabel: primaryLink.label || "View document",
      href: primaryLink.href,
    });
  }

  if (items.length !== bulletLines.length) return null;
  return items;
};

const getMetaChipClass = (label = "", value = "") => {
  const labelLower = label.toLowerCase();
  if (labelLower.includes("status")) {
    return getScholarStatusClass(value);
  }
  if (labelLower.includes("date") || labelLower.includes("w.e.f")) {
    return "bg-gray-50 text-gray-700 border-gray-200";
  }
  if (labelLower.includes("type")) {
    return "bg-blue-50 text-blue-700 border-blue-200";
  }
  if (labelLower.includes("indexing")) {
    return "bg-cyan-50 text-cyan-700 border-cyan-200";
  }
  return "bg-slate-50 text-slate-700 border-slate-200";
};

const DepartmentLinkCard = ({ link }) => {
  if (!link) return null;
  return (
    <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2">
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-ssgmce-blue hover:text-blue-800 transition-colors"
      >
        {link.label}
      </a>
    </div>
  );
};

const DocumentCards = ({ items }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {items.map((item, idx) => (
      <article
        key={`${item.title}-${idx}`}
        className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
      >
        <h4 className="text-base font-semibold text-gray-900 leading-snug">
          {item.title}
        </h4>
        {item.description ? (
          <p className="mt-1 text-sm text-gray-600 leading-relaxed">{item.description}</p>
        ) : null}
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center justify-center rounded-md bg-ssgmce-blue px-3 py-2 text-xs font-semibold text-white hover:bg-blue-800 transition-colors"
        >
          {item.linkLabel}
        </a>
      </article>
    ))}
  </div>
);

const StructuredRecordCards = ({ entries }) => (
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
    {entries.map((entry, idx) => {
      const metaFields = entry.fields.filter((field) =>
        /status|date|w\.e\.f|type|indexing/i.test(field.label),
      );
      const detailFields = entry.fields.filter(
        (field) => !/status|date|w\.e\.f|type|indexing/i.test(field.label),
      );

      return (
        <article
          key={`${entry.serial}-${entry.title}-${idx}`}
          className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          <h4 className="text-base font-semibold text-gray-900 leading-snug">
            {entry.serial ? `${entry.serial}. ` : ""}
            {entry.title}
          </h4>

          {metaFields.length ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {metaFields.map((field, fieldIdx) => (
                <span
                  key={`${entry.title}-${field.label}-${fieldIdx}`}
                  className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${getMetaChipClass(field.label, field.value)}`}
                >
                  {field.value}
                </span>
              ))}
            </div>
          ) : null}

          {detailFields.length ? (
            <dl className="mt-3 space-y-2">
              {detailFields.map((field, fieldIdx) => (
                <div
                  key={`${entry.title}-${field.label}-${fieldIdx}-detail`}
                  className="border-t border-gray-100 pt-2 first:border-t-0 first:pt-0"
                >
                  <dt className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">
                    {field.label}
                  </dt>
                  <dd className="mt-0.5 text-sm text-gray-700 leading-relaxed">
                    {field.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {entry.freeText.length ? (
            <ul className="mt-3 space-y-1">
              {entry.freeText.map((line, lineIdx) => (
                <li
                  key={`${entry.title}-line-${lineIdx}`}
                  className="text-sm text-gray-700 leading-relaxed"
                >
                  {line}
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      );
    })}
  </div>
);

const PlainNumberedGrid = ({ entries }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
      {entries.map((entry, idx) => (
        <div key={`${entry.serial}-${idx}`} className="flex items-start gap-2">
          <span className="min-w-[1.5rem] text-sm font-semibold text-gray-400">
            {entry.serial}.
          </span>
          <p className="text-sm text-gray-700 leading-relaxed">{entry.title}</p>
        </div>
      ))}
    </div>
  </div>
);

/** markdown-it instance with attrs plugin — used to render image {attrs} */
const mdIt = new MarkdownIt({ html: true }).use(markdownItAttrs);

/** Pre-process ::: container blocks and markdown-it-attrs images into HTML for ReactMarkdown + rehype-raw */
const preprocessContainers = (md) => {
  if (!md) return md;

  // 1. Process ::: containers
  let result = md.replace(/^:::([\w-]+)\s*\n([\s\S]*?)\n:::\s*$/gm, (_, type, content) => {
    const t = type.toLowerCase();
    if (['left', 'center', 'right', 'justify'].includes(t)) {
      return `<div class="md-align-${t}">\n\n${content.trim()}\n\n</div>`;
    }
    if (['info', 'warning', 'danger', 'tip'].includes(t)) {
      return `<div class="md-callout md-callout-${t}">\n\n${content.trim()}\n\n</div>`;
    }
    return `<div class="md-container-${t}">\n\n${content.trim()}\n\n</div>`;
  });

  // 2. Process markdown-it-attrs images: ![alt](url){width=50% .align-center} → rendered HTML
  //    Works standalone AND inside table cells (single-line, no block wrappers)
  result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)\{([^}]+)\}/g, (match) => {
    const rendered = mdIt.render(match).trim();
    return rendered.replace(/^<p>/, '').replace(/<\/p>$/, '');
  });

  return result;
};

const FacilityGridLayout = ({ markdownText }) => {
  const renderMarkdown = (content) => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={MD_COMPONENTS}
    >
      {preprocessContainers(content)}
    </ReactMarkdown>
  );

  const facilityParsed = parseFacilityGridMarkdown(markdownText);
  if (facilityParsed) {
    return (
      <div className="space-y-5">
        {facilityParsed.intro ? renderMarkdown(facilityParsed.intro) : null}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {facilityParsed.facilities.map((facility, idx) => (
            <article
              key={`${facility.title}-${idx}`}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {facility.title}
              </h3>

              {facility.department ? (
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Department:</span>{" "}
                  {facility.department}
                </p>
              ) : null}

              {facility.description ? renderMarkdown(facility.description) : null}

              <div className="mt-3 flex flex-col items-start gap-2.5">
                {facility.reportUrl ? (
                <a
                  href={facility.reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-ssgmce-blue text-white font-medium hover:bg-blue-800 transition-colors w-fit"
                >
                  Download Detailed Report
                </a>
                ) : null}

                <a
                  href={resolveUploadedAssetUrl(facility.imageUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full max-w-[200px]"
                >
                  <img
                    src={resolveUploadedAssetUrl(facility.imageUrl)}
                    alt={`${facility.title} reference`}
                    loading="lazy"
                    className="w-full h-28 object-cover rounded-lg border border-gray-200 shadow-sm"
                  />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  const scholarParsed = parseResearchScholarMarkdown(markdownText);
  if (scholarParsed) {
    const scholarEntries = scholarParsed.map((scholar) => ({
      serial: scholar.serial,
      title: scholar.name,
      fields: scholar.fields,
      freeText: [],
    }));

    return <StructuredRecordCards entries={scholarEntries} />;
  }

  const { departmentLink, content } = parseDepartmentPageLink(markdownText);
  const sectioned = splitByH2Sections(content);

  if (sectioned) {
    const classifiedSections = sectioned.sections.map((section) => {
      const docs = parseDocumentCardItems(section.content);
      if (docs) return { ...section, kind: "docs", docs };

      const entries = parseNumberedEntries(section.content);
      if (entries && entries.some((entry) => entry.fields.length > 0)) {
        return { ...section, kind: "structured", entries };
      }

      const isYearSection = /^\d{4}-\d{2}$/.test(section.title);
      if (
        entries &&
        isYearSection &&
        entries.every((entry) => entry.fields.length === 0 && !entry.freeText.length)
      ) {
        return { ...section, kind: "plain-numbered", entries };
      }

      return { ...section, kind: "markdown" };
    });

    const hasCustomSection = classifiedSections.some(
      (section) => section.kind !== "markdown",
    );

    if (hasCustomSection) {
      return (
        <div className="space-y-5">
          <DepartmentLinkCard link={departmentLink} />

          {sectioned.intro ? renderMarkdown(sectioned.intro) : null}

          {classifiedSections.map((section, idx) => (
            <section key={`${section.title}-${idx}`} className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-ssgmce-blue border-b border-gray-200 pb-1">
                  {section.title}
                </h3>
                {section.kind === "plain-numbered" ? (
                  <span className="text-xs font-medium text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-2.5 py-1">
                    {section.entries.length} items
                  </span>
                ) : null}
              </div>

              {section.kind === "docs" ? <DocumentCards items={section.docs} /> : null}
              {section.kind === "structured" ? (
                <StructuredRecordCards entries={section.entries} />
              ) : null}
              {section.kind === "plain-numbered" ? (
                <PlainNumberedGrid entries={section.entries} />
              ) : null}
              {section.kind === "markdown" ? renderMarkdown(section.content) : null}
            </section>
          ))}
        </div>
      );
    }
  }

  const docsOnly = parseDocumentCardItems(content);
  if (docsOnly) {
    return (
      <div className="space-y-4">
        <DepartmentLinkCard link={departmentLink} />
        <DocumentCards items={docsOnly} />
      </div>
    );
  }

  const entriesOnly = parseNumberedEntries(content);
  if (entriesOnly && entriesOnly.some((entry) => entry.fields.length > 0)) {
    return (
      <div className="space-y-4">
        <DepartmentLinkCard link={departmentLink} />
        <StructuredRecordCards entries={entriesOnly} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <DepartmentLinkCard link={departmentLink} />
      {renderMarkdown(content)}
    </div>
  );
};

const MD_COMPONENTS = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold text-gray-900 mb-4 mt-6 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-bold text-ssgmce-blue mb-3 mt-5 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4 first:mt-0">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-base font-semibold text-gray-800 mb-2 mt-3 first:mt-0">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-gray-700 mb-3 leading-relaxed last:mb-0">
      {children}
    </p>
  ),
  ul: ({ children }) => {
    const rawItems = React.Children.toArray(children).filter((child) =>
      React.isValidElement(child),
    );
    const links = rawItems.map(extractLinkFromListItem).filter(Boolean);
    const reportLink = links.find((item) =>
      /view detailed report|detailed report/i.test(item.label),
    );
    const imageLink = links.find(
      (item) =>
        /reference image/i.test(item.label) && isLikelyImageUrl(item.href),
    );

    if (rawItems.length === 2 && reportLink && imageLink) {
      return (
        <div className="my-3 flex flex-col items-start gap-2.5">
          <a
            href={reportLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-ssgmce-blue text-white font-medium hover:bg-blue-800 transition-colors w-fit"
          >
            Download Detailed Report
          </a>

          <a
            href={imageLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full max-w-[200px]"
          >
            <img
              src={imageLink.href}
              alt={imageLink.label || "Reference image"}
              loading="lazy"
              className="w-full h-28 object-cover rounded-lg border border-gray-200 shadow-sm"
            />
          </a>
        </div>
      );
    }

    return (
      <ul className="list-disc pl-6 space-y-1 mb-3 text-gray-700">
        {children}
      </ul>
    );
  },
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 space-y-1 mb-3 text-gray-700">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-gray-700 leading-relaxed">
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">
      {children}
    </strong>
  ),
  em: ({ children }) => <em className="italic text-gray-600">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-ssgmce-orange pl-4 italic text-gray-600 my-4 bg-orange-50 py-2 pr-3 rounded-r">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-gray-200 my-6" />,
  code: ({ inline, children }) =>
    inline ? (
      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800">
        {children}
      </code>
    ) : (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-3 text-sm font-mono">
        <code>{children}</code>
      </pre>
    ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-ssgmce-blue underline hover:text-ssgmce-orange transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full border divide-y divide-gray-200 rounded overflow-hidden" style={{ tableLayout: 'auto' }}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-ssgmce-blue text-white">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-gray-200 bg-white">
      {children}
    </tbody>
  ),
  th: ({ children, style }) => (
    <th className="px-3 py-2 text-sm font-semibold" style={style}>{children}</th>
  ),
  td: ({ children, style }) => {
    // Detect if cell contains an image to use compact padding
    const hasImage = React.Children.toArray(children).some(
      (child) => React.isValidElement(child) && (child.type === 'img' || child.props?.src)
    );
    return (
      <td
        className={`text-sm text-gray-700 align-middle ${hasImage ? 'px-2 py-1' : 'px-3 py-2'}`}
        style={style}
      >
        {children}
      </td>
    );
  },
  tr: ({ children }) => <tr className="even:bg-gray-50">{children}</tr>,
  img: ({ src, alt, width, className: imgClassName, style: imgStyle, ...imgRest }) => {
    // Determine width from markdown-it-attrs
    const widthVal = width || imgStyle?.width;
    const inlineStyle = {};
    if (widthVal) {
      inlineStyle.width = widthVal;
      inlineStyle.maxWidth = widthVal;
    } else {
      inlineStyle.maxWidth = '100%';
    }
    inlineStyle.height = 'auto';

    // Determine alignment from class: align-left, align-center, align-right
    const classes = (imgClassName || '').split(/\s+/);
    if (classes.includes('align-left')) {
      inlineStyle.float = 'left';
      inlineStyle.marginRight = '1rem';
      inlineStyle.marginBottom = '0.5rem';
    } else if (classes.includes('align-right')) {
      inlineStyle.float = 'right';
      inlineStyle.marginLeft = '1rem';
      inlineStyle.marginBottom = '0.5rem';
    } else if (classes.includes('align-center')) {
      inlineStyle.display = 'block';
      inlineStyle.marginLeft = 'auto';
      inlineStyle.marginRight = 'auto';
    }

    return (
      <img
        src={src}
        alt={alt || ""}
        style={inlineStyle}
        className="rounded-lg my-1 shadow-sm border border-gray-200 dark:border-gray-700"
        loading="lazy"
      />
    );
  },
  // Support raw HTML for alignment and callout containers
  div: ({ className, children, align, style, ...props }) => {
    // Handle legacy HTML align attribute
    if (align && !className?.includes('md-')) {
      const alignClasses = { left: 'text-left', center: 'text-center', right: 'text-right' };
      return <div className={`${alignClasses[align] || ''} my-2`} {...props}>{children}</div>;
    }
    // Handle ::: alignment containers
    if (className?.startsWith('md-align-')) {
      const a = className.replace('md-align-', '');
      const cls = { left: 'text-left', center: 'text-center', right: 'text-right', justify: 'text-justify' }[a] || '';
      return <div className={`${cls} my-2`} {...props}>{children}</div>;
    }
    // Handle ::: callout containers
    if (className?.includes('md-callout')) {
      const typeMatch = className.match(/md-callout-(info|warning|danger|tip)/);
      const type = typeMatch?.[1] || 'info';
      const styles = {
        info: { border: 'border-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30', title: 'text-blue-700 dark:text-blue-300', body: 'text-blue-800 dark:text-blue-200', icon: <FaInfoCircle className="text-blue-500" size={16} />, label: 'Info' },
        warning: { border: 'border-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-950/30', title: 'text-yellow-700 dark:text-yellow-300', body: 'text-yellow-800 dark:text-yellow-200', icon: <FaExclamationTriangle className="text-yellow-500" size={16} />, label: 'Warning' },
        danger: { border: 'border-red-400', bg: 'bg-red-50 dark:bg-red-950/30', title: 'text-red-700 dark:text-red-300', body: 'text-red-800 dark:text-red-200', icon: <FaExclamationCircle className="text-red-500" size={16} />, label: 'Danger' },
        tip: { border: 'border-green-400', bg: 'bg-green-50 dark:bg-green-950/30', title: 'text-green-700 dark:text-green-300', body: 'text-green-800 dark:text-green-200', icon: <FaLightbulb className="text-green-500" size={16} />, label: 'Tip' },
      };
      const s = styles[type];
      return (
        <div className={`border-l-4 ${s.border} ${s.bg} p-4 my-3 rounded-r-lg`} {...props}>
          <div className={`flex items-center gap-2 font-semibold ${s.title} mb-2`}>{s.icon} {s.label}</div>
          <div className={s.body}>{children}</div>
        </div>
      );
    }
    return <div className={className} style={style} {...props}>{children}</div>;
  },
};

/* ── Toolbar group separator ──────────────────────────────────── */
const Sep = () => <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-0.5" />;

/* ── Single toolbar button ────────────────────────────────────── */
const TBtn = ({
  icon: Icon,
  label,
  title,
  onClick,
  accent,
  disabled,
  uploading,
}) => (
  <button
    type="button"
    title={title}
    disabled={disabled}
    onMouseDown={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`
      inline-flex items-center gap-1 px-2 py-1.5 text-xs rounded transition-colors shadow-sm
      ${disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 cursor-pointer"}
      ${accent ? "bg-blue-50 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100" : "bg-white dark:bg-[#1a1a2e] border border-gray-300 dark:border-gray-600"}
    `}
  >
    {uploading ? (
      <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    ) : Icon ? (
      <Icon size={11} />
    ) : null}
    {label && <span className="font-medium">{label}</span>}
  </button>
);

/* ── Heading Dropdown Items ───────────────────────────────────── */
const HEADING_LEVELS = [
  { level: 1, label: "Heading 1", size: "text-lg font-bold" },
  { level: 2, label: "Heading 2", size: "text-base font-bold" },
  { level: 3, label: "Heading 3", size: "text-sm font-semibold" },
  { level: 4, label: "Heading 4", size: "text-sm font-medium" },
  { level: 5, label: "Heading 5", size: "text-xs font-medium" },
  { level: 6, label: "Heading 6", size: "text-xs" },
];

/* ── Image insert dialog constants ─────────────────────────── */
const IMAGE_SIZES = [
  { value: '25', label: 'Small (25%)' },
  { value: '50', label: 'Medium (50%)' },
  { value: '75', label: 'Large (75%)' },
  { value: '100', label: 'Full Width (100%)' },
];

const IMAGE_ALIGNS = [
  { value: 'none', label: 'Default', icon: FaAlignLeft, desc: 'Normal flow' },
  { value: 'left', label: 'Float Left', icon: FaAlignLeft, desc: 'Text wraps right' },
  { value: 'center', label: 'Center', icon: FaAlignCenter, desc: 'Centered block' },
  { value: 'right', label: 'Float Right', icon: FaAlignRight, desc: 'Text wraps left' },
];

const CALLOUT_TYPES = [
  { type: 'info', label: 'Info', icon: FaInfoCircle, color: 'text-blue-500', desc: 'Informational note' },
  { type: 'tip', label: 'Tip', icon: FaLightbulb, color: 'text-green-500', desc: 'Helpful tip' },
  { type: 'warning', label: 'Warning', icon: FaExclamationTriangle, color: 'text-yellow-500', desc: 'Warning notice' },
  { type: 'danger', label: 'Danger', icon: FaExclamationCircle, color: 'text-red-500', desc: 'Danger alert' },
];

const ImageInsertDialog = ({ open, onClose, onInsert, imageName }) => {
  const [size, setSize] = useState('100');
  const [align, setAlign] = useState('none');

  useEffect(() => {
    if (open) { setSize('100'); setAlign('none'); }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40" onMouseDown={onClose}>
      <div
        className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-sm mx-4 p-5"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">Insert Image</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 truncate">{imageName}</p>

        <div className="mb-4">
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block">Size</label>
          <div className="grid grid-cols-2 gap-2">
            {IMAGE_SIZES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setSize(value)}
                className={`px-3 py-2 text-xs rounded-lg border transition-colors font-medium ${
                  size === value
                    ? 'bg-blue-50 border-blue-400 text-blue-700 dark:bg-blue-900/40 dark:border-blue-500 dark:text-blue-300'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block">Alignment</label>
          <div className="grid grid-cols-2 gap-2">
            {IMAGE_ALIGNS.map(({ value, label, icon: AIcon, desc }) => (
              <button
                key={value}
                type="button"
                onClick={() => setAlign(value)}
                className={`flex items-center gap-2 px-3 py-2 text-xs rounded-lg border transition-colors font-medium ${
                  align === value
                    ? 'bg-blue-50 border-blue-400 text-blue-700 dark:bg-blue-900/40 dark:border-blue-500 dark:text-blue-300'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <AIcon size={11} />
                <div className="text-left">
                  <div>{label}</div>
                  <div className="text-[10px] opacity-60 font-normal">{desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onInsert(size, align)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Insert
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const MarkdownEditor = ({
  path,
  value,
  onSave,
  placeholder = "Click to edit content…",
  className = "",
}) => {
  const { data, updateData, isEditing } = useEdit();
  const textareaRef = useRef(null);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const headingDropdownRef = useRef(null);
  const alignDropdownRef = useRef(null);
  const calloutDropdownRef = useRef(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [headingOpen, setHeadingOpen] = useState(false);
  const [alignOpen, setAlignOpen] = useState(false);
  const [calloutOpen, setCalloutOpen] = useState(false);
  const [splitPreview, setSplitPreview] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [pendingImageUrl, setPendingImageUrl] = useState('');
  const [pendingImageName, setPendingImageName] = useState('');

  const getValueFromPath = (obj, p) => {
    if (!p || !obj) return undefined;
    return p
      .replace(/\[(\d+)\]/g, ".$1")
      .split(".")
      .reduce((acc, part) => acc && acc[part], obj);
  };

  const displayValue =
    value !== undefined ? value : path ? getValueFromPath(data, path) : "";

  const [currentValue, setCurrentValue] = useState(displayValue || "");
  const [localEditing, setLocalEditing] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    setCurrentValue(displayValue || "");
  }, [displayValue]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (headingDropdownRef.current && !headingDropdownRef.current.contains(e.target)) {
        setHeadingOpen(false);
      }
      if (alignDropdownRef.current && !alignDropdownRef.current.contains(e.target)) {
        setAlignOpen(false);
      }
      if (calloutDropdownRef.current && !calloutDropdownRef.current.contains(e.target)) {
        setCalloutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  /** Push current value to undo stack before a change */
  const pushUndo = useCallback(() => {
    setUndoStack((prev) => [...prev.slice(-30), currentValue]);
    setRedoStack([]);
  }, [currentValue]);

  const handleUndo = useCallback(() => {
    if (undoStack.length === 0) return;
    const prev = undoStack[undoStack.length - 1];
    setRedoStack((r) => [...r, currentValue]);
    setUndoStack((u) => u.slice(0, -1));
    setCurrentValue(prev);
  }, [undoStack, currentValue]);

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setUndoStack((u) => [...u, currentValue]);
    setRedoStack((r) => r.slice(0, -1));
    setCurrentValue(next);
  }, [redoStack, currentValue]);

  const handleSave = () => {
    if (onSave) onSave(currentValue);
    else if (path) updateData(path, currentValue);
    setLocalEditing(false);
    setPreview(false);
  };

  const handleCancel = () => {
    setCurrentValue(displayValue || "");
    setLocalEditing(false);
    setPreview(false);
  };

  /** Insert text at cursor, replacing any selection */
  const insertAtCursor = useCallback(
    (text) => {
      pushUndo();
      const el = textareaRef.current;
      const start = el ? el.selectionStart : currentValue.length;
      const end = el ? el.selectionEnd : currentValue.length;
      const next =
        currentValue.substring(0, start) + text + currentValue.substring(end);
      setCurrentValue(next);
      setTimeout(() => {
        if (el) {
          el.focus();
          const pos = start + text.length;
          el.setSelectionRange(pos, pos);
        }
      }, 0);
    },
    [currentValue, pushUndo],
  );

  /** Wrap selection (or default text) with prefix/suffix */
  const wrapSelection = useCallback(
    (before, after, defaultText = "") => {
      pushUndo();
      const el = textareaRef.current;
      const start = el ? el.selectionStart : currentValue.length;
      const end = el ? el.selectionEnd : currentValue.length;
      const selected = currentValue.substring(start, end) || defaultText;
      const replacement = before + selected + after;
      const next =
        currentValue.substring(0, start) +
        replacement +
        currentValue.substring(end);
      setCurrentValue(next);
      setTimeout(() => {
        if (el) {
          el.focus();
          // Select the text inside the wrapping
          el.setSelectionRange(
            start + before.length,
            start + before.length + selected.length,
          );
        }
      }, 0);
    },
    [currentValue, pushUndo],
  );

  /** Prefix each line of selection */
  const prefixLines = useCallback(
    (prefix, defaultText = "") => {
      pushUndo();
      const el = textareaRef.current;
      const start = el ? el.selectionStart : currentValue.length;
      const end = el ? el.selectionEnd : currentValue.length;
      const selected = currentValue.substring(start, end) || defaultText;
      const prefixed = selected
        .split("\n")
        .map((line) => prefix + line)
        .join("\n");
      const next =
        currentValue.substring(0, start) +
        prefixed +
        currentValue.substring(end);
      setCurrentValue(next);
      setTimeout(() => {
        if (el) {
          el.focus();
          el.setSelectionRange(start, start + prefixed.length);
        }
      }, 0);
    },
    [currentValue, pushUndo],
  );

  /** Insert heading at current line start (toggle-aware, H1-H6) */
  const insertHeading = useCallback(
    (level) => {
      pushUndo();
      const el = textareaRef.current;
      const start = el ? el.selectionStart : currentValue.length;
      const lineStart = currentValue.lastIndexOf("\n", start - 1) + 1;
      const lineEndIdx = currentValue.indexOf("\n", start);
      const lineEnd = lineEndIdx === -1 ? currentValue.length : lineEndIdx;
      const currentLine = currentValue.slice(lineStart, lineEnd);
      const prefix = "#".repeat(level) + " ";

      let newLine;
      if (currentLine.startsWith(prefix)) {
        // Toggle off — remove this heading prefix
        newLine = currentLine.slice(prefix.length);
      } else {
        // Remove any existing heading prefix, then add the new one
        const stripped = currentLine.replace(/^#{1,6}\s*/, "");
        newLine = prefix + (stripped || "Heading text");
      }

      const next =
        currentValue.substring(0, lineStart) +
        newLine +
        currentValue.substring(lineEnd);
      setCurrentValue(next);
      setHeadingOpen(false);

      setTimeout(() => {
        if (el) {
          el.focus();
          el.setSelectionRange(lineStart + newLine.length, lineStart + newLine.length);
        }
      }, 0);
    },
    [currentValue, pushUndo],
  );

  /** Multi-line blockquote — add > to each selected line, or insert template */
  const insertBlockquoteMultiline = useCallback(() => {
    pushUndo();
    const el = textareaRef.current;
    const start = el ? el.selectionStart : currentValue.length;
    const end = el ? el.selectionEnd : currentValue.length;
    const selected = currentValue.substring(start, end);

    if (selected) {
      const lines = selected.split("\n");
      const quoted = lines
        .map((line, i) => `> ${line}` + (i < lines.length - 1 ? "  " : ""))
        .join("\n");
      const next =
        currentValue.substring(0, start) +
        quoted +
        currentValue.substring(end);
      setCurrentValue(next);
      setTimeout(() => {
        if (el) {
          el.focus();
          el.setSelectionRange(start, start + quoted.length);
        }
      }, 0);
    } else {
      const template = "> Quote line one  \n> Quote line two  \n> Quote line three";
      const next =
        currentValue.substring(0, start) +
        template +
        currentValue.substring(end);
      setCurrentValue(next);
      setTimeout(() => {
        if (el) {
          el.focus();
          el.setSelectionRange(start + 2, start + 16); // select "Quote line one"
        }
      }, 0);
    }
  }, [currentValue, pushUndo]);

  /** Insert alignment container (:::left, :::center, :::right, :::justify) */
  const insertAlignment = useCallback(
    (align) => {
      pushUndo();
      const el = textareaRef.current;
      const start = el ? el.selectionStart : currentValue.length;
      const end = el ? el.selectionEnd : currentValue.length;
      const selected = currentValue.substring(start, end) || "Your text here";
      const wrapped = `\n:::${align}\n${selected}\n:::\n`;
      const next =
        currentValue.substring(0, start) +
        wrapped +
        currentValue.substring(end);
      setCurrentValue(next);
      setAlignOpen(false);
      setTimeout(() => {
        if (el) {
          el.focus();
          const contentStart = start + align.length + 6;
          el.setSelectionRange(contentStart, contentStart + selected.length);
        }
      }, 0);
    },
    [currentValue, pushUndo],
  );

  /** Insert code block with optional selection */
  const insertCodeBlock = useCallback(() => {
    pushUndo();
    const el = textareaRef.current;
    const start = el ? el.selectionStart : currentValue.length;
    const end = el ? el.selectionEnd : currentValue.length;
    const selected = currentValue.substring(start, end);
    const block = selected ? "```\n" + selected + "\n```" : "```\ncode here\n```";
    const next =
      currentValue.substring(0, start) +
      block +
      currentValue.substring(end);
    setCurrentValue(next);
    setTimeout(() => {
      if (el) {
        el.focus();
        if (!selected) {
          el.setSelectionRange(start + 4, start + 13); // select "code here"
        }
      }
    }, 0);
  }, [currentValue, pushUndo]);

  /** Insert callout container (:::info, :::warning, :::danger, :::tip) */
  const insertCallout = useCallback(
    (type) => {
      pushUndo();
      const el = textareaRef.current;
      const start = el ? el.selectionStart : currentValue.length;
      const end = el ? el.selectionEnd : currentValue.length;
      const selected = currentValue.substring(start, end) || "Your content here";
      const wrapped = `\n:::${type}\n${selected}\n:::\n`;
      const next = currentValue.substring(0, start) + wrapped + currentValue.substring(end);
      setCurrentValue(next);
      setCalloutOpen(false);
      setTimeout(() => {
        if (el) {
          el.focus();
          const contentStart = start + type.length + 6;
          el.setSelectionRange(contentStart, contentStart + selected.length);
        }
      }, 0);
    },
    [currentValue, pushUndo],
  );

  /** Insert image with size & alignment via markdown-it-attrs syntax — single line, works everywhere including tables */
  const handleImageInsert = useCallback(
    (size, align) => {
      if (!pendingImageUrl) return;
      pushUndo();
      // Build attrs: width + optional alignment class
      const attrs = [`width=${size}%`];
      if (align && align !== 'none') {
        attrs.push(`.align-${align}`);
      }
      const imgMarkdown = `![${pendingImageName || 'image'}](${pendingImageUrl}){${attrs.join(' ')}}`;
      const el = textareaRef.current;
      const start = el ? el.selectionStart : currentValue.length;
      const end = el ? el.selectionEnd : currentValue.length;
      const next = currentValue.substring(0, start) + imgMarkdown + currentValue.substring(end);
      setCurrentValue(next);
      setImageDialogOpen(false);
      setPendingImageUrl('');
      setPendingImageName('');
      setTimeout(() => {
        if (el) {
          el.focus();
          const pos = start + imgMarkdown.length;
          el.setSelectionRange(pos, pos);
        }
      }, 0);
    },
    [pendingImageUrl, pendingImageName, currentValue, pushUndo],
  );

  /* ── Upload handlers ────────────────────────────────────────── */
  const handleImageUpload = async (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const token = localStorage.getItem("adminToken");
      const res = await apiClient.post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      const url = res.data.fileUrl || res.data.url;
      if (url) {
        setPendingImageUrl(url);
        setPendingImageName(file.name);
        setImageDialogOpen(true);
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      alert(
        "Image upload failed: " + (err.response?.data?.message || err.message),
      );
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setUploadingFile(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const token = localStorage.getItem("adminToken");
      const res = await apiClient.post("/upload/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      const url = res.data.fileUrl || res.data.url;
      const name = res.data.originalName || file.name;
      if (url) insertAtCursor(`\n[📄 ${name}](${url})\n`);
    } catch (err) {
      console.error("File upload failed:", err);
      alert(
        "File upload failed: " + (err.response?.data?.message || err.message),
      );
    } finally {
      setUploadingFile(false);
    }
  };

  /* ── Keyboard shortcuts ─────────────────────────────────────── */
  const handleKeyDown = useCallback(
    (e) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key === "b") {
        e.preventDefault();
        wrapSelection("**", "**", "bold text");
      } else if (mod && e.key === "i") {
        e.preventDefault();
        wrapSelection("_", "_", "italic");
      } else if (mod && e.key === "k") {
        e.preventDefault();
        wrapSelection("[", "](url)", "link text");
      } else if (mod && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if (mod && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
        e.preventDefault();
        handleRedo();
      }
    },
    [wrapSelection, handleUndo, handleRedo],
  );

  /* ── View Mode ──────────────────────────────────────────────── */
  if (!isEditing) {
    return (
      <div className={className}>
        {displayValue ? (
          <FacilityGridLayout markdownText={displayValue} />
        ) : null}
      </div>
    );
  }

  /* ── Edit Trigger Mode (not actively editing) ───────────────── */
  if (!localEditing) {
    return (
      <div
        onClick={() => setLocalEditing(true)}
        className={`cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors rounded p-2 border-2 border-transparent hover:border-blue-200 min-h-[48px] ${className}`}
        title="Click to edit (Markdown supported)"
      >
        {displayValue ? (
          <FacilityGridLayout markdownText={displayValue} />
        ) : (
          <span className="text-gray-400 dark:text-gray-500 italic text-sm">
            {placeholder}
          </span>
        )}
      </div>
    );
  }

  /* ── Active Edit Mode ───────────────────────────────────────── */
  return (
    <div className={`relative ${className}`}>
      {/* Hidden file inputs */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files[0]) handleImageUpload(e.target.files[0]);
          e.target.value = "";
        }}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.txt"
        className="hidden"
        onChange={(e) => {
          if (e.target.files[0]) handleFileUpload(e.target.files[0]);
          e.target.value = "";
        }}
      />

      {/* Image sizing & alignment dialog */}
      <ImageInsertDialog
        open={imageDialogOpen}
        onClose={() => {
          setImageDialogOpen(false);
          setPendingImageUrl('');
          setPendingImageName('');
        }}
        onInsert={handleImageInsert}
        imageName={pendingImageName}
      />

      {/* Toolbar */}
      <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-t-lg">
        {/* ── Main toolbar row ── */}
        <div className="flex items-center gap-1 px-3 py-2 flex-wrap">
          {/* ── Heading dropdown ── */}
          <div className="relative" ref={headingDropdownRef}>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setHeadingOpen((o) => !o);
                setAlignOpen(false);
                setCalloutOpen(false);
              }}
              className="inline-flex items-center gap-1 px-2 py-1.5 text-xs rounded transition-colors shadow-sm bg-white dark:bg-[#1a1a2e] border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              title="Heading (H1–H6)"
            >
              <FaHeading size={11} />
              <span className="font-medium hidden sm:inline">Heading</span>
              <FaChevronDown size={8} className={`transition-transform ${headingOpen ? "rotate-180" : ""}`} />
            </button>
            {headingOpen && (
              <div className="absolute top-full left-0 mt-1 z-50 w-44 bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl py-1">
                {HEADING_LEVELS.map(({ level, label, size }) => (
                  <button
                    key={level}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      insertHeading(level);
                    }}
                    className={`flex items-center gap-2 w-full px-3 py-1.5 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${size} text-gray-700 dark:text-gray-300`}
                  >
                    <span className="text-gray-400 dark:text-gray-500 text-[10px] font-mono w-10 shrink-0">{"#".repeat(level)}</span>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Sep />

          {/* ── Text formatting ── */}
          <TBtn
            icon={FaBold}
            title="Bold (Ctrl+B)"
            onClick={() => wrapSelection("**", "**", "bold text")}
          />
          <TBtn
            icon={FaItalic}
            title="Italic (Ctrl+I)"
            onClick={() => wrapSelection("_", "_", "italic")}
          />
          <TBtn
            icon={FaStrikethrough}
            title="Strikethrough"
            onClick={() => wrapSelection("~~", "~~", "strikethrough")}
          />
          <TBtn
            icon={FaCode}
            title="Inline code"
            onClick={() => wrapSelection("`", "`", "code")}
          />

          <Sep />

          {/* ── Alignment dropdown ── */}
          <div className="relative" ref={alignDropdownRef}>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setAlignOpen((o) => !o);
                setHeadingOpen(false);
                setCalloutOpen(false);
              }}
              className="inline-flex items-center gap-1 px-2 py-1.5 text-xs rounded transition-colors shadow-sm bg-white dark:bg-[#1a1a2e] border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              title="Text Alignment"
            >
              <FaAlignCenter size={11} />
              <FaChevronDown size={8} className={`transition-transform ${alignOpen ? "rotate-180" : ""}`} />
            </button>
            {alignOpen && (
              <div className="absolute top-full left-0 mt-1 z-50 w-44 bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl py-1">
                {[
                  { align: "left", icon: FaAlignLeft, label: "Align Left" },
                  { align: "center", icon: FaAlignCenter, label: "Align Center" },
                  { align: "right", icon: FaAlignRight, label: "Align Right" },
                  { align: "justify", icon: FaAlignJustify, label: "Justify" },
                ].map(({ align, icon: AIcon, label: lbl }) => (
                  <button
                    key={align}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      insertAlignment(align);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-1.5 text-left text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <AIcon size={11} className="text-gray-400 dark:text-gray-500" />
                    {lbl}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Sep />

          {/* ── Callout boxes ── */}
          <div className="relative" ref={calloutDropdownRef}>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setCalloutOpen((o) => !o);
                setHeadingOpen(false);
                setAlignOpen(false);
              }}
              className="inline-flex items-center gap-1 px-2 py-1.5 text-xs rounded transition-colors shadow-sm bg-white dark:bg-[#1a1a2e] border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              title="Callout / Info Box"
            >
              <FaInfoCircle size={11} />
              <span className="font-medium hidden sm:inline">Callout</span>
              <FaChevronDown size={8} className={`transition-transform ${calloutOpen ? "rotate-180" : ""}`} />
            </button>
            {calloutOpen && (
              <div className="absolute top-full left-0 mt-1 z-50 w-48 bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl py-1">
                {CALLOUT_TYPES.map(({ type, label, icon: CIcon, color, desc }) => (
                  <button
                    key={type}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      insertCallout(type);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-left text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <CIcon size={12} className={color} />
                    <div>
                      <div className="font-medium">{label}</div>
                      <div className="text-[10px] text-gray-400">{desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Sep />

          {/* ── Lists & blockquotes ── */}
          <TBtn
            icon={FaListUl}
            title="Bullet list"
            onClick={() => insertAtCursor("\n- Item 1\n- Item 2\n- Item 3\n")}
          />
          <TBtn
            icon={FaListOl}
            title="Numbered list"
            onClick={() => insertAtCursor("\n1. Item 1\n2. Item 2\n3. Item 3\n")}
          />
          <TBtn
            icon={FaQuoteRight}
            title="Multi-line blockquote"
            onClick={insertBlockquoteMultiline}
          />

          <Sep />

          {/* ── Structure elements ── */}
          <TBtn
            icon={FaTable}
            title="Insert table"
            onClick={() =>
              insertAtCursor(
                "\n| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Cell     | Cell     | Cell     |\n",
              )
            }
          />
          <TBtn
            icon={FaCode}
            title="Code block"
            onClick={insertCodeBlock}
          />
          <TBtn
            icon={FaMinus}
            title="Horizontal rule"
            onClick={() => insertAtCursor("\n---\n")}
          />

          <Sep />

          {/* ── Undo / Redo ── */}
          <TBtn
            icon={FaUndo}
            title="Undo (Ctrl+Z)"
            disabled={undoStack.length === 0}
            onClick={handleUndo}
          />
          <TBtn
            icon={FaRedo}
            title="Redo (Ctrl+Y)"
            disabled={redoStack.length === 0}
            onClick={handleRedo}
          />

          {/* ── Preview toggles (push right) ── */}
          <div className="flex-1" />
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                if (splitPreview) {
                  setSplitPreview(false);
                }
                setPreview((p) => !p);
              }}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 border rounded shadow-sm transition-colors font-medium ${
                preview && !splitPreview
                  ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                  : "bg-white dark:bg-[#1a1a2e] border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              title="Toggle full preview"
            >
              {preview && !splitPreview ? (
                <>
                  <FaEdit size={10} /> Edit
                </>
              ) : (
                <>
                  <FaEye size={10} /> Preview
                </>
              )}
            </button>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setPreview(false);
                setSplitPreview((p) => !p);
              }}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 border rounded shadow-sm transition-colors font-medium ${
                splitPreview
                  ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                  : "bg-white dark:bg-[#1a1a2e] border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              title="Split screen: editor + live preview"
            >
              <FaColumns size={10} /> Split Editor
            </button>
          </div>
        </div>

        {/* ── Insert row ── */}
        <div className="flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-600">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400 mr-2">Insert:</span>
          <TBtn
            icon={FaLink}
            title="Insert link (Ctrl+K)"
            onClick={() => wrapSelection("[", "](https://)", "link text")}
          />
          <TBtn
            icon={FaImage}
            title="Upload image"
            uploading={uploadingImage}
            disabled={uploadingImage}
            onClick={() => imageInputRef.current?.click()}
          />
          <TBtn
            icon={FaFileUpload}
            title="Upload file (PDF, Word, etc.)"
            uploading={uploadingFile}
            disabled={uploadingFile}
            onClick={() => fileInputRef.current?.click()}
          />
        </div>
      </div>

      {/* Editor / Preview pane */}
      {preview && !splitPreview ? (
        /* Full preview mode */
        <div className="border border-t-0 border-gray-200 dark:border-gray-700 rounded-b-lg p-5 min-h-[240px] bg-white dark:bg-[#1a1a2e] overflow-auto">
          <FacilityGridLayout
            markdownText={currentValue || "*Nothing to preview yet…*"}
          />
        </div>
      ) : splitPreview ? (
        /* Split: editor left + live preview right */
        <div className="flex border border-t-0 border-gray-200 dark:border-gray-700 rounded-b-lg overflow-hidden" style={{ minHeight: "320px" }}>
          <div className="w-1/2 flex flex-col border-r border-gray-200 dark:border-gray-700">
            <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-700">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Markdown</span>
            </div>
            <textarea
              ref={textareaRef}
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 w-full p-4 font-mono text-sm outline-none resize-none bg-white dark:bg-[#1a1a2e] leading-relaxed"
              placeholder={placeholder}
              autoFocus
              spellCheck
            />
          </div>
          <div className="w-1/2 flex flex-col">
            <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-700">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Preview</span>
            </div>
            <div className="flex-1 p-5 overflow-auto bg-white dark:bg-[#1a1a2e]">
              <FacilityGridLayout
                markdownText={currentValue || "*Nothing to preview yet…*"}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Editor only mode */
        <textarea
          ref={textareaRef}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border border-t-0 border-gray-200 dark:border-gray-700 rounded-b-lg p-4 min-h-[260px] font-mono text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 resize-y bg-white dark:bg-[#1a1a2e] leading-relaxed"
          placeholder={`${placeholder}\n\nMarkdown supported:\n**bold**   _italic_   ## Heading\n- bullet list\n1. numbered list\n\n| Col 1 | Col 2 |\n|-------|-------|\n| A     | B     |`}
          autoFocus
          spellCheck
        />
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 mt-2">
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-sm shadow-md transition-colors"
        >
          <FaCheck /> Save
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleCancel();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 font-semibold text-sm shadow-md transition-colors"
        >
          <FaTimes /> Cancel
        </button>
        {(uploadingImage || uploadingFile) && (
          <span className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1.5 ml-2">
            <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            Uploading…
          </span>
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;
