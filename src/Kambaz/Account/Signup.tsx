import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h3 className="mb-4">Sign up</h3>
      <Form>
        <Form.Group className="mb-3" controlId="signupUsername">
          <Form.Control type="text" placeholder="username" defaultValue="username" className="wd-username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signupPassword">
          <Form.Control type="password" placeholder="password" defaultValue="password" className="wd-password" />
        </Form.Group>

        <Form.Group className="mb-4" controlId="signupVerifyPassword">
          <Form.Label>Verify Password</Form.Label>
          <Form.Control type="password" placeholder="verify password" defaultValue="password" className="wd-password-verify" />
        </Form.Group>

        <Link to="/Kambaz/Account/Profile">
          <Button variant="primary" className="me-2">Sign up</Button>
        </Link>

        <Link to="/Kambaz/Account/Signin">
          <Button variant="secondary">Sign in</Button>
        </Link>
      </Form>
    </div>
  );
}