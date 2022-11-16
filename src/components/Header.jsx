// importing shortcuts I am using 'impt' - for PropTypes and 'rfce' - setting up a react component

import PropTypes from "prop-types";
function Header({ text, bgColor, textColor }) {
  return (
    <div className="container">
      <header
        style={{
          backgroundColor: bgColor,
          color: textColor,
        }}
      >
        <h2>{text}</h2>
      </header>
    </div>
  );
}
Header.defaultProps = {
  text: "Header",
  bgColor: "rgb(0,0,0,0.4)",
  textColor: "#ff6a95",
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};
export default Header;
