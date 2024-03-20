import { useRef, useEffect, useState } from "react";
import styles from "../pages/CreateCourse.module.css";

const StringList = ({ arrayValue, updateArrayList }) => {
  const [inputText, setInputText] = useState("");
  const [stringList, setStringList] = useState(arrayValue || []);

  useEffect(() => {
    updateArrayList(stringList);
  }, [stringList]);

  const handleInputChange = (event) => {
    const newText = event.target.value;
    setInputText(newText);
    updateStringList(newText);
  };

  const updateStringList = (newText) => {
    const lines = newText.split("\n").filter((line) => line.trim() !== "");
    setStringList(lines);
  };

  return (
    <div className={styles.StringListContainer}>
      <div className={styles.StringListContainerList}>
        <ul>
          {stringList.map((string, index) => (
            <li key={index}>{string}</li>
          ))}
        </ul>
      </div>

      <textarea
        value={inputText}
        onChange={handleInputChange}
        rows={5}
        cols={40}
        placeholder='Enter strings separated by new lines'
      />
    </div>
  );
};

export default StringList;
