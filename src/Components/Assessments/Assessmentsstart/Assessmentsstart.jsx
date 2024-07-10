import React, { useState, useEffect } from 'react';
import './assessmentsstart.css';
import logoela from '../asset/brand-footer.png';
import questionData from './Questionsdata.json';
import { FaCheckCircle } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

//react-router
import { useNavigate } from "react-router-dom";

const Assessmentsstart = () => {

  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeft, setTimeLeft] = useState(23 * 60 + 46); // 23 minutes and 46 seconds
  const [selectedUser, setSelectedUser] = useState('Deivasigamani');
  const [selectedUserDropdown, setSelectedUserDropdown] = useState(1);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleBookmark = () => {
    setBookmarkedQuestions((prev) =>
      prev.includes(currentQuestionIndex)
        ? prev.filter((index) => index !== currentQuestionIndex)
        : [...prev, currentQuestionIndex]
    );
  };

  const handleNavigation = (direction) => {
    const currentSection = questionData.sections[currentSectionIndex];
    const currentSectionQuestions = currentSection.questions.slice(0, 20);

    if (direction === 'next' && currentQuestionIndex < currentSectionQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (direction === 'previous' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOptions({
      ...selectedOptions,
      [`${currentSectionIndex}-${currentQuestionIndex}`]: event.target.value,
    });
  };

  const handleSelectChangeone = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleSelectChange = (event) => {
    const selectedSectionIndex = parseInt(event.target.value) - 1;
    setSelectedUserDropdown(event.target.value);
    setCurrentSectionIndex(selectedSectionIndex);
    setCurrentQuestionIndex(0);
  };

  const handleFinishClick = () => {
    setTimeout(() => {
        navigate("/finish-assessment");
    }, 2000);
  };

  const handleNextSection = () => {
    if (currentSectionIndex < questionData.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return (
      <div className="time-row">
        <div className="time-item">
          <p className='para-one'>{hours.toString().padStart(2, '0')}</p>
          <p className='para-two'>Hours</p>
        </div>
        <div className="time-item">
          <p className='para-one'>{minutes.toString().padStart(2, '0')}</p>
          <p className='para-two'>Minutes</p>
        </div>
        <div className="time-item">
          <p className='para-one'>{remainingSeconds.toString().padStart(2, '0')}</p>
          <p className='para-two'>Seconds</p>
        </div>
      </div>
    );
  };

  const sections = questionData.sections;
  const currentSection = sections[currentSectionIndex];
  const currentSectionQuestions = currentSection.questions.slice(0, 20);
  const currentQuestion = currentSectionQuestions[currentQuestionIndex];

  const totalQuestions = currentSectionQuestions.length;
  const answeredCount = Object.keys(selectedOptions).length;
  const bookmarkedCount = bookmarkedQuestions.length;
  const notAnsweredCount = totalQuestions - answeredCount;

  const isCurrentSectionCompleted = currentSectionQuestions.every((_, index) =>
    selectedOptions.hasOwnProperty(`${currentSectionIndex}-${index}`)
  );

  return (
    <div className='assessment-head'>
      <div className='assessment-inside'>
        <div className='nav-content'>
          <div className='brand-logo'>
            <img src={logoela} alt="C-Suite Academy" height='40px' />
          </div>
          <select value={selectedUser} onChange={handleSelectChangeone}>
            <option value="Deivasigamani">Deivasigamani</option>
            <option value="OtherUser1">Profile</option>
            <option value="OtherUser2">Log Out</option>
          </select>
          <button className='button-finish' onClick={handleFinishClick}>Finish</button>
        </div>

        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-8 col-sm-12'>
              <main className="quiz-main">
                <div className='first-content'>
                  <p className='count-question'>
                    {(currentQuestionIndex + 1).toString().padStart(2, '0')}
                    <span>/</span>
                    {currentSectionQuestions.length}
                  </p>
                  <select className='change-selection' value={selectedUserDropdown} onChange={handleSelectChange}> {/* Use selectedUserDropdown state here */}
                    {sections.map((section, index) => (
                      <option key={index} value={index + 1}>{`Section - ${index + 1}`}</option>
                    ))}
                  </select>
                </div>

                <p className='question-style'>{currentQuestion.question}</p>

                <form>
                  {currentQuestion.options.map((option, index) => (
                    <div className="button-style-icons" key={index}>
                      <label>
                        <input
                          type="radio"
                          value={option}
                          checked={selectedOptions[`${currentSectionIndex}-${currentQuestionIndex}`] === option}
                          onChange={handleOptionChange}
                        />
                        <FaCheckCircle className="icon-style" size='1.8rem' />
                        {` ${String.fromCharCode(65 + index)}. ${option}`}
                      </label>
                    </div>
                  ))}
                </form>

                <div className="navigation-button">
                  <button className='button-previous' onClick={() => handleNavigation('previous')} disabled={currentQuestionIndex === 0}>
                    Previous
                  </button>
                  <button className='button-next' onClick={() => handleNavigation('next')} disabled={currentQuestionIndex === currentSectionQuestions.length - 1}>
                    Next
                  </button>
                  <button className='button-bookmark' onClick={handleBookmark}>Bookmark</button>
                </div>

                {isCurrentSectionCompleted && currentSectionIndex < sections.length - 1 && (
                  <div className="next-section-button">
                    <button className='button-next-section' onClick={handleNextSection}>Next Section</button>
                  </div>
                )}
              </main>
            </div>
            <div className='col-md-4 col-sm-12'>
              <div className='right-side-component'>
                <div className="timer">
                  {formatTime(timeLeft)}
                </div>
                <div className="questions">
                  <p>Questions</p>
                </div>
                <select className='change-selection-two' value={selectedUserDropdown} onChange={handleSelectChange}>
                  {sections.map((section, index) => (
                    <option key={index} value={index + 1}>{`Section ${index + 1}`}</option>
                  ))}
                </select>
                <div id='Test-marks-container'>
                  <div className="question-numbers">
                    {currentSectionQuestions.map((question, quesIndex) => (
                      <button
                        key={quesIndex}
                        className={`question-number ${
                          quesIndex === currentQuestionIndex ? 'active' : ''} 
                          ${selectedOptions[`${currentSectionIndex}-${quesIndex}`] ? 'answered' : ''} 
                          ${!selectedOptions[`${currentSectionIndex}-${quesIndex}`] && bookmarkedQuestions.includes(`${currentSectionIndex}-${quesIndex}`) ? 'bookmarked' : ''}`}
                        onClick={() => setCurrentQuestionIndex(quesIndex)}
                      >
                        {`${(quesIndex + 1).toString().padStart(2, '0')}`} <FontAwesomeIcon icon={faCheckCircle}  size='1rem'className='icon-check pl-4' />
                      </button>
                    ))}
                  </div>
                </div>

                <div className='test-checkup-field'>
                  <div id='answered-txt'>Answered<span>{answeredCount}/{totalQuestions}</span></div>
                  <div id='not-answered-txt'>Not Answered<span>{notAnsweredCount}/{totalQuestions}</span></div>
                  <div id='bookmarked-txt'>Bookmarked <span>{bookmarkedCount}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessmentsstart;

