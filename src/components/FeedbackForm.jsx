import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";
import { useState, useEffect, useReducer } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackReducer from "./context/FeedbackReducer";
function FeedbackForm() {
  const initState = {
    texty: "gsgs",
  };
  const [state, dispatch] = useReducer(FeedbackReducer, initState);

  const [text, setText] = useState("");
  const [rating, setRating] = useState(1);

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  const handleText = (e) => {
    if (text === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage("Text must be at least 10 characters");
    } else {
      setBtnDisabled(false);
      setMessage(null);
    }
    dispatch({
      type: "SET_VALUE",
      payload: e.target.value,
    });
    setText(e.target.value);
  };
  const select = (selected) => {
    setRating(selected);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };
      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item._id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }
    }
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={select} />
        <div className="input-group">
          <input
            type="text"
            placeholder="Write a review"
            onChange={handleText}
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message"> {message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
