import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Signin() {
    const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = async () => {
    const user =  await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kambaz/Dashboard");
  };


  return (
    <div>
    <div id="wd-signin-screen" className="p-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h3 className="mb-4">Sign in</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Control type="text" placeholder="username" defaultValue="TONGXIAO" className="wd-username" 
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Control type="password" placeholder="password" className="wd-password" 
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
/>
        </Form.Group>

          <Button onClick={signin} variant="primary" className="me-2" id="wd-signin-btn">
            Sign in
          </Button>

        <Link to="/Kambaz/Account/Signup" id="wd-signup-link">
          <Button variant="secondary">
            Sign up
          </Button>
        </Link>
      </Form>
    </div>
          <div className="mt-4">
        <h5>Team members:</h5>
        <ul>
          <li>Kenneth Wan, CS5610 Summer 2 2025</li>
          <li>Tongxiao Zhao, CS5610 Summer 2 2025</li>
        </ul>
        <p>
          <strong>Frontend:</strong>{" "}
          <a
            href="https://github.com/paranoid0718/CS5610A1/tree/develop"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/paranoid0718/CS5610A1/tree/develop
          </a>
        </p>
        <p>
          <strong>Backend:</strong>{" "}
          <a
            href="https://github.com/paranoid0718/kambaz-node-server-app/tree/develop"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/paranoid0718/kambaz-node-server-app/tree/develop
          </a>
        </p>
      </div>
    </div>
  );
}