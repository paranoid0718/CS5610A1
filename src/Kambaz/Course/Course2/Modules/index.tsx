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
                <li className="wd-content-item">Learn what is Data Structure</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">Array</span>
              <ul className="wd-content">
                <li className="wd-content-item">Chapter 1 - Array</li>
                <li className="wd-content-item">Chapter 2 - Pointer</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2, Lecture 2 - Trees</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Binary Tree</li>
                  <li className="wd-content-item">BST</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Binary Tree</li>
                  <li className="wd-content-item">BST</li>
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
