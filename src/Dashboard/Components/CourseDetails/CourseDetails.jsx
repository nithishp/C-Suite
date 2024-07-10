import "./CourseDetails.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab, Accordion } from "react-bootstrap";
import courseContentDetailsData from "../Assets/Data/CourseContentDetails.json";
import CourseRecommendation from "../CourseRecomend/CourseRecommendation";

const CourseDetails = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("description");
  const [activeLesson, setActiveLesson] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLessonClick = (index) => {
    setActiveLesson(index === activeLesson ? "" : index);
  };

  const calculateTotalDuration = (videos) => {
    let totalDuration = 0;
    videos.forEach((video) => {
      totalDuration +=
        parseInt(video.duration.split(":")[0], 10) * 60 +
        parseInt(video.duration.split(":")[1], 10);
    });
    return totalDuration;
  };

  const convertToReadableDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const resolveSVGPath = (relativePath) => {
    return require(`../Assets/SVG/${relativePath}`);
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="courseDetailsBox">
      <div className="row CDHeader g-0">
        <div className="CDHeaderIntroVideo">
          <div className="embed-responsive-16by9">
            <iframe
              title="title"
              className="embed-responsive-item"
              src="https://www.youtube.com/embed/Zj6x_7i1jYY"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <div className="row CDBody g-0">
        <div className="CDLHS">
          <div className="CDvideoBox">
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                title="title"
                className="embed-responsive-item"
                src={courseContentDetailsData.videoUrl}
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="CDWhoIsThisFor">
            <h5>Who is this course for</h5>
            <div className="CDLightningBox">
              {courseContentDetailsData.whoIsThisFor.map((item, index) => (
                <div key={index}>
                  <div className="CDLightningTxt">
                    {item.text}
                    <img
                      className="CDLightningSVG"
                      src={resolveSVGPath(item.icon)}
                      alt={item.text}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="CDWhatYouGet">
            <h5>What you'll get out of this</h5>
            {courseContentDetailsData.whatYouGet.map((item, index) => (
              <div className="CDWhatBoxContent" key={index}>
                <img src={resolveSVGPath(item.icon)} alt={item.title} />
                <div>
                  <div className="CDItemTitle">{item.title}</div>
                  <span>{item.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="CDMHS">
          <div className="CDtabBox">
            <Tabs
              id="course-content-tabs"
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
            >
              <Tab
                eventKey="description"
                title="Description"
                className="CDtabBoxDesc"
              >
                <h1 style={{ fontSize: "25px" }} className="px-4">
                  {courseContentDetailsData.title}
                </h1>
                <br />
                <p className="text- px-4">
                  {isExpanded
                    ? courseContentDetailsData.description
                    : courseContentDetailsData.description
                        .split("\n")
                        .slice(0, 1)
                        .join(" ")}
                  {!isExpanded && (
                    <span
                      className="read-more-link text-primary"
                      onClick={toggleDescription}
                      style={{ cursor: "pointer" }}
                    >
                      Read More
                    </span>
                  )}
                  {isExpanded && (
                    <span
                      className="read-more-link text-primary "
                      style={{ cursor: "pointer" }}
                      onClick={toggleDescription}
                    >
                      Read Less
                    </span>
                  )}
                </p>
                <br />
                <h2 style={{ fontSize: "20px" }} className="px-4">
                  {" "}
                  What you will gain after completion of the course
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "20px",
                  }}
                  className="px-4"
                >
                  {courseContentDetailsData.overviewPoints.map(
                    (point, index) => (
                      <span
                        key={index}
                        className="overview-button px-3"
                        style={{
                          backgroundColor: "#f3e6ff",
                          borderRadius: "20px",
                        }}
                      >
                        {point.heading}
                      </span>
                    )
                  )}
                </div>
                <br />
                <h2 className="px-4" style={{ fontSize: "20px" }}>
                  Recommended Courses
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "20px",
                  }}
                  className="px-4"
                >
                  {courseContentDetailsData.recommendedCourses.map(
                    (course, index) => (
                      <CourseRecommendation
                        title={course.title}
                        description={course.description}
                      />
                    )
                  )}
                </div>
              </Tab>
              <Tab eventKey="lessons" title="Lessons">
                <div className="CDAccordianBox">
                  <Accordion
                    activeKey={activeLesson}
                    onSelect={handleLessonClick}
                  >
                    {courseContentDetailsData.lessons.map((lesson, index) => (
                      <Accordion.Item key={index} eventKey={index}>
                        <Accordion.Header>
                          <div className="CDlesson-meta">
                            <div className="CDlesson-title">
                              {index + 1}. {lesson.title}
                            </div>
                            <span className="CDlesson-duration">
                              Duration:{" "}
                              {convertToReadableDuration(
                                calculateTotalDuration(lesson.videos)
                              )}
                            </span>
                            <span className="">
                              &nbsp;/&nbsp; Total Videos: {lesson.videos.length}
                            </span>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <div>
                            <ul className="list-group">
                              {lesson.videos.map((video, vidIndex) => (
                                <li key={vidIndex} className="list-group-item">
                                  <span className="video-number">
                                    <a href={video.link}>
                                      {`${index + 1}.${vidIndex + 1}`}{" "}
                                      {video.title}
                                    </a>
                                  </span>
                                  <span className="lesson-duration">
                                    Duration: {video.duration}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>
              </Tab>
              <Tab
                eventKey="overview"
                title="Overview"
                className="CDtabBoxOverV"
              >
                {courseContentDetailsData.overviewPoints.map((point, index) => (
                  <div key={index}>
                    <h5>{point.heading}</h5>
                    <p>{point.content}</p>
                  </div>
                ))}
              </Tab>
            </Tabs>
          </div>
        </div>
        <div className="CDRHS">
          <div className="CDPriceBox">
            <h3>₹ {courseContentDetailsData.price}</h3>
            <div className="CDOffer">
              <div className="CDStrike">
                ₹ {courseContentDetailsData.price * 2}
              </div>
              <span>50%</span>
            </div>
            <button className="CDCartBtn">Add to Cart</button>
            <button
              onClick={() => navigate("/courseContent")}
              className="CDBuyBtn"
            >
              Buy Now
            </button>
          </div>
          <div className="CDCourseDetails">
            <h4>Course Details</h4>
            <div>
              {courseContentDetailsData.courseDetails.map((detail, index) => (
                <div key={index} className="CDCourseDetailRow">
                  <span className="detailIcon">{detail.icon}</span>
                  {detail.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
