import { create } from "zustand";

type StoreOrgBack = {
  backref: string;
  changeRef: (newref: string) => void;
};

export const useStoreOrgBack = create<StoreOrgBack>()((set) => ({
  backref: "/organization/transactions",
  changeRef: (newref) =>
    set({ backref: newref ? newref : "/organization/transactions" }),
}));
