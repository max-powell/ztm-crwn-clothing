import { Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { CartContext } from '../../contexts/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.util';

import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';

import { userSelector } from '../../store/user/user.selector';

import './navigation.styles.scss';

const Navigation = () => {
  const { cartIsOpen } = useContext(CartContext);

  const currentUser = useSelector(userSelector);

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            Shop
          </Link>
          {currentUser ? (
            <span className='nav-link' onClick={signOutUser}>
              Sign Out
            </span>
          ) : (
            <Link className='nav-link' to='/auth'>
              Sign In
            </Link>
          )}
          <CartIcon />
        </div>
        {cartIsOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
