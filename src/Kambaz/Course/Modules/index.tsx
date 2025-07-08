export default function Modules() {
  return (
    <div>
      {/* Implement Collapse All button, View Progress button, etc. */}
        <button>Collapse All</button>
        <button>View Progress</button>
        <select>
          <option>Publish All</option>
          <option>Publish Week 1</option>
          <option>Publish Week 2</option>
          <option>Publish Week 3</option>
        </select>
        <button> + Module</button>
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1, Lecture1 - Course introduction, Syllabus, Agenda</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Full Stack Developer - Chapter 1 - Introductions</li>
                <li className="wd-content-item">Full Stack Developer - Chapter 2 - Creating Us</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2, Lecture 2 - Formatting Interfaces with HTML</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
                  <li className="wd-content-item">Deploy the assignment to Netligy</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Formatting Web Content with Headings</li>
                  <li className="wd-content-item">Formatting Content with Lists and Tables</li>
                </ul>
              </li>
            </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
        </li>
      </ul>
    </div>
);}
