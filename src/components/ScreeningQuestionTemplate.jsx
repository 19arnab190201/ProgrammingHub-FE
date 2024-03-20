import React from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import styles from "../pages/CreateCourse.module.css";

const ScreeningQuestionTemplate = ({
  jobScreeningQuestions,
  setJobScreeningQuestions,
}) => {
  const handleAddQuestion = () => {
    setJobScreeningQuestions([
      ...jobScreeningQuestions,
      { question: "", answer: "" },
    ]);
  };

  const handleQuestionChange = (event, index) => {
    const updatedQuestions = [...jobScreeningQuestions];
    updatedQuestions[index].question = event.target.value;
    setJobScreeningQuestions(updatedQuestions);
  };

  const handleAnswerChange = (event, index) => {
    const updatedQuestions = [...jobScreeningQuestions];
    updatedQuestions[index].answer = event.target.value;
    setJobScreeningQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...jobScreeningQuestions];
    updatedQuestions.splice(index, 1);
    setJobScreeningQuestions(updatedQuestions);
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "280px",
          overflowY: "scroll",
        }}>
        <div className={styles.formColumn}>
          <label
            htmlFor='jobCategory'
            style={{
              fontSize: "16px",
            }}>
            Screening Questions
          </label>
        </div>
        {jobScreeningQuestions.map((questionObj, index) => (
          <div key={index} className={styles.questionContainer}>
            <div className={styles.question}>
              <label>Question {index + 1}</label>
              <input
                type='text'
                id={`question${index}`}
                placeholder={`Enter your question`}
                value={questionObj.question}
                onChange={(e) => handleQuestionChange(e, index)}
              />
            </div>
            <div className={styles.answer}>
              <label>Answer {index + 1}</label>
              <input
                type='text'
                id={`answer${index}`}
                placeholder={`Enter ideal answer`}
                value={questionObj.answer}
                onChange={(e) => handleAnswerChange(e, index)}
              />
            </div>
            <button
              className={styles.delete}
              onClick={() => handleRemoveQuestion(index)}>
              <RiDeleteBin7Line size={15} />
            </button>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
          marginBottom: "-30px",
        }}>
        <button className={styles.addButton} onClick={handleAddQuestion}>
          Add Question
        </button>
      </div>
    </div>
  );
};

export default ScreeningQuestionTemplate;
