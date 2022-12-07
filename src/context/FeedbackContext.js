import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    fetchFeedback();
  }, []);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      await fetch(`/api/v1/feedbacks/${id}`, {
        method: "DELETE",
      });
      setFeedback(feedback.filter((element) => element._id !== id));
    }
  };
  const fetchFeedback = async () => {
    const response = await fetch('/api/v1/feedbacks');
    const data = await response.json();
    console.log(data.data)
    setFeedback(data.data);
    setLoading(false);
  };
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/api/v1/feedbacks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updItem),
    });
    const json = await response.json();
    console.log(123)

    const data =  json.data
   
    setFeedback(
      feedback.map((feedback) =>
        feedback._id === id ? { ...feedback, ...data } : feedback
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
  const addFeedback = async (element) => {
    const res = await fetch("/api/v1/feedbacks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(element),
    });
    const data = await res.json();

    setFeedback([(data.data), ...feedback]);
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
