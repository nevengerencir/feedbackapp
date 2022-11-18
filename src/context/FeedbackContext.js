import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: "1",
      rating: 10,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo soluta sapiente blanditiis, vitae amet quod voluptatibus laudantium impedit vel ullam recusandae, perspiciatis provident aspernatur aperiam maiores accusamus",
    },
    {
      id: "2",
      rating: 1,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo soluta sapiente blanditiis, vitae amet quod voluptatibus laudantium impedit vel ullam recusandae, perspiciatis provident aspernatur aperiam maiores accusamus",
    },
    {
      id: "3",
      rating: 2,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo soluta sapiente blanditiis, vitae amet quod voluptatibus laudantium impedit vel ullam recusandae, perspiciatis provident aspernatur aperiam maiores accusamus",
    },
  ]);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      setFeedback(feedback.filter((element) => element.id !== id));
    }
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
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
export default FeedbackContext;
