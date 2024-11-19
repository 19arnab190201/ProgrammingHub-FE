import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./CreateCourse.module.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Select from "react-select";
import skillOptions from "../constants/skillOptions.js";
import { AiOutlineDelete } from "react-icons/ai";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import StringList from "../components/StringList";
import ScreeningQuestionTemplate from "../components/ScreeningQuestionTemplate";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { RiDeleteBin2Line } from "react-icons/ri";
import { message } from "antd";
import bigCheck from "../assets/bigcheck.svg";
import { Button, Form, Input } from "antd";
import { FiEdit } from "react-icons/fi";
import { Modal, Checkbox } from "antd";

function DynamicForm({ data }) {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    console.log("data", data);
    if (data.length > 0) {
      setFields(data.map((item) => ({ value: item })));
    }
  }, [data]);

  console.log("fields", fields);
  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  return (
    <div>
      {fields.map((field, idx) => {
        return (
          <div
            key={`${field}-${idx}`}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}>
            <input
              style={{
                marginBottom: "10px",
                borderRadius: "12px",
                border: "none",
                background: "#282a2c",
                color: "#fff",
                fontFeatureSettings: "'clig' off, 'liga' off",
                fontFamily: "Poppins",
                fontSize: "13px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "100%",
                letterSpacing: "0.16px",
                padding: "12px",
                width: "90%",
              }}
              type='text'
              placeholder='Enter text'
              value={field.value || ""}
              onChange={(e) => handleChange(idx, e)}
            />
            <div
              style={{
                marginTop: "-5px",
              }}>
              <RiDeleteBin2Line
                color='#fff'
                size={24}
                onClick={() => handleRemove(idx)}
              />
            </div>
          </div>
        );
      })}

      <button
        type='button'
        onClick={() => handleAdd()}
        style={{
          marginBottom: "10px",
          borderRadius: "12px",
          border: "1px solid #eff0f6",
          background: "transparent",
          color: "#fff",
          fontFeatureSettings: "'clig' off, 'liga' off",
          fontFamily: "Poppins",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "100%",
          letterSpacing: "0.16px",
          padding: "16px 12px",
          width: "90%",
        }}>
        Add Field
      </button>
    </div>
  );
}

