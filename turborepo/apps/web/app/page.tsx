/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import useUserStore from "@/stores/use-user-store";
import { SampleReport } from "@/components/sample-reports/sample-report";
import { SampleReportAlt } from "@/components/sample-reports/sample-report-alt";
import useReportStore from "@/stores/use-report-store";
import { v4 as uuidv4 } from "uuid";
import type {
  ITextBlock,
  IImageBlock,
  ITableBlock,
  IGraphBlock,
  ReportBlock,
} from "@/stores/use-report-store";
import { SelectedLayoutPreview } from "@/components/selected-layout-preview";

export default function Home() {
  const [sentiment, setSentiment] = useState<string | null>(null);

  // Zustand actions + state
  const newUser = useUserStore((s) => s.newUser);
  const setNewUser = useUserStore((s) => s.setNewUser);
  const [showSample, setShowSample] = useState(false);
  const setBlocks = useReportStore.getState().setBlocks;
  const blocks = useReportStore.getState().blocks;
  const [includedBlocks, setIncludedBlocks] = useState<Record<string, boolean>>(
    {
      text: true,
      image: true,
      table: true,
      graph: true,
    }
  );
  const [savedLayouts, setSavedLayouts] = useState<
    { id: number; name: string; created_at: string }[]
  >([]);

  const [selectedLayoutData, setSelectedLayoutData] = useState<
    ReportBlock[] | null
  >(null);
  const [selectedLayoutId, setSelectedLayoutId] = useState<number | null>(null);

  // const handleTestRoute = async () => {
  //   try {
  //     const res = await fetch("http://127.0.0.1:8000/test-route");
  //     const data = await res.json();
  //     console.log("API data:", data);
  //     setSentiment(data.message); // 👈 change this line
  //   } catch (error) {
  //     console.error("Error calling FastAPI:", error);
  //     setSentiment("error");
  //   }
  // };

  const handleAnalyzeClick = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/analyze-article");
      const data = await res.json();
      console.log("API data:", data);
      setSentiment(data.sentiment); // 👈 change this line
    } catch (error) {
      console.error("Error calling FastAPI:", error);
      setSentiment("error");
    }
  };

  const loadSampleLayout = () => {
    const blocks: ReportBlock[] = [];

    if (includedBlocks.text) {
      const textBlock: ITextBlock = {
        id: uuidv4(),
        type: "text",
        data: {
          title: "📰 Q3 Insights Summary",
          body: "This quarter highlighted emerging markets growth, alongside new partnerships with international firms and record-breaking NPS scores.",
        },
      };
      blocks.push(textBlock);
    }

    if (includedBlocks.image) {
      const imageBlock: IImageBlock = {
        id: uuidv4(),
        type: "image",
        data: {
          title: "📸 New Office Photo",
          emoji: "🏢",
        },
      };
      blocks.push(imageBlock);
    }

    if (includedBlocks.table) {
      const tableBlock: ITableBlock = {
        id: uuidv4(),
        type: "table",
        data: {
          title: "💼 Regional Metrics",
          columns: ["Region", "Clients", "Churn"],
          rows: [
            { Region: "North America", Clients: 1450, Churn: "3%" },
            { Region: "EMEA", Clients: 980, Churn: "4.5%" },
          ],
        },
      };
      blocks.push(tableBlock);
    }

    if (includedBlocks.graph) {
      const graphBlock: IGraphBlock = {
        id: uuidv4(),
        type: "graph",
        data: {
          title: "📊 Engagement Growth",
          points: "0,45 20,30 40,25 60,15 80,10 100,5",
          labels: ["Jan", "Mar", "May", "Jul", "Sep"],
        },
      };
      blocks.push(graphBlock);
    }

    // ✅ Now actually send the built layout to Zustand
    setBlocks(blocks);
  };
  const handleSaveLayout = async () => {
    const selectedCount = Object.values(includedBlocks).filter(Boolean).length;

    if (selectedCount === 0) {
      alert(
        "⚠️ Please select at least one block (Text, Image, Table, or Graph) before saving."
      );
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/layouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ layout: blocks }),
      });

      if (!res.ok) throw new Error("Save failed");

      const data = await res.json();
      console.log("✅ Layout saved:", data);
      alert("Layout saved successfully!");

      await fetchLayoutList(); // ✅ Refresh dropdown after saving
    } catch (err) {
      console.error("Error saving layout:", err);
      alert("Error saving layout");
    }
  };

  const fetchLayoutList = async () => {
    const res = await fetch("http://127.0.0.1:8000/layouts");
    const list = await res.json();
    console.log("Available Layouts:", list);
    setSavedLayouts(list); // populate the dropdown
  };
  useEffect(() => {
    console.log("sentiment", sentiment);
  }, [sentiment]);

  // 🔍 Monitor Zustand
  useEffect(() => {
    console.log("[zustand] newUser:", newUser);
  }, [newUser]);

  useEffect(() => {
    fetchLayoutList();
  }, []);
  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center">🧾 Report Builder</h1>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left Sidebar */}
        <aside className="col-span-3 bg-gray-800 rounded p-4 flex flex-col justify-between">
          <div>
            <div>
              <h2 className="text-xl font-semibold mb-3">🧱 Add Blocks</h2>
              <div className="space-y-2 text-sm mb-6">
                {["text", "image", "table", "graph"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center space-x-2 bg-gray-700 p-2 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="accent-purple-500"
                      checked={includedBlocks[type]}
                      onChange={(e) =>
                        setIncludedBlocks((prev) => ({
                          ...prev,
                          [type]: e.target.checked,
                        }))
                      }
                    />
                    <span>
                      {
                        {
                          text: "📝 Text Block",
                          image: "🖼️ Image",
                          table: "📊 Table",
                          graph: "📈 Graph",
                        }[type as keyof typeof includedBlocks]
                      }
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-3">📂 My Layouts</h2>
            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1">
                🧾 Load Saved Layout
              </label>
              <select
                onChange={async (e) => {
                  const id = parseInt(e.target.value);
                  if (!id) return;

                  const res = await fetch(
                    `http://127.0.0.1:8000/layouts/${id}`
                  );
                  const data = await res.json();

                  if (data?.layout) {
                    setSelectedLayoutData(data.layout);
                    setSelectedLayoutId(id);
                    setShowSample(false); // We'll preview it inside modal
                  }
                }}
                className="w-full bg-gray-700 text-white p-2 rounded"
                defaultValue=""
              >
                <option value="" disabled>
                  -- Select Layout --
                </option>
                {savedLayouts.map((layout) => (
                  <option key={layout.id} value={layout.id}>
                    {layout.name} (
                    {new Date(layout.created_at).toLocaleTimeString()})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">⚙️ Controls</h2>
            <button
              className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded mb-2"
              onClick={handleSaveLayout}
            >
              💾 Save Layout
            </button>
            <button
              className="w-full bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded"
              onClick={() => {
                loadSampleLayout();
                setShowSample(true);
              }}
            >
              🎲 Populate with Sample Data
            </button>
            {sentiment && (
              <p className="mt-4 text-sm text-gray-300">
                Sentiment: <strong>{sentiment}</strong>
              </p>
            )}
          </div>
        </aside>

        {/* Canvas */}
        <section className="col-span-9 bg-gray-800 rounded p-4 min-h-[400px]">
          <h2 className="text-xl font-semibold mb-3">🧱 Report Layout</h2>

          {showSample ? (
            <SampleReportAlt />
          ) : (
            <div className="border border-dashed border-gray-600 p-6 text-gray-300 text-left space-y-3">
              <h3 className="text-xl font-semibold mb-2 text-white">
                🧠 Welcome to the Report Builder
              </h3>
              <p>Here’s how to get started:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  ✅ Use the checkboxes on the left to{" "}
                  <strong>add blocks</strong> like text, images, tables, and
                  graphs.
                </li>
                <li>
                  💾 Click{" "}
                  <span className="font-semibold text-purple-300">
                    Save Layout
                  </span>{" "}
                  to store your custom report in the database.
                </li>
                <li>
                  📂 Load saved layouts anytime from the{" "}
                  <strong>dropdown</strong> in the sidebar.
                </li>
                <li>
                  🎲 Click{" "}
                  <span className="font-semibold text-yellow-300">
                    Populate with Sample Data
                  </span>{" "}
                  to try a pre-filled example.
                </li>
                <li>
                  🗑️ Click an entry in the dropdown to preview and optionally
                  delete it.
                </li>
              </ul>
              <p className="text-sm text-gray-400 mt-3">
                Built with Next.js + Zustand + FastAPI + SQLite. Designed for
                quick, intuitive reporting.
              </p>
            </div>
          )}
        </section>
      </div>
      {selectedLayoutData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded shadow-lg max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">📋 Layout Preview</h2>
            <div className="max-h-[500px] overflow-y-auto">
              <SelectedLayoutPreview blocks={selectedLayoutData} />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                onClick={async () => {
                  if (!selectedLayoutId) return;
                  await fetch(
                    `http://127.0.0.1:8000/layouts/${selectedLayoutId}`,
                    {
                      method: "DELETE",
                    }
                  );
                  alert("Layout deleted");
                  fetchLayoutList(); // refresh dropdown
                  setSelectedLayoutData(null);
                  setSelectedLayoutId(null);
                }}
              >
                🗑️ Delete
              </button>

              <button
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded"
                onClick={() => {
                  setSelectedLayoutData(null);
                  setSelectedLayoutId(null);
                }}
              >
                ✖ Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
