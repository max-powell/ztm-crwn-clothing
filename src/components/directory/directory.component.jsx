import DirectoryItem from '../directory-item/directory-item.component';

import { CATEGORIES } from './categories';

import { DirectoryContainer } from './directory.styles';

const Directory = () => {
  return (
    <DirectoryContainer>
      {CATEGORIES.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </DirectoryContainer>
  );
};

export default Directory;
