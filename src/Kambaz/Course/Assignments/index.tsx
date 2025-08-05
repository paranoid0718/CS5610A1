import { Button, Col, FormControl, InputGroup, ListGroup, Row } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaSearch, FaTrash } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { useNavigate, useParams } from "react-router";
import AssignmentControlButtons from "./AssignmentControlButtons"
import { useDispatch, useSelector } from "react-redux";
import { setAssignments, deleteAssignment} from "./reducer";
import * as coursesClient from "../client";
import { useEffect } from "react";
import * as AssignmentClient from "./client"
export default function Assignments() {
  const navigate = useNavigate();
  const { cid } = useParams();
  const dispatch = useDispatch()
  const {assignments} = useSelector((state: any) => state.assignmentsReducer);
    const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);
    const removeAssignment = async (AssignmentId: string) => {
    await AssignmentClient.deleteAssignment(AssignmentId);
    dispatch(deleteAssignment(AssignmentId));
  };


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
            <Button variant="danger" onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/new`)}>+Assignment</Button>
          </div>
        </Col>
      </Row>
    </div>

      <ListGroup className="rounded-0" id="wd-modules">
    <ListGroup.Item className="p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" /><span id="wd-assignments-title">
        <strong> ASSIGNMENTS </strong></span>  <AssignmentControlButtons/><span className="float-end"> <Button variant="bg-secondary" className="rounded-pill me-2" style={{ backgroundColor: "#e0e0e0", border: "1px solid black", color: "black" }}>40% of Total </Button><Button variant="bg-secondary" className="rounded-pill me-2" > + </Button></span></div>

        <ListGroup className="wd-assignment rounded-0">
      {assignments.filter((assignment:any) => assignment.course == cid).map((assignment:any) => (        <ListGroup.Item className="wd-assignment p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" /> 
        <LuNotebookPen /> 
        <a href= {`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
             className="wd-assignment-link" >
            {assignment.title}
        </a> 
            <span> Multiple Modules | <strong>Not available until</strong> {assignment.availableDate} | <strong>Due</strong> {assignment.dueDate} | <strong>Points:</strong>{assignment.points} </span><AssignmentControlButtons/>
                    <FaTrash onClick={() => removeAssignment(assignment._id)} className="float-end"/>    </ListGroup.Item>))
      
      }
        </ListGroup>
                </ListGroup.Item>
      </ListGroup>


</div>

    
);}
