import { Header } from "components/commons";
import withTitle from "utils/withTitle";

import List from "./List";
import Search from "./Search";
import ViewHistory from "./ViewHistory";

const Movies = () => (
  <div className="flex h-screen flex-col">
    <Header />
    <main className="bg-background grid flex-1 overflow-hidden md:grid-cols-3 lg:grid-cols-4">
      <div className="flex flex-col space-y-4 overflow-y-auto p-4 md:col-span-2 lg:col-span-3">
        <Search />
        <List />
      </div>
      <ViewHistory />
    </main>
  </div>
);

export default withTitle(Movies, "title.movies");
