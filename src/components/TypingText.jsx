import React, { useState, useEffect } from "react";

const TypingText = ({ words, typingSpeed = 150, deletingSpeed = 100 }) => {
  const [index, setIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index % words.length];
    const timer = setTimeout(
      () => {
        if (isDeleting) {
          currentText.length == 2
            ? setCurrentText(currentWord.substring(0, currentText.length - 2))
            : setCurrentText(currentWord.substring(0, currentText.length - 1));
        } else {
          currentText.length == 0
            ? setCurrentText(currentWord.substring(0, currentText.length + 2))
            : setCurrentText(currentWord.substring(0, currentText.length + 1));
        }

        if (!isDeleting && currentText === currentWord) {
          // Pause at the end of typing a word
          setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && currentText === "") {
          setIsDeleting(false);
          setIndex(index + 1);
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, index, words, typingSpeed, deletingSpeed]);

  return (
    <div className="typing-text">
      {currentText}
      <span className="cursor">|</span>
    </div>
  );
};

export default TypingText;
