import { removeBy } from "neetocist";
import { append, pipe, uniqBy } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useNewsStore = create(
  persist(
    set => ({
      categories: [],
      sources: [],

      setCategories: categories => {
        set(state => {
          const updatedCategories = pipe(
            append(categories),
            uniqBy(category => category)
          )(state.categories);

          return { categories: updatedCategories };
        });
      },

      setSources: sources => {
        set(state => {
          const updatedSources = pipe(
            append(sources),
            uniqBy(source => source.id) // Assuming each source has a unique 'id'
          )(state.sources);

          return { sources: updatedSources };
        });
      },

      removeCategory: category => {
        set(state => ({
          categories: removeBy({ category }, state.categories),
        }));
      },

      removeSource: sourceId => {
        set(state => ({
          sources: removeBy({ id: sourceId }, state.sources),
        }));
      },

      clearAll: () => set({ categories: [], sources: [] }),
    }),
    {
      name: "news-preferences",
    }
  )
);

export default useNewsStore;
