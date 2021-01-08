import React from "react";
import { Col, Container, Row, Image, Spinner, Button } from "react-bootstrap";
import { getRestaurant } from "../../services/zomato-api";
import { FaDirections } from "react-icons/fa";

class RestaurantView extends React.Component {
  state = { restaurant: null };

  componentDidMount() {
    getRestaurant(this.props.id).then((response) => {
      this.setState({ restaurant: response.data });
      console.log(response.data);
    });
  }

  render() {
    return this.state.restaurant ? (
      <Container>
        <Row>
          <Col>
            <Image src={this.state.restaurant.featured_image} fluid />
            <h1>{this.state.restaurant.name}</h1>
            <h3>
              {this.state.restaurant.establishment.join(", ")}
              {" - "}
              {this.state.restaurant.cuisines}
            </h3>
            <Button variant="outline-secondary">
              <FaDirections />
              {"  "}
              Directions
            </Button>{" "}
            <Button variant="outline-secondary">Secondary</Button>{" "}
          </Col>
        </Row>
      </Container>
    ) : (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
}

export default RestaurantView;
