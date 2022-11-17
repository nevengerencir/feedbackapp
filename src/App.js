import { useState } from "react";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackData from "./data/FeedbackData";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      setFeedback(feedback.filter((element) => element.id !== id));
    }
  };
  const addFeedback = (element) => {
    if (window.confirm("Please confirm your decision")) {
      element.id = uuidv4();
      setFeedback([element, ...feedback]);
    }
  };
  return (
    <>
      <Header text="Feedback ui" />
      <div className="container">
        <FeedbackForm handleAdd={addFeedback} />
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={handleDelete} />
      </div>
    </>
  );
}
export default App;
