import Header from "./Header";
import ListNews from "./List";

const News = () => (
  <div className="flex h-screen flex-col">
    <Header />
    <main className="bg-background flex flex-1 flex-col space-y-4 overflow-y-auto p-4 md:col-span-2 lg:col-span-3">
      <ListNews />
    </main>
  </div>
);

export default News;
