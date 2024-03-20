import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./CreateCourse.module.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Select from "react-select";
import skillOptions from "../constants/skillOptions.js";
import { AiOutlineDelete } from "react-icons/ai";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import StringList from "../components/StringList";
import ScreeningQuestionTemplate from "../components/ScreeningQuestionTemplate";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { RiDeleteBin2Line } from "react-icons/ri";

import bigCheck from "../assets/bigcheck.svg";
import { Button, Form, Input } from "antd";
import { FiEdit } from "react-icons/fi";

function DynamicForm({}) {
  const [fields, setFields] = useState([{ value: null }]);

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
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <input
              style={{
                marginBottom: "10px",
                borderRadius: "12px",
                border: "2px solid #eff0f6",
                background: "#fff",
                color: "#8897ad",
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
            <div>
              <RiDeleteBin2Line
                color='#fff'
                size={28}
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

const ChapterCard = () => {
  const chapter = {
    title: "Introduction to Java",
    subtopics: [
      "Java Basics",
      "Java OOP",
      "Java Collections",
      "Java Streams",
      "Java Concurrency",
      "Java Networking",
    ],
  };
  const [chapterData, setChapterData] = useState(chapter);

  console.log("chapterData", chapterData);

  <div style={styles.chapterCardContainer}>
    <div style={styles.chapterCardHeader}>
      <h3 style={styles.chapterCardTitle}>{chapterData.title}</h3>
      <AiOutlineDelete style={styles.deleteIcon} />
    </div>
    <div style={styles.chapterCardBody}>
      {chapterData.subtopics.map((subtopic) => {
        return (
          <div>
            <h3>{subtopic}</h3>
            <FiEdit />
          </div>
        );
      })}
    </div>
  </div>;
};

const MultiStepForm = ({ totalSteps = 6 }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [jobBenefits, setJobBenefits] = useState([]);
  const [keyResponsibilities, setKeyResponsibilities] = useState([]);
  const [location, setLocation] = useState("");
  const [jobScreeningQuestions, setJobScreeningQuestions] = useState([
    {
      question: "",
      answer: "",
    },
  ]);
  useEffect(() => {
    console.log("jobScreeningQuestions", jobScreeningQuestions);
  }, [jobScreeningQuestions]);

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleStepChange = (newStep) => {
    if (newStep >= 1 && newStep <= totalSteps) {
      setStep(newStep);
    }
  };

  function formatAmount(amount) {
    if (amount >= 1000) {
      const roundedAmount = Math.round(amount / 1000);
      return `${roundedAmount}K`;
    } else {
      return `${amount}`;
    }
  }

  const { jobId } = useParams();

  const [jobData, setJobData] = useState({
    jobTitle: "",
    jobLocation: "",
    jobType: "",
    jobDeadline: "",
    jobDescription: "",
    jobCategory: "",
    jobVacancies: 0,
    jobSalary: {
      min: 0,
      max: 1000000,
    },
    jobSkills: [],
    jobBenefits: [],
    keyResponsibilities: [],
    jobScreeningQuestions: [],
    // Add more fields as needed
  });

  useEffect(() => {
    console.log("jobData", jobData);
  }, [jobData]);

  useEffect(() => {
    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/job/${jobId}`
      );
      let loadedJobData = response.data.data;
      loadedJobData.jobSkills = loadedJobData.jobSkills.map((skill) => ({
        value: skill,
        label: skill,
      }));
      console.log("loadedJobData", loadedJobData);
      setJobData(loadedJobData);
      setJobBenefits(loadedJobData.jobBenefits);
      setKeyResponsibilities(loadedJobData.keyResponsibilities);
      setLocation(loadedJobData.jobLocation);
      setJobScreeningQuestions(loadedJobData.jobScreeningQuestions);
      console.log("Job details fetched successfully:", loadedJobData);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  const postJob = async () => {};

  const categoryList = [
    "IT",
    "FINANCE",
    "MARKETING",
    "SALES",
    "HR",
    "DESIGN",
    "OTHERS",
    "ANALYTICS",
    "ENGINEERING",
  ];

  const onFinish = (values) => {};

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
                  id='jobTitle'
                  placeholder='Enter Course Ttile'
                  value={jobData.jobTitle}
                  onChange={(e) =>
                    setJobData({ ...jobData, jobTitle: e.target.value })
                  }
                />
              </div>
              <div className={styles.formColumn}>
                <label htmlFor='jobLocation'>Subtitle</label>

                <input
                  type='text'
                  id='jobLocation'
                  placeholder='Enter Course Subtitle'
                  value={jobData.jobLocation}
                  onChange={(e) =>
                    setJobData({ ...jobData, jobLocation: e.target.value })
                  }
                />
              </div>
            </div>
            <div className={styles.formColumn}>
              <label htmlFor='jobDescription'>Description</label>
              <textarea
                className={styles.textArea}
                id='Description'
                placeholder='Enter Course Description'
                value={jobData.jobDescription}
                onChange={(e) =>
                  setJobData({ ...jobData, jobDescription: e.target.value })
                }
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formColumn}>
                <label htmlFor='jobType'>Outcomes</label>
                <DynamicForm />
              </div>
              <div className={styles.formColumn}>
                <label htmlFor='jobType'>Benefits</label>
                <DynamicForm />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formColumn}>
                <label htmlFor='jobType'>Requirements</label>
                <DynamicForm />
              </div>
              <div className={styles.formColumn}>
                <label htmlFor='jobType'>Languages</label>
                <DynamicForm />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className={styles.formGroup}>
            <div className={styles.formRow}>
              <div className={styles.formColumn}>
                <label htmlFor='jobDescription'>Course Creation Wizard</label>
                <textarea
                  className={styles.textArea}
                  style={{
                    height: "300px",
                  }}
                  id='Description'
                  placeholder='Enter Prompt For Course Creation'
                  value={jobData.jobDescription}
                  onChange={(e) =>
                    setJobData({ ...jobData, jobDescription: e.target.value })
                  }
                />
                <br />
                <div>
                  <p
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
                <label htmlFor='jobCategory'>Create Chapters</label>
              </div>
              <div>
                <ChapterCard />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className={styles.formGroup}>
            <div className={styles.formRow}>
              <div className={styles.formColumn}>
                <label htmlFor='jobCategory'>Key Responsibilities</label>
                {step === 4 && (
                  <StringList
                    key='step4StringList' // Add a key prop here
                    arrayValue={keyResponsibilities}
                    updateArrayList={setKeyResponsibilities}
                  />
                )}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <ScreeningQuestionTemplate
            jobScreeningQuestions={jobScreeningQuestions}
            setJobScreeningQuestions={setJobScreeningQuestions}
          />
        );
      case 6:
        return (
          <div className={styles.jobResults}>
            <img src={bigCheck} alt='' />
            <h2>Job {jobId ? "Updated" : "Created"} Successfully</h2>
            <p>
              Your job has been {jobId ? "updated" : "created"} successfully.
              You can view your job in your dashboard.
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

          <div
            style={{
              width: "10%",
              height: "6px",
              backgroundColor: "#EFF0F6",
              borderRadius: "40px",
            }}>
            <div
              className={
                step === 4
                  ? styles.progressBarHalf
                  : step > 4
                  ? styles.progressBarComplete
                  : ""
              }></div>
          </div>
          <div className={step >= 5 ? styles.activeStep : styles.step}>5</div>
        </div>
        <div className={styles.jobPostFormContainer}>
          <div className={styles.formContainer}>{renderFormForStep()}</div>
        </div>
      </div>
      {step <= 5 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            padding: "20px",
          }}>
          <div className={styles.btnContainer}>
            <button onClick={prevStep} className={styles.btnOutline}>
              Previous
            </button>
          </div>
          <div className={styles.btnContainer}>
            {step === 5 ? (
              <>
                {jobId ? (
                  <button className={styles.btn} onClick={() => postJob()}>
                    Update Job
                  </button>
                ) : (
                  <button className={styles.btn} onClick={() => postJob()}>
                    Post Job
                  </button>
                )}
              </>
            ) : (
              <button onClick={nextStep}>Next</button>
            )}
          </div>
        </div>
      ) : null}
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
            marginTop: -50,
            marginLeft: 10,
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
