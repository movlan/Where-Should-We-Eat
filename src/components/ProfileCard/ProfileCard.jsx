import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ProfileCard = (props) => {
  return (
    <Col className="mx-auto mt-5">
      <Card>
        <Row className="h-100">
          <Col md={4} className="my-auto">
            <Card.Body className="text-center">
              <Image
                src="https://img.icons8.com/bubbles/100/000000/user.png"
                rounded
                alt="user profile image"
              />
            </Card.Body>
          </Col>
          <Col md={8}>
            <Card.Body>
              <h6>Information</h6>
              <hr />
              <Row>
                <Col md={4}>
                  <p>Name:</p>
                </Col>
                <Col md={8}>
                  <p>{props.user.name}</p>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <p>Email:</p>
                </Col>
                <Col md={8}>
                  <p>{props.user.email}</p>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <p>Favorites:</p>
                </Col>
                <Col md={8}>
                  <p>{props.user.favorites}</p>
                </Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
        <LinkContainer to="/edit-profile">
          <Card.Link className="ml-auto mr-3">Edit Profile</Card.Link>
        </LinkContainer>
      </Card>
    </Col>
  );
};

export default ProfileCard;
