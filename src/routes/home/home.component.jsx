import { Outlet } from "react-router-dom";

import CategoryList from "../../components/category-list/category-list.component";

import { CATEGORIES } from "./categories";

const Home = () => {
  return (
    <div>
      <CategoryList categories={CATEGORIES} />
      <Outlet />
    </div>
  );
};

export default Home;
