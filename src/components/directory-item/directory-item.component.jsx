import { useNavigate } from 'react-router-dom';
import './directory-item.styles.jsx';
import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from './directory-item.styles.jsx';

const DirectoryItem = ({ category }) => {
  const { imageUrl, route, title } = category;

  const navigate = useNavigate();

  const onClickHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onClickHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
