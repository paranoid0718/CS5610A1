import { useState } from "react";
import { FormCheck, FormControl } from "react-bootstrap";
const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER;
export default function WorkingWithObjects() {
      const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
    const [module, setModule] = useState({
    id: "1",
    name: "NodeJs Module",
    description: "Learn how to use node.js",
    course: "CS5610",
  });
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`
   const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>
        <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr/>
            <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                    Update Title </a>
      <FormControl className="w-75" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>
      <hr />
            <a className="btn btn-primary float-end" href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
        Update Score
      </a>
        <FormControl
        type="number"
        className="w-75 "
        value={assignment.score}
        onChange={(e) => setAssignment({ ...assignment, score: parseInt(e.target.value) })}
        placeholder="Assignment Score"
      />

      <hr />
            <a className="btn btn-primary float-end" href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
        Update Completed
      </a>
            <FormCheck
        className="mb-2"
        label="Completed"
        checked={assignment.completed}
        onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
      />
      <hr />
      
    <h4>Modifying Module Properties</h4>
    <a className="btn btn-primary float-end" href={`${MODULE_API_URL}/name/${module.name}`}>
        Update Module Name
      </a>
      <FormControl
        className="w-75 mb-2"
        value={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
        placeholder="Module Name"
      />
      <hr />
    <a className="btn btn-primary float-end" href={`${MODULE_API_URL}/description/${module.description}`}>
        Update Description
      </a>
      <FormControl
        className="w-75 mb-2"
        value={module.description}
        onChange={(e) => setModule({ ...module, description: e.target.value })}
        placeholder="Module Description"
      />

    </div>
);}
