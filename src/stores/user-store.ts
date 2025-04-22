import { create } from "zustand";

type userType = {
  userId: string | null;
};

type userStoreType = {
  user: userType;
  setUser: (user: userType) => void;
};

export const useUserStore = create<userStoreType>((set) => ({
  user: { userId: null },
  setUser: (user: userType) => set({ user }),
}));
