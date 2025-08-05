import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { enroll, unenroll} from "./Enrollments/reducer";
import { useState } from "react";
import * as userClient from "./Account/client";

export default function Dashboard({ enrollments,setEnrollments, courses, course, setCourse, allCourses, addNewCourse, deleteCourse, updateCourse, enrollUserInCourse, unenrollUserFromCourse,}: { enrollments:any[],setEnrollments: (value: any[]) => void, courses: any[], course: any, setCourse: (value: any | ((prevState: any) => any)) => void, allCourses: any[], addNewCourse: () => void, deleteCourse: (courseId: string) => void, updateCourse: () => void, enrollUserInCourse: (courseId: string) => void, unenrollUserFromCourse: (courseId: string) => void;})
  {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const visibleCourses = showAllCourses
  ? allCourses
  : courses;
    const isFaculty = currentUser.role == "FACULTY"
  return (
    <div id="wd-dashboard">
 <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
  {isFaculty && <div>
       <h5>New Course
          <button className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={() => addNewCourse()} > Add </button>
                          <button className="btn btn-warning float-end me-2"
                onClick={() => updateCourse()} id="wd-update-course-click">
          Update
        </button>
      </h5><hr />
            <FormControl value={course.name} className="mb-2"
             onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <FormControl value={course.description} rows={3} as="textarea"
             onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
             </div>}
<Row className="mb-3 align-items-center">
  <Col xs={8}>
    <h2 id="wd-dashboard-published">Published Courses ({showAllCourses? allCourses.length: courses.length})</h2>
  </Col>
  <Col xs={4} className="text-end">
    <Button
      className="btn btn-info float-end"
      onClick={() => setShowAllCourses(!showAllCourses)}
    >
      {showAllCourses ? "My Enrollments" : "All Courses"}
    </Button>
  </Col>
</Row>
 <hr />
 
 <div id="wd-dashboard-courses">
  <Row xs={1} md={4} className="g-4">
    {
     
visibleCourses.map((c:any) => {
const enrolled = enrollments.some(
  (e: any) => e.user === currentUser._id && e.course === c._id
);
return (
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link to={isFaculty||enrolled? `/Kambaz/Courses/${c._id}/Home`: `/Kambaz/Dashboard/`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <Card.Img src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.name} </Card.Title>
                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {c.description} </Card.Text>
                    <Button variant="primary"> Go </Button>
                    {isFaculty && <Button variant="danger" onClick={(event) => {
                       event.preventDefault();
                      deleteCourse(c._id);
                      }} className="btn btn-danger float-end"
                    id="wd-delete-course-click"> Delete </Button>}

                      {!isFaculty && (
                        enrolled ? (
                          <Button
                            variant="danger"
                            className="float-end"
                            onClick={async(e) => {
                              e.preventDefault();
                              dispatch(unenroll({ user: currentUser._id, course: c._id }));
                              await unenrollUserFromCourse(c._id); 
                              console.log("✅ Unenroll request sent");
                            }}
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            className="float-end"
                            onClick={async(e) => {
                              e.preventDefault();
                                  dispatch(enroll({ user: currentUser._id, course: c._id }));
                              enrollUserInCourse(c._id)
                                    const updated = await userClient.fetchEnrollments();
      setEnrollments(updated);
                            }}
                          >
                            Enroll
                          </Button>
                        )
                      )}

                    {isFaculty && < button id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(c);
                      }}
                      className="btn btn-warning me-2 float-end" >
                      Edit
                    </button>}
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          );
        }
      )
      
    }

  </Row>
</div></div>

  );
}
