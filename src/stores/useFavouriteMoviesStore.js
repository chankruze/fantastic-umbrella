import { removeBy } from "neetocist";
import { append, pipe, uniqBy } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavouriteMoviesStore = create(
  persist(
    set => ({
      favourites: [],

      addMovie: movie => {
        set(state => {
          const updatedFavourites = pipe(
            append(movie),
            uniqBy(movie => movie.imdbID)
          )(state.favourites);

          return { favourites: updatedFavourites };
        });
      },

      removeMovie: imdbID => {
        set(state => ({
          favourites: removeBy({ imdbID }, state.favourites),
        }));
      },
    }),
    {
      name: "favourite-movies",
    }
  )
);

export default useFavouriteMoviesStore;
