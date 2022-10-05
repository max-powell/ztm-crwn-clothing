import { Outlet } from "react-router-dom";

import Directory from "../../components/directory/directory.component";

import { CATEGORIES } from "./categories";

const Home = () => {
  return (
    <div>
      <Directory categories={CATEGORIES} />
      <Outlet />
    </div>
  );
};

export default Home;
