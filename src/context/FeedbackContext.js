import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    fetchFeedback();
  }, []);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      setFeedback(feedback.filter((element) => element.id !== id));
    }
  };
  const fetchFeedback = async () => {
    const response = await fetch(
      "http://localhost:5000/feedback?_sort=id%order=desc"
    );
    const data = await response.json();
    setFeedback(data);
    setLoading(false);
  };
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((feedback) =>
        feedback.id === id ? { ...feedback, ...updItem } : feedback
      )
    );
  };

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };
  const addFeedback = (element) => {
    if (window.confirm("Please confirm your decision")) {
      element.id = uuidv4();
      setFeedback([element, ...feedback]);
    }
  };
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        handleDelete,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
        isLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
export default FeedbackContext;
