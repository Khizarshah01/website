import { FaExternalLinkAlt } from "react-icons/fa";

export const ViewDocumentButton = ({ href, label = "View" }) => {
  if (!href) {
    return <span className="text-xs text-gray-400">Not Available</span>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-ssgmce-blue text-white rounded-md hover:bg-ssgmce-dark-blue transition-colors text-xs font-medium"
    >
      {label}
      <FaExternalLinkAlt className="text-[10px]" />
    </a>
  );
};

const DocumentsTable = ({ columns, rows, emptyText = "No documents available." }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {rows.length === 0 ? (
        <div className="p-8 text-center text-gray-500">{emptyText}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 border-b">
                {columns.map((column) => (
                  <th
                    key={column.header}
                    className={`px-5 py-3 text-left font-semibold text-gray-800 ${column.headerClassName || ""}`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id || `${index}-${row.title || "row"}`} className="border-b hover:bg-gray-50">
                  {columns.map((column) => {
                    const content = column.render
                      ? column.render(row, index)
                      : row[column.key];
                    return (
                      <td
                        key={column.header}
                        className={`px-5 py-3 align-top text-gray-700 ${column.cellClassName || ""}`}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DocumentsTable;
