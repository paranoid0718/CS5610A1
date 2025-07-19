import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import * as db from "../../Database";



export default function AssignmentEditor() {
  const {aid} = useParams()
  const {cid} = useParams()
  const assignments = db.assignments

  
  return (
  <div>
    
      {assignments.filter((assignment: any) => assignment.course === cid && assignment._id === aid).map((assignment:any) => ( <div>   
  <Form>
   <Form.Group  className="mb-3">
     <Form.Label > {assignment?.title}</Form.Label>
       <Form.Control type="text" placeholder={assignment?._id} className="mb-3"/>
       <Form.Control as="textarea" rows = {4} placeholder={assignment?.description} />
   </Form.Group>
   <Form.Group as={Row} className="mb-3">
     <Form.Label column sm={2}> {assignment?.points} </Form.Label>
     <Col sm={10}>
       <Form.Control type="password" placeholder="100" />
     </Col>
   </Form.Group>
   <fieldset>
       <Form.Group as={Row} className="mb-3">
     <Form.Label column sm={2}> Assignmentt Group</Form.Label>
     <Col sm={10}>
      <Form.Select className="mb-2">
      <option value="assignments">Assignments</option>
      <option value="quizzes">Quizzes</option>
      <option value="exams">exams</option>
      <option value="project">Projects </option>
    </Form.Select>
     </Col>
   </Form.Group>
   <fieldset>
       <Form.Group as={Row} className="mb-3">
     <Form.Label column sm={2}> Display Grade as </Form.Label>
     <Col sm={10}>
      <Form.Select className="mb-2">
      <option value="Percentage">Percentage</option>
      <option value="Points">Points</option>
      <option value="Complete/Incomplete">Complete/Incomplete</option>
    </Form.Select>
     </Col>
   </Form.Group>
   </fieldset>
     <Form.Group as={Row} className="mb-3">
       <Form.Label as="legend" column sm={2} className="mb-2">
         Submission Type </Form.Label>
       <Col sm={10}>
        <Form.Group className="border border-secondary rounded p-3">
        <Form.Select className="mb-2">
      <option value="online">Online</option>
      <option value="paper">On Paper</option>
      <option value="none">No Submission</option>
    </Form.Select>
        <Form.Label className="mb-2"> Submission Type </Form.Label>
    <Form.Check 
      type="checkbox"
      id="text-entry"
      label="Text Entry"
      className="mb-2"
    />
    <Form.Check 
      type="checkbox"
      id="website-url"
      label="Website URL"
      className="mb-2"
    />
    <Form.Check 
      type="checkbox"
      id="media-recordings"
      label="Media Recordings"
      className="mb-2"
    />
    <Form.Check 
      type="checkbox"
      id="student-annotation"
      label="Student Annotation"
      className="mb-2"
    />
    <Form.Check 
      type="checkbox"
      id="file-uploads"
      label="File Uploads"
      className="mb-2"
    />
        </Form.Group>
       </Col>
     </Form.Group>
   </fieldset>

   <Form.Group as={Row} className="mb-3">
    <Form.Label column sm={2}> Assign </Form.Label>
    <Col>
    
    <Form.Group  className="mb-3 border border-secondary rounded p-3">
    <Form.Label> Assign to </Form.Label>
    <Form.Control type="text" placeholder="" className="mb-3"/>
        <Form.Label> Due </Form.Label>
    <Form.Control type="date"  defaultValue={assignment?.dueDate} className="mb-3"/>
    <Form.Group as={Row} className="mb-3">
      <Col sm = {6}>
          <Form.Group  className="mb-3">
        <Form.Label> Available From </Form.Label>
    <Form.Control type="date"  defaultValue={assignment?.availableDate}/>
    </Form.Group>
      </Col>
            <Col sm={6}>
          <Form.Group  className="mb-3">
        <Form.Label> Until </Form.Label>
    <Form.Control type="date"/>
    </Form.Group>
      </Col>
    </Form.Group>
    </Form.Group>
    
    </Col>

   </Form.Group>
  </Form>
</div>
))
}
<hr/>
<div className="float-end">
<Link to={`/courses/${cid}/assignments`} className="me-2">
  <Button variant="secondary">
    Cancel
  </Button>
</Link>
<Link to={`/courses/${cid}/assignments`} className="me-2">
  <Button variant="danger">
    Save
  </Button>
</Link>
</div>
  </div>
  );
}