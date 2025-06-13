"use client";

import useReportStore from "@/stores/use-report-store";

const SampleReportAlt = () => {
  const blocks = useReportStore((s) => s.blocks);
  const summary = useReportStore((s) => s.summary);
  const setSummary = useReportStore((s) => s.setSummary);

  return (
    <div className="text-white space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {blocks.map((block) => {
          switch (block.type) {
            case "text":
              return (
                <section className="mb-4">
                  <label className="block text-gray-400 text-sm mb-1">
                    ✍️ Executive Summary
                  </label>
                  <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Write a short executive summary for this report..."
                    className="w-full p-3 rounded bg-gray-700 text-white resize-none"
                    rows={4}
                  />
                </section>
              );
            case "image":
              return (
                <section key={block.id} className="col-span-1">
                  <h3 className="text-xl font-semibold mb-1">
                    {block.data.title}
                  </h3>
                  <div className="h-full bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-4xl">{block.data.emoji ?? "🖼️"}</span>
                  </div>
                </section>
              );
            default:
              return null;
          }
        })}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {blocks.map((block) => {
          switch (block.type) {
            case "table":
              return (
                <section key={block.id} className="col-span-1">
                  <h3 className="text-xl font-semibold mb-1">
                    {block.data.title}
                  </h3>
                  <table className="w-full text-sm border-collapse border border-gray-600">
                    <thead>
                      <tr className="bg-gray-700">
                        {block.data.columns.map((col) => (
                          <th key={col} className="border border-gray-600 p-2">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.data.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {block.data.columns.map((col) => (
                            <td
                              key={col}
                              className="border border-gray-600 p-2"
                            >
                              {row[col]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              );
            case "graph":
              return (
                <section key={block.id} className="col-span-1">
                  <h3 className="text-xl font-semibold mb-1">
                    {block.data.title}
                  </h3>
                  <div className="bg-gray-800 p-4 rounded">
                    <svg
                      viewBox="0 0 100 50"
                      className="w-full h-32 text-green-400 stroke-current fill-none"
                    >
                      <polyline points={block.data.points} strokeWidth="2" />
                    </svg>
                    <div className="text-sm text-gray-300 mt-2 flex justify-between">
                      {block.data.labels.map((label) => (
                        <span key={label}>{label}</span>
                      ))}
                    </div>
                  </div>
                </section>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export { SampleReportAlt };
