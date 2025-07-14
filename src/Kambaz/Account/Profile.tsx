import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-4" style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h3 className="mb-4">Profile</h3>
      <Form>
        <Form.Group className="mb-3" controlId="profileUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control defaultValue="alice" placeholder="username" className="wd-username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="profilePassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" defaultValue="123" placeholder="password" className="wd-password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="profileFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control defaultValue="Alice" placeholder="First Name" id="wd-firstname" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="profileLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control defaultValue="Wonderland" placeholder="Last Name" id="wd-lastname" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="profileDob">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" defaultValue="2000-01-01" id="wd-dob" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="profileEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" defaultValue="alice@wonderland" id="wd-email" />
        </Form.Group>

        <Form.Group className="mb-4" controlId="profileRole">
          <Form.Label>Role</Form.Label>
          <Form.Select defaultValue="FACULTY" id="wd-role">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>
        </Form.Group>

        <Link to="/Kambaz/Account/Signin">
          <Button variant="danger">Sign out</Button>
        </Link>
      </Form>
    </div>
  );
}