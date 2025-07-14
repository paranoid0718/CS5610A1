import { ListGroup } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
export default function Modules() {
  return (
    <div>
  <ModulesControls /><br /><br /><br /><br />
  <ListGroup className="rounded-0" id="wd-modules">
    <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" />Week 1, Lecture1 - Course introduction, Syllabus, Agenda <LessonControlButtons/></div>
      <ListGroup className="wd-lessons rounded-0">
        <ListGroup.Item className="wd-lesson p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" />  Full Stack Developer - Chapter 1 - Introductions <LessonControlButtons/></ListGroup.Item>
        <ListGroup.Item className="wd-lesson p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" />  Introduction to the course <LessonControlButtons/></ListGroup.Item>
        <ListGroup.Item className="wd-lesson p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" />  Full Stack Developer - Chapter 2 - Creating a React Web Application  <LessonControlButtons/></ListGroup.Item>
      </ListGroup>
    </ListGroup.Item>
    <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary"><BsGripVertical className="me-2 fs-3" /> Week 2, Lecture 2 - Prototyping the React Kambaz User Interface with HTML <LessonControlButtons/></div>
      <ListGroup className="wd-lessons rounded-0">
        <ListGroup.Item className="wd-lesson p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" /> PROTOTYPING THE KAMBAZ REACT APPLICATION WITH HTML<LessonControlButtons/></ListGroup.Item>
        <ListGroup.Item className="wd-lesson p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" />  Kanbas Web App on Netlify <LessonControlButtons/></ListGroup.Item>
      </ListGroup>
    </ListGroup.Item>
    <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary"><BsGripVertical className="me-2 fs-3" /> Week 2, Lecture 3 - Styling Web Pages with CSS and Bootstrap, Assignment 2 <LessonControlButtons/></div>
      <ListGroup className="wd-lessons rounded-0">
        <ListGroup.Item className="wd-lesson p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" /> Introduction to CSS<LessonControlButtons/></ListGroup.Item>
        <ListGroup.Item className="wd-lesson p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" /> The box model - styling margins, borders, and paddings<LessonControlButtons/> </ListGroup.Item>
      </ListGroup>
    </ListGroup.Item>
  </ListGroup>
</div>

);}
