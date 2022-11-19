import ZWdx from "../assets/ZWdx.gif";
function Spinner() {
  return (
    <img
      src={ZWdx}
      alt="loading.."
      style={{
        width: "300px",
        margin: "auto",
        display: "block",
      }}
    />
  );
}
export default Spinner;