const MultiStepForm = ({ totalSteps = 4 }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [keyResponsibilities, setKeyResponsibilities] = useState([]);
  const [adminPrompt, setAdminPrompt] = useState("");
  const [courseData, setCourseData] = useState({
    courseTitle: "",
    courseSubtitle: "",
    courseDescription: "",
    courseDuration: "",
    courseOutcome: [],
    courseBenefits: [],
    courseRequirements: [],
    courseLanguages: [],

    // courseTitle: "React JS and Redux For Beginners",
    // courseSubtitle: "Learn the basics of React JS and Redux",
    // courseDescription:
    //   "This course will introduce you to the fundamentals of React JS and Redux, two popular JavaScript libraries for building user interfaces and managing application state.",
    // courseOutcome: [
    //   "Understand the core concepts of React JS and Redux",
    //   "Build interactive web applications using React components",
    //   "Manage application state effectively with Redux",
    //   "Implement best practices for React JS and Redux development",
    // ],
    // courseBenefits: [
    //   "Enhance your front-end development skills",
    //   "Gain hands-on experience with React JS and Redux",
    //   "Boost your career opportunities as a web developer",
    // ],
    // courseRequirements: [
    //   "Basic knowledge of HTML, CSS, and JavaScript",
    //   "Access to a computer with internet connection",
    //   "Desire to learn and explore new technologies",
    // ],
    // courseLanguages: ["English"],
    // courseContent: [
    //   {
    //     chapter: {
    //       name: "Introduction to React JS",
    //       subTopics: [
    //         {
    //           name: "What is React JS?",
    //           content:
    //             "React JS is a JavaScript library for building user interfaces. It allows developers to create reusable UI components that can be rendered dynamically based on data changes. React uses a virtual DOM to efficiently update the UI without reloading the entire page.",
    //         },
    //         {
    //           name: "Setting up React Environment",
    //           content:
    //             "To start developing with React JS, you need to set up the development environment. This includes installing Node.js, npm, and create-react-app tool. Once the environment is set up, you can create a new React project and start building your application.",
    //         },
    //       ],
    //       quiz: {
    //         questions: [
    //           "What is React JS?",
    //           "How to set up React environment?",
    //         ],
    //       },
    //     },
    //   },
    //   {
    //     chapter: {
    //       name: "State and Props in React",
    //       subTopics: [
    //         {
    //           name: "Understanding State in React",
    //           content:
    //             "State is a built-in feature in React that allows components to have their own internal state data. State can be updated using the setState method, and when the state changes, React automatically re-renders the component.",
    //         },
    //         {
    //           name: "Passing Props in React",
    //           content:
    //             "Props are used to pass data from parent components to child components in React. Props are read-only and cannot be modified by the child components. By passing props, you can create reusable and dynamic components.",
    //         },
    //       ],
    //       quiz: {
    //         questions: [
    //           "What is State in React?",
    //           "How to pass Props in React?",
    //         ],
    //       },
    //     },
    //   },
    //   {
    //     chapter: {
    //       name: "Redux Overview",
    //       subTopics: [
    //         {
    //           name: "What is Redux?",
    //           content:
    //             "Redux is a predictable state container for JavaScript apps. It helps manage the application state in a single immutable store. Redux follows the principles of unidirectional data flow and pure functions.",
    //         },
    //         {
    //           name: "Redux Concepts",
    //           content:
    //             "Redux introduces concepts like actions, reducers, and store to manage the state in an application. Actions are payloads of information that send data from the application to the store. Reducers specify how the application's state changes in response to actions.",
    //         },
    //       ],
    //       quiz: {
    //         questions: [
    //           "Explain Redux in your own words.",
    //           "What are the key concepts in Redux?",
    //         ],
    //       },
    //     },
    //   },
    //   {
    //     chapter: {
    //       name: "Redux Middleware and Thunk",
    //       subTopics: [
    //         {
    //           name: "Middleware in Redux",
    //           content:
    //             "Middleware in Redux provides a way to interact with actions that have been dispatched to the store before they reach the reducers. Middleware can be used for logging, crash reporting, asynchronous API calls, and more.",
    //         },
    //         {
    //           name: "Using Thunk in Redux",
    //           content:
    //             "Redux Thunk is a middleware that allows you to write action creators that return a function instead of an action object. Thunk is commonly used for handling asynchronous actions in Redux applications.",
    //         },
    //       ],
    //       quiz: {
    //         questions: [
    //           "What is Middleware in Redux?",
    //           "How to use Thunk in Redux?",
    //         ],
    //       },
    //     },
    //   },
    // ],
  });

  const [messageApi, contextHolder] = message.useMessage();
  const loadingLoader = () => {
    messageApi.open({
      type: "loading",
      content: "Content is being generated...",
      duration: 0,
    });
  };

  const { id } = useParams();

  const fetchCourse = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/course/${id}`
      );
      const data = response.data;
      console.log("Data", data.data);
      setCourseData(data.data);
      nextStep();
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    console.log("id", id);
    if (id) {
      fetchCourse(id);
    }
  }, [id]);

  const [editSubtopicData, setEditSubtopicData] = useState({
    chapterIndex: null,
    subtopicIndex: null,
    subtopicData: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    console.log("showModal");
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const updateCourse = async () => {
    console.log("updateCourse");
    console.log(courseData);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/course/${id}`,
        {
          ...courseData,
        }
      );
      console.log("response", response);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const createCourse = async () => {
    console.log("createCourse");
    console.log(courseData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-course`,
        {
          ...courseData,
        }
      );
      console.log("response", response);
      messageApi.destroy();
      messageApi.success("Course created successfully");

      setTimeout(() => {
        navigate("/course");
      }, 2000);
    } catch (error) {
      console.error("Error creating course:", error);
      messageApi.destroy();
      messageApi.error("Error creating course");
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "#282a2c",
      color: "#fff",
      border: "none",
      borderRadius: "12px",
      width: "50%",
      height: "50%",
    },
  };
  const addChapter = () => {
    console.log("addChapter");
    const newChapter = {
      name: `Chapter ${courseData.courseContent.length + 1}`,
      subTopics: [
        {
          name: "Subtopic 1",
          content: "Content for subtopic 1",
        },
        {
          name: "Subtopic 2",
          content: "Content for subtopic 2",
        },
      ],
      quiz: {
        name: "Quiz 1",
        questions: [
          {
            question: "Question 1",
            options: [
              {
                option: "Option 1",
                isCorrect: false,
              },
              {
                option: "Option 2",
                isCorrect: false,
              },
            ],
          },
          {
            question: "Question 2",
            options: [
              {
                option: "Option 1",
                isCorrect: false,
              },
              {
                option: "Option 2",
                isCorrect: false,
              },
            ],
          },
        ],
      },
    };
    setCourseData({
      ...courseData,
      courseContent: [...courseData.courseContent, { chapter: newChapter }],
    });
  };

  const deleteChapter = (index) => {
    console.log("deleteChapter", index);
    const updatedChapters = courseData.courseContent.filter(
      (chapter, i) => i !== index
    );
    setCourseData({
      ...courseData,
      courseContent: updatedChapters,
    });
  };

  const removeSubtopic = (chapterIndex, subtopicIndex) => {
    setCourseData({
      ...courseData,
      courseContent: courseData.courseContent.map((chapter, index) => {
        if (index === chapterIndex) {
          return {
            ...chapter,
            chapter: {
              ...chapter.chapter,
              subTopics: chapter.chapter.subTopics.filter(
                (subtopic, subIndex) => subIndex !== subtopicIndex
              ),
            },
          };
        }
        return chapter;
      }),
    });
  };

  useEffect(() => {
    console.log("courseData", courseData);
  }, [courseData]);

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const ChapterCard = ({ chapter_data, index }) => {
    const [chapterData, setChapterData] = useState(chapter_data);
    const [expanded, setExpanded] = useState(false);

    const toggleAccordion = () => {
      setExpanded(!expanded);
    };
    console.log("chapterData", chapterData);

    const styles = {
      chapterCardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#282a2c",
        borderRadius: "12px",
        marginBottom: "18px",
      },
      chapterCardTitle: {
        color: "#fff",
        fontSize: "20px",
        fontWeight: "600",
      },
      deleteIcon: {
        // CSS properties for the delete icon
      },
      chapterCardBody: {
        marginRight: "-28px !important",
      },
    };
    return (
      <div style={styles.chapterCardContainer}>
        <Modal
          title='Edit Subtopic'
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}>
          <h2>
            {editSubtopicData.chapterIndex} - {editSubtopicData.subtopicIndex}
          </h2>
        </Modal>
        <div style={styles.chapterCardHeader} onClick={toggleAccordion}>
          <h3 style={styles.chapterCardTitle}>
            {index + 1}. {chapterData.name}
          </h3>
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}>
            <FiEdit size={19} color='#fff' />
            <AiOutlineDelete
              size={20}
              color='#fff'
              style={styles.deleteIcon}
              onClick={() => {
                console.log("delete chapter");
                deleteChapter(index);
              }}
            />
          </div>
        </div>
        {expanded && (
          <div style={styles.chapterCardBody}>
            {chapterData.subTopics.map((subtopic, subIndex) => (
              <div
                key={subIndex}
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  color: "#fff",
                  backgroundColor: "#282A2C",
                  paddingLeft: "12px",
                  marginLeft: "28px !important",
                  margin: "14px 0",
                  borderRadius: "6px",
                }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingRight: "20px",
                  }}>
                  <h3
                    style={{
                      marginBottom: "6px",
                      fontSize: "18px",
                    }}>
                    {subtopic.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}>
                    <FiEdit
                      size={19}
                      color='#fff'
                      onClick={() => {
                        console.log("edit subtopic");
                        setEditSubtopicData({
                          chapterIndex: index,
                          subtopicIndex: subIndex,
                          subtopicData: subtopic,
                        });
                        showModal();
                      }}
                    />
                    <AiOutlineDelete
                      onClick={() => removeSubtopic(index, subIndex)}
                      size={20}
                      color='#fff'
                      style={styles.deleteIcon}
                    />
                  </div>
                </div>

                <p
                  style={{
                    marginBottom: "6px",
                    fontSize: "16px",
                    paddingRight: "15px",
                  }}>
                  {subtopic.content}
                </p>
              </div>
            ))}

            {/* QUIZ */}
            {console.log("chapterData.quiz", chapterData.quiz)}
            <div
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                color: "#fff",
                backgroundColor: "#282A2C",
                paddingLeft: "12px",
                marginLeft: "28px !important",
                margin: "14px 0",
                borderRadius: "6px",
              }}>
              <h2
                style={{
                  marginBottom: "6px",
                }}>
                {chapterData.quiz.name}
              </h2>
              <div>
                {chapterData.quiz.questions.map((quiz, subIndex) => (
                  <div
                    style={{
                      marginLeft: "20px",
                    }}>
                    <h3>
                      {subIndex + 1 + ". "} {quiz.question}
                    </h3>

                    {/* OPTIONS */}
                    <div
                      style={{
                        display: "flex",
                        padding: "10px",
                        gap: "10px",
                        marginLeft: "20px",
                      }}>
                      {quiz.options.map((option, index) => (
                        <div
                          style={{
                            display: "flex",
                            width: "40%",
                            gap: "10px",
                          }}>
                          <Checkbox
                            style={{
                              color: "#fff",
                            }}
                            checked={option.isCorrect == "true" ? true : false}
                          />
                          <p
                            style={{
                              fontSize: "16px",
                            }}>
                            {option.option}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <br />
          </div>
        )}
      </div>
    );
  };
  const generateCourseData = async () => {
    loadingLoader();
    const outcomes = courseData.courseOutcome.join(" ");
    const benefits = courseData.courseBenefits.join(" ");
    const requirements = courseData.courseRequirements.join(" ");
    const basicSchemaData = `
    const mongoose = require("mongoose");
    const courseSchema = new mongoose.Schema({
      courseTitle: String,
      courseImage: String,
      courseSubtitle: String,
      courseDuration: String,
      courseDescription: String,
      courseOutcome: [
        {
          type: String,
        },
      ],
      courseBenefits: [
        {
          type: String,
        },
      ],
      courseRequirements: [
        {
          type: String,
        },
      ],
      courseLanguages:[
        {
            type: String,  // English, Spanish, French, etc
        }
      ],
      salaryRange: {
        min: {
          type: Number,
        },
        max: {
          type: Number,
        },
      },
      coursePrice: Number,
    });
    
    module.exports = mongoose.model("Course", courseSchema);
    
    THE ANSWER SHOULD BE IN JSON FORMAT BASED ON ABOVE SCHEMA NOTHING SHOULD BE CHANGED 
    IN THE SCHEMA AND NOTHING SHOULD BE ADDED EXTRA INSTEAD OF ABOVE SCHEMA
    ALSO THE OUTPUT SHOULD CONTAIN THE SUGGESTED DATA FOR THE COURSE IN JSON FORMAT
    `;
    const chapterSchemaData = `
const quizSchema = new mongoose.Schema({
  name: String,
  questions: [
    {
      question: String,
      options: [
        {
          option: String,
          isCorrect: Boolean,
        },
      ],
    },
  ],
  chapterId: mongoose.Schema.Types.ObjectId,
});

    const subTopicSchema = new mongoose.Schema({
        name: String,
        content: String,
        chapterId: mongoose.Schema.Types.ObjectId,
      });
      
      const chapterSchema = new mongoose.Schema({
        name: String,
        subTopics: [subTopicSchema],
        quiz: quizSchema,
        courseId: mongoose.Schema.Types.ObjectId,
      });
      
      const courseSchema = new mongoose.Schema({
       
        courseContent: [
          {
            chapter: chapterSchema,
          },
        ],
       
      });
      
    
    THE ANSWER SHOULD BE IN JSON FORMAT BASED ON ABOVE SCHEMA NOTHING SHOULD BE CHANGED 
    IN THE SCHEMA AND NOTHING SHOULD BE ADDED EXTRA INSTEAD OF ABOVE SCHEMA
    ALSO THE OUTPUT SHOULD CONTAIN THE SUGGESTED DATA FOR THE CHAPTERS IN JSON FORMAT
    THE MINIMUM NUMBER OF CHAPTERS SHOULD BE 4 AND MAXIMUM SHOULD BE 10 and Each Chapters should have atlease 2 SUBMODULES
     inside eODULach SUBME there should be a content which should be minimum of 150 words each
     DO NOT PROVIDE DUMMY DATA ALWAYS PROVIDE DATA WHICH IS COMPLETELY RELATED TO THE COURSE ASKED IN THE PROMPT
    `;

    const request1 = axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: adminPrompt + " " + basicSchemaData },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      }
    );

    const request2 = axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `${adminPrompt} Outcomes: ${outcomes} Benefits: ${benefits} Requirements: ${requirements} ${chapterSchemaData}`,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      }
    );

    try {
      const [response1, response2] = await Promise.all([request1, request2]);

      const basicData = JSON.parse(response1.data.choices[0].message.content);
      const chapterData = JSON.parse(response2.data.choices[0].message.content);

      console.log("basicData", basicData);
      console.log("chapterData", chapterData);

      //Update courseData with the generated content

      setCourseData({
        ...courseData,

        courseTitle: basicData.courseTitle,
        courseSubtitle: basicData.courseSubtitle,
        courseDescription: basicData.courseDescription,
        courseDuration: basicData.courseDuration,
        courseOutcome: basicData.courseOutcome,
        courseBenefits: basicData.courseBenefits,
        courseRequirements: basicData.courseRequirements,
        courseLanguages: basicData.courseLanguages,

        courseContent: chapterData.courseContent,
      });
      messageApi.destroy();
      nextStep();

      // process response1 and response2...
    } catch (error) {
      console.error("Error generating content:", error);
      messageApi.destroy();
      messageApi.error("Error generating content");
    }
  };

  const StepNavigation = () => {
    if (step == 1) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
            padding: "20px 0px",
          }}>
          <div className={styles.btnContainer}>
            <button
              onClick={prevStep}
              className={styles.btnOutline}
              style={{
                visibility: "hidden",
              }}>
              Previous
            </button>
          </div>
          <div className={styles.btnContainer}>
            <button
              onClick={generateCourseData}
              style={{
                color: "#000",
                cursor: "pointer",
              }}>
              Generate Content
            </button>
          </div>
        </div>
      );
    }

    if (step <= 3) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
            padding: "20px",
          }}>
          <div className={styles.btnContainer}>
            <button
              onClick={prevStep}
              className={styles.btnOutline}
              style={{
                color: "#fff",
              }}>
              Previous
            </button>
          </div>
          <div className={styles.btnContainer}>
            {step === 3 ? (
              <>
                {id ? (
                  <button className={styles.btn} onClick={() => updateCourse()}>
                    Update Course
                  </button>
                ) : (
                  <button
                    className={styles.btn}
                    onClick={() => createCourse()}
                    style={{
                      color: "#000",
                    }}>
                    Create Course
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={nextStep}
                style={{
                  color: "#000",
                }}>
                Next
              </button>
            )}
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const renderFormForStep = () => {
    switch (step) {
      case 2:
        return (
          <div className={styles.formGroup}>
            <div className={styles.formRow}>
              <div className={styles.formColumn}>
                <label htmlFor='jobTitle'>Course Title</label>
                <input
                  type='text'
                  placeholder='Enter Course Ttile'
                  value={courseData.courseTitle}
                  onChange={(e) =>
                    setCourseData({
                      ...courseData,
                      courseTitle: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formColumn}>
                <label>Subtitle</label>

                <input
                  type='text'
                  placeholder='Enter Course Subtitle'
                  value={courseData.courseSubtitle}
                  onChange={(e) =>
                    setCourseData({
                      ...courseData,
                      courseSubtitle: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className={styles.formColumn}>
              <label htmlFor='Description'>Description</label>
              <textarea
                className={styles.textArea}
                id='Description'
                placeholder='Enter Course Description'
                value={courseData.courseDescription}
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    courseDescription: e.target.value,
                  })
                }
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formColumn}>
                <label htmlFor='jobType'>Outcomes</label>
                <DynamicForm
                  data={
                    courseData.courseOutcome?.length > 0
                      ? courseData.courseOutcome
                      : []
                  }
                />
              </div>
              <div className={styles.formColumn}>
                <label htmlFor='jobType'>Benefits</label>
                <DynamicForm
                  data={
                    courseData.courseBenefits?.length > 0
                      ? courseData.courseBenefits
                      : []
                  }
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formColumn}>
                <label htmlFor='jobType'>Requirements</label>
                <DynamicForm
                  data={
                    courseData.courseRequirements?.length > 0
                      ? courseData.courseRequirements
                      : []
                  }
                />
              </div>
              <div className={styles.formColumn}>
                <label htmlFor='jobType'>Languages</label>
                <DynamicForm
                  data={
                    courseData.courseLanguages?.length > 0
                      ? courseData.courseLanguages
                      : []
                  }
                />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className={styles.formGroup}>
            <div className={styles.formRow}>
              <div className={styles.formColumn}>
                <label
                  style={{
                    fontSize: "22px",
                    padding: "14px 0",
                  }}>
                  Course Creation Wizard
                </label>
                <textarea
                  className={styles.textArea}
                  style={{
                    height: "220px",
                  }}
                  id='Description'
                  placeholder='Enter Prompt For Course Creation'
                  onChange={(e) => setAdminPrompt(e.target.value)}></textarea>

                <br />
                <div>
                  <p
                    onClick={() => setStep(2)}
                    style={{
                      color: "#fff",
                      fontSize: "14px",
                      textAlign: "right",
                      cursor: "pointer",
                      textDecoration: "underline",
                      marginBottom: "20px",
                      marginTop: "20px",
                    }}>
                    Skip AI Generation
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={styles.formGroup}>
            <div className={styles.formRow}>
              <div className={styles.formColumn}>
                <h1
                  style={{
                    fontSize: "28px",
                    color: "#fff",
                    padding: "14px 0",
                    margin: "0px 120px",
                  }}>
                  Create Chapters
                </h1>
                <div>
                  {courseData &&
                    courseData.courseContent &&
                    courseData.courseContent.map((chap, index) => {
                      console.log("chap", chap);
                      return (
                        <>
                          <ChapterCard
                            key={index}
                            index={index}
                            chapter_data={chap.chapter}
                          />
                        </>
                      );
                    })}
                  <button
                    style={{
                      width: "60%",
                      borderRadius: "12px",
                      border: "none",
                      background: "#282a2c",
                      color: "#fff",
                      border: "2px solid #eff0f6",
                      padding: "16px",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: "pointer",
                      margin: "0px 20%",
                    }}
                    onClick={addChapter}>
                    Add Chapter
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className={styles.jobResults}>
            <img src={bigCheck} alt='' />
            <h2>Course {id ? "Updated" : "Created"} Successfully</h2>
            <p>
              Your course has been {id ? "updated" : "created"} successfully.
              You can view your course in your dashboard.
            </p>
            <button
              className={styles.viewButton}
              onClick={() => navigate("/company/dashboard")}>
              Go to Dashboard
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.postPageContainer}>
      {contextHolder}
      <div className={styles.jobPostContainer}>
        <div className={styles.progressHeader} style={{ width: "50vw" }}>
          {/* STEP 1 */}
          <div className={styles.activeStep}>1</div>
          <div
            style={{
              width: "10%",
              height: "6px",
              backgroundColor: "#EFF0F6",
              borderRadius: "40px",
            }}>
            <div
              className={
                step === 1
                  ? styles.progressBarHalf
                  : step > 1
                  ? styles.progressBarComplete
                  : ""
              }></div>
          </div>

          {/* STEP 2 */}
          <div className={step >= 2 ? styles.activeStep : styles.step}>2</div>
          <div
            style={{
              width: "10%",
              height: "6px",
              backgroundColor: "#EFF0F6",
              borderRadius: "40px",
            }}>
            <div
              className={
                step === 2
                  ? styles.progressBarHalf
                  : step > 2
                  ? styles.progressBarComplete
                  : ""
              }></div>
          </div>

          {/* STEP 3 */}
          <div className={step >= 3 ? styles.activeStep : styles.step}>3</div>
          <div
            style={{
              width: "10%",
              height: "6px",
              backgroundColor: "#EFF0F6",
              borderRadius: "40px",
            }}>
            <div
              className={
                step === 3
                  ? styles.progressBarHalf
                  : step > 3
                  ? styles.progressBarComplete
                  : ""
              }></div>
          </div>

          {/* STEP 4 */}
          <div className={step >= 4 ? styles.activeStep : styles.step}>4</div>
        </div>
        <div className={styles.jobPostFormContainer}>
          <div className={styles.formContainer}>{renderFormForStep()}</div>
        </div>
      </div>
      {StepNavigation()}
    </div>
  );
};

const CreateCourse = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100px",
        }}>
        <h1
          style={{
            fontSize: "34px",
            fontWeight: "600",
            color: "#fff",
            marginTop: -30,
            marginLeft: 70,
          }}>
          Create New Course
        </h1>
      </div>
      <div>
        <MultiStepForm />
      </div>
    </div>
  );
};

export default CreateCourse;
