import CategoryItem from "../category-item/category-item.component";

import "./category-list.styles.scss";

const CategoryList = ({ categories }) => (
  <div className="categories-container">
    {categories.map((category) => (
      <CategoryItem category={category} key={category.id} />
    ))}
  </div>
);

export default CategoryList;
