import { Route, Routes } from 'react-router-dom';

import Authentication from './routes/sign-in/authentication.component';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';

const Shop = () => {
  return <h2>SHOP</h2>;
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
