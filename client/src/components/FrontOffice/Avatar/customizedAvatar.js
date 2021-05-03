import * as api from "../../../api/index";
import { useFormik, Formik } from "formik";
import avatar from "./example.png";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import profil from "./chris.jpg";

import { dimensions } from "./dimensions.js";
// import female from "./models/standard-female-figure.gltf";

export default function customizedAvatar() {
  console.log("dim", dimensions(profil));
  const x = dimensions(profil).width;
  const y = dimensions(profil).height;

  localStorage.setItem("x", x);
  localStorage.setItem("y", y);
  return (
    <Container>
      <Row>
        <Col>
          <img src={avatar} alt="profils pic" />
        </Col>
        <Col>
          <h1>Create Your Own Avatar</h1>
          <Form className="form">
            <Col>
              <div>
                <span className="text">Image: </span>

                <input
                  name="image"
                  type="file"
                  placeholder="import your image"
                  onChange={event => {
                    api.uploadFileavatar(event);
                  }}
                />
              </div>
              <br></br>
              <Button
                type="button"
                OnClick={api.customavatr()}
                color="secondary"
                className="btn btn-primary btn-icon-split btn-sm"
                variant="contained"
              >
                {" "}
                Create Your Avatar{" "}
              </Button>
            </Col>
          </Form>
        </Col>
        <Link
          to={{
            pathname: "/monavatar/"
          }}
        >
          {" "}
          <Button type="button" color="danger" variant="contained">
            {" "}
            Show your avatar{" "}
          </Button>
        </Link>
        <Link
          to={{
            pathname: "/terminos"
          }}
        >
          {" "}
          <Button type="button" color="danger" variant="contained">
            {" "}
            Show your measurements{" "}
          </Button>
        </Link>
      </Row>
    </Container>
  );
}
