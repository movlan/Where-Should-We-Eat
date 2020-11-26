import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ProfileCard = (props) => {
  return (
    <Col md={8} className="mx-auto mt-5">
      <Card>
        <Row className="m-l-0 m-r-0">
          <Col sm={4}>
            <Card.Body className="text-center">
              <Image
                src="https://img.icons8.com/bubbles/100/000000/user.png"
                rounded
                alt="user profile image"
              />
              <h6>{props.user.name}</h6>
            </Card.Body>
          </Col>
          <Col sm={8}>
            <Card.Body>
              <h6>Information</h6>
              <Row>
                <Col sm={3}>
                  <p>Email:</p>
                </Col>
                <Col sm={9}>
                  <p>{props.user.email}</p>
                </Col>
              </Row>
              <Row>
                <Col sm={3}>
                  <p>About:</p>
                </Col>
                <Col sm={9}>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Vitae laudantium aliquid in necessitatibus eaque, quisquam
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default ProfileCard;
