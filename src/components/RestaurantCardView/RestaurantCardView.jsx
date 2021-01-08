import React from "react";
import "./RestaurantCardView.css";
import { Card, Col, Dropdown, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const RestaurantCardView = (props) => {
  return (
    <LinkContainer
      to={`/restaurants/${props.restaurant.id}`}
      style={{ cursor: "pointer" }}
      id={props.restaurant.id}
      params={props.restaurant.id}
    >
      <Card className="my-3">
        <Card.Body>
          <Row>
            <Col sm={3}>
              <Card.Img
                src={props.restaurant.thumb}
                alt="Image of restaurant"
                style={{ maxWidth: "180px" }}
              />
            </Col>
            <Dropdown.Divider />
            <Col sm={9}>
              <Card.Title>{props.restaurant.name}</Card.Title>
              <Card.Subtitle>
                Rating: {props.restaurant.user_rating.aggregate_rating}
              </Card.Subtitle>
              <p>{props.restaurant.location.address}</p>
              <Row>
                <Col xs={5} md={4} lg={3}>
                  <p className="sm-text">CUISINES:</p>
                  <p className="sm-text">COST FOR TWO:</p>
                  {/* <p className="sm-text">HOURS:</p> */}
                </Col>
                <Col xs={7} md={8} lg={9}>
                  <p className="sm-text">{props.restaurant.cuisines}</p>
                  <p className="sm-text">
                    {props.restaurant.currency}
                    {props.restaurant.average_cost_for_two}
                  </p>
                  {/* <p className="sm-text"></p> */}
                </Col>
              </Row>
            </Col>
          </Row>

          <div className="divider"></div>
          <Row></Row>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
};

export default RestaurantCardView;
