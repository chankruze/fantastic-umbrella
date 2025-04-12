import { removeBy } from "neetocist";
import { append, pipe, uniqBy } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useViewHistoryStore = create(
  persist(
    (set, get) => ({
      history: [],
      lastSelected: null,

      addToHistory: item => {
        set(state => {
          const updatedHistory = pipe(
            append(item),
            uniqBy(movie => movie.imdbID)
          )(state.history);

          return {
            history: updatedHistory,
            lastSelected: item,
          };
        });
      },

      removeFromHistory: imdbID => {
        set(state => ({
          history: removeBy({ imdbID }, state.history),
          lastSelected:
            get().lastSelected?.imdbID === imdbID ? null : get().lastSelected,
        }));
      },

      clearHistory: () => set({ history: [], lastSelected: null }),
    }),
    {
      name: "view-history",
    }
  )
);

export default useViewHistoryStore;
