import { Button, Col, FormControl, InputGroup, ListGroup, Row } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { FaSearch } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";


export default function Assignments() {
  return (
    <div>
          <div className="my-3">
      <Row>
        <Col xs={8}>
          <div className="float-start">
                <InputGroup>
      <InputGroup.Text>
        <FaSearch />
      </InputGroup.Text>
      <FormControl type="text" placeholder="Search..." />
    </InputGroup>
          </div>
        </Col>

        <Col xs={4}>
          <div className="d-flex float-end gap-2">
            <Button variant="secondary">+Group</Button>
            <Button variant="danger">+Assignment</Button>
          </div>
        </Col>
      </Row>
    </div>

  <ListGroup className="rounded-0" id="wd-modules">
    <ListGroup.Item className="p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" /><span id="wd-assignments-title">
        <strong> ASSIGNMENTS </strong></span>  <LessonControlButtons/><span className="float-end"> <Button variant="bg-secondary" className="rounded-pill me-2" style={{ backgroundColor: "#e0e0e0", border: "1px solid black", color: "black" }}>40% of Total </Button><Button variant="bg-secondary" className="rounded-pill me-2" > + </Button></span></div>
      <ListGroup className="wd-assignment rounded-0">
        
        <ListGroup.Item className="wd-assignment p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" /> 
        <LuNotebookPen />       
        <a href="#/Kambaz/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            A1 - ENV + HTML 
        </a> 
            <span> Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 20 at 11:59pm | 100 pts </span><LessonControlButtons/></ListGroup.Item>
                    <ListGroup.Item className="wd-assignment p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" />        
        <LuNotebookPen />    
        <a href="#/Kambaz/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            A2 - CSS + BOOTSTRAP 
        </a> 
            <span> Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 24 at 11:59pm | 100 pts </span><LessonControlButtons/></ListGroup.Item>
                    <ListGroup.Item className="wd-assignment p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" />      
        <LuNotebookPen />      
        <a href="#/Kambaz/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            A3 - JAVASCRIPT + REACT
        </a> 
            <span> Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 27 at 11:59pm | 100 pts </span><LessonControlButtons/></ListGroup.Item>

      </ListGroup>
      

    </ListGroup.Item>
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" /><span id="wd-assignments-title">
        <strong> QUIZZES </strong></span>  <LessonControlButtons/><span className="float-end"> <Button variant="bg-secondary" className="rounded-pill me-2" style={{ backgroundColor: "#e0e0e0", border: "1px solid black", color: "black" }}>10% of Total </Button><Button variant="bg-secondary" className="rounded-pill me-2" > + </Button></span></div>
      <ListGroup className="wd-assignment rounded-0">
        <ListGroup.Item className="wd-assignment p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" /> 
        <LuNotebookPen />           
        <a href="#/Kambaz/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            Quiz1
        </a> 
            <span> Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 20 at 11:59pm | 100 pts </span><LessonControlButtons/></ListGroup.Item>
                    <ListGroup.Item className="wd-assignment p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" />   
        <LuNotebookPen />         
        <a href="#/Kambaz/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            Quiz2
        </a> 
            <span> Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 24 at 11:59pm | 100 pts </span><LessonControlButtons/></ListGroup.Item>
                    <ListGroup.Item className="wd-assignment p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" />       
        <LuNotebookPen />     
        <a href="#/Kambaz/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            Quiz3
        </a> 
            <span> Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 27 at 11:59pm | 100 pts </span><LessonControlButtons/></ListGroup.Item>

      </ListGroup>
      

    </ListGroup.Item>
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" /><LuNotebookPen /><span id="wd-assignments-title">
        <strong> EXAMS </strong></span>  <LessonControlButtons/><span className="float-end"> <Button variant="bg-secondary" className="rounded-pill me-2" style={{ backgroundColor: "#e0e0e0", border: "1px solid black", color: "black" }}>20% of Total </Button><Button variant="bg-secondary" className="rounded-pill me-2" > + </Button></span></div>
      <ListGroup className="wd-assignment rounded-0">
        <ListGroup.Item className="wd-assignment p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" />          
        <LuNotebookPen />  
        <a href="#/Kambaz/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            Midterm
        </a> 
            <span> Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 20 at 11:59pm | 100 pts </span><LessonControlButtons/></ListGroup.Item>
                    <ListGroup.Item className="wd-assignment p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" />     
        <LuNotebookPen />       
        <a href="#/Kambaz/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            Final
        </a> 
            <span> Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 24 at 11:59pm | 100 pts </span><LessonControlButtons/></ListGroup.Item>


      </ListGroup>
      

    </ListGroup.Item>
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" />
        <strong> PROJECT </strong> <LessonControlButtons/><Button variant="bg-secondary" className="rounded-pill me-2 float-end" > + </Button><Button variant="bg-secondary" className="rounded-pill me-2 float-end" style={{ backgroundColor: "#e0e0e0", border: "1px solid black", color: "black" }}>30% of Total </Button></div>
      <ListGroup className="wd-assignment rounded-0">
        <ListGroup.Item className="wd-assignment p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" />            
        <LuNotebookPen />
        <a href="#/Kambaz/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            Final Group Project
        </a> 
            <span> Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 20 at 11:59pm | 100 pts </span><LessonControlButtons/></ListGroup.Item>
      </ListGroup>
      

      
      

    </ListGroup.Item>
    
    

  </ListGroup>
</div>

    
);}
