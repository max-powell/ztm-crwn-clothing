import CategoryList from "./category-list/category-list.component";
import { CATEGORIES } from "./categories";

const App = () => {
  return <CategoryList categories={CATEGORIES} />;
};

export default App;
