import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

/** 🔹 Base block types */
type BlockType = "text" | "image" | "table" | "graph";

export interface IBaseBlock {
  id: string; // For drag/drop or updates
  type: BlockType;
  position?: string; // e.g., "top-left", "row-1", etc.
}

/** 🔤 Text Block */
export interface ITextBlock extends IBaseBlock {
  type: "text";
  data: {
    title: string;
    body: string;
  };
}

/** 🖼️ Image Block */
export interface IImageBlock extends IBaseBlock {
  type: "image";
  data: {
    title: string;
    emoji?: string;
  };
}

/** 📊 Table Block */
export interface ITableBlock extends IBaseBlock {
  type: "table";
  data: {
    title: string;
    columns: string[];
    rows: { [key: string]: string | number }[];
  };
}

/** 📈 Graph Block */
export interface IGraphBlock extends IBaseBlock {
  type: "graph";
  data: {
    title: string;
    points: string; // "0,45 20,30 40,25 ..."
    labels: string[];
  };
}

export type ReportBlock = ITextBlock | IImageBlock | ITableBlock | IGraphBlock;

/** 🧠 Zustand Layout Store */
interface IReportLayoutStore {
  blocks: ReportBlock[];
  setBlocks: (blocks: ReportBlock[]) => void;
  addBlock: (block: ReportBlock) => void;
  clearBlocks: () => void;
  summary: string;
  setSummary: (text: string) => void;
}

const useReportStore = create<IReportLayoutStore>()(
  devtools(
    persist(
      immer((set) => ({
        blocks: [],
        setBlocks: (blocks) => set({ blocks }),
        addBlock: (block) => set((state) => void state.blocks.push(block)),
        clearBlocks: () => set({ blocks: [] }),
        summary: "", // ✅ new
        setSummary: (text) => set({ summary: text }), // ✅ new
      })),
      {
        name: "report-layout", // 🗂️ LocalStorage key
        partialize: (state) => ({ blocks: state.blocks }),
      }
    ),
    { name: "ReportStore" }
  )
);

export default useReportStore;
