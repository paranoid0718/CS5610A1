import { Button, Col, Form, Row } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div>
    <div id="wd-assignments-editor">
  <Form>
   <Form.Group  className="mb-3">
     <Form.Label > Assignmentt Name</Form.Label>
       <Form.Control type="text" placeholder="A1" className="mb-3"/>
       <Form.Control as="textarea" rows = {4} placeholder="The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: your full name and section Links to each of the lab assignments Link to the Kanbas application
Links to all relevant source code repositories. The Kanbas application should include a link to navigate back to the landing page." />
   </Form.Group>
   <Form.Group as={Row} className="mb-3">
     <Form.Label column sm={2}> Points </Form.Label>
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
    <Form.Control type="date"  defaultValue="2025-05-13" className="mb-3"/>
    <Form.Group as={Row} className="mb-3">
      <Col sm = {6}>
          <Form.Group  className="mb-3">
        <Form.Label> Available From </Form.Label>
    <Form.Control type="date"  defaultValue="2025-05-13"/>
    </Form.Group>
      </Col>
            <Col sm={6}>
          <Form.Group  className="mb-3">
        <Form.Label> Until </Form.Label>
    <Form.Control type="date"  defaultValue="2025-05-13"/>
    </Form.Group>
      </Col>
    </Form.Group>
    </Form.Group>
    
    </Col>

   </Form.Group>
  </Form>
</div>
<hr/>
    <div className="float-end">
      <Button variant="secondary" className="me-2">
        Cancel
      </Button>
      <Button variant="danger">
        Save
      </Button>
    </div>
  </div>
  );
}