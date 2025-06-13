import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface INewUser {
  id: string;
  name: string | null;
  image: string | null;
}

interface IUserStore {
  // Update newUser state to match the returned user object
  newUser: INewUser | null;
  setNewUser: (user: INewUser) => void;
}

const useUserStore = create<IUserStore>()(
  devtools(
    persist(
      immer((set) => ({
        connectedUserInfo: { userId: null, roomId: null },

        newUser: null,
        setNewUser: (user) => {
          set({ newUser: user });
        },
      })),
      {
        name: "user-store", // Storage key name
        partialize: (state) => ({
          newUser: state.newUser,
        }),
      }
    ),
    { name: "UserStore" }
  )
);

export default useUserStore;
