import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
  google: 'soogle-sign-in',
  inverted: 'inverted',
};

const Button = ({ buttonType, children, ...props }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
