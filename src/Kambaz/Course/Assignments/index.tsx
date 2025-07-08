export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments"
             id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button> </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            A1 - ENV + HTML
        </a> 
            <div>Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 20 at 11:59pm | 100 pts</div>
          </li>
        <li className="wd-assignment-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/456"
             className="wd-assignment-link">
            A2 - CSS + BOOTSTRAP
          </a>
          <div>Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 20 at 11:59pm | 100 pts</div>
        </li>
        <li className="wd-assignment-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/789"
             className="wd-assignment-link">
            A3 - JAVASCRIPT + REACT
          </a>
          <div>Multiple Modules | <strong>Not available until</strong> May 20 at 12:00am | <strong>Due</strong> May 27 at 11:59pm | 100 pts</div>
        </li>
      </ul>
      <h3 id="wd-Quizzes-title">
        QUIZZES 10% of Total <button>+</button> </h3>

              <ul id="wd-quiz-list">
        <li className="wd-quiz-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/q1"
             className="wd-quiz-link" >
            Quiz1
        </a> 
            <div>Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 20 at 11:59pm | 100 pts</div>
          </li>
        <li className="wd-quiz-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/q2"
             className="wd-quiz-link">
            Quiz2
          </a>
          <div>Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 20 at 11:59pm | 100 pts</div>
        </li>
        <li className="wd-quiz-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/q3"
             className="wd-quiz-link">
            Quiz3
          </a>
          <div>Multiple Modules | <strong>Not available until</strong> May 20 at 12:00am | <strong>Due</strong> May 27 at 11:59pm | 100 pts</div>
        </li>
      </ul>
            <h3 id="wd-Exam-title">
        Exams 20% of Total <button>+</button> </h3>

              <ul id="wd-exam-list">
        <li className="wd-exam-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/midterm"
             className="wd-exam-link" >
           Midterm
        </a> 
            <div>Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 20 at 11:59pm | 100 pts</div>
          </li>
        <li className="wd-exam-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/final"
             className="wd-exam-link">
            Final
          </a>
          <div>Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 20 at 11:59pm | 100 pts</div>
        </li>
      </ul>
            <h3 id="wd-Project-title">
        QUIZZES 30% of Total <button>+</button> </h3>

              <ul id="wd-project-list">
        <li className="wd-project-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/project"
             className="wd-project-link" >
            Group Project
        </a> 
            <div>Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 20 at 11:59pm | 100 pts</div>
          </li>
      </ul>

    </div>
);}
