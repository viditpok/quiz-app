import "./Feedback.scss";

const Feedback = () => {
  const handleClick = () => {
    window.location.href = "mailto:vidit@gatech.edu";
  };

  return <button id="feedback-button" onClick={handleClick}>Send Feedback</button>;
};

export default Feedback;
