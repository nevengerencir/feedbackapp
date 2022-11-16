import PropTypes from "prop-types";
function Button({ children, version, type, isDisabled }) {
  return (
    <button type={type} className={`btn btn-${version}`} disabled={isDisabled}>
      {children}
    </button>
  );
}
Button.propTypes = {
  children: PropTypes.node.isRequired,
  version: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
};
Button.defaultProps = {
  version: "secondary",
  type: "button",
  isDisabled: "false",
};
export default Button;
