import { create } from "zustand";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";

const createWindowUpdate = (state, windowKey, updates) => {
  const win = state.windows[windowKey];
  if (!win) return state;

  return {
    windows: {
      ...state.windows,
      [windowKey]: {
        ...win,
        ...updates,
      },
    },
    nextZIndex: state.nextZIndex + 1,
  };
};

const useWindowStore = create((set) => ({
    windows: structuredClone(WINDOW_CONFIG),
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) =>
      set((state) =>
        createWindowUpdate(state, windowKey, {
          isOpen: true,
          zIndex: state.nextZIndex,
          data: data ?? state.windows[windowKey]?.data,
        })
      ),

    closeWindow: (windowKey) =>
      set((state) =>
        createWindowUpdate(state, windowKey, {
          isOpen: false,
          zIndex: INITIAL_Z_INDEX,
          data: null,
        })
      ),

    focusWindow: (windowKey) =>
      set((state) =>
        createWindowUpdate(state, windowKey, {
          zIndex: state.nextZIndex,
        })
      ),
}));


export default useWindowStore;
