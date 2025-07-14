import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="p-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h3 className="mb-4">Sign in</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Control type="text" placeholder="username" defaultValue="TONGXIAO" className="wd-username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Control type="password" placeholder="password" className="wd-password" />
        </Form.Group>

        <Link to="/Kambaz/Dashboard">
          <Button variant="primary" className="me-2" id="wd-signin-btn">
            Sign in
          </Button>
        </Link>

        <Link to="/Kambaz/Account/Signup" id="wd-signup-link">
          <Button variant="secondary">
            Sign up
          </Button>
        </Link>
      </Form>
    </div>
  );
}