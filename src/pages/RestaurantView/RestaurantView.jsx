import React from "react";
import { Col, Container, Row, Image, Spinner, Button } from "react-bootstrap";
import { FaDirections, FaStar, FaPhone } from "react-icons/fa";

import { getRestaurant } from "../../services/zomato-api";
import userService from "../../utils/userService";

class RestaurantView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { restaurant: null };
  }

  locationUrl = "";

  componentDidMount() {
    getRestaurant(this.props.id).then((response) => {
      this.setState({ restaurant: response.data });
    });
  }

  async handleAddFavorite(id) {
    const responce = await userService.addFavorite(id);
    this.props.setUser(responce);
  }

  async handleRemoveFavorite(id) {
    const responce = await userService.removeFavorite(id);
    this.props.setUser(responce);
  }

  favoriteBtn() {
    return this.props.user ? (
      this.props.user.favorites.includes(this.props.id) ? (
        <Button
          style={{ backgroundColor: "#CD5C5C" }}
          onClick={() => this.handleRemoveFavorite(this.props.id)}
        >
          <FaStar />
          {"  "}Remove from Favorite
        </Button>
      ) : (
        <Button
          variant="outline-secondary"
          onClick={() => this.handleAddFavorite(this.props.id)}
        >
          <FaStar color="IndianRed" />
          {"  "}
          Add to Favorite
        </Button>
      )
    ) : null;
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
            <h5>{this.state.restaurant.location.locality}</h5>
            <h6>Address: {this.state.restaurant.location.address}</h6>
            <h6>Hours: {this.state.restaurant.timings}</h6>
            <div className="mt-3">
              <a
                rel="noreferrer"
                target="_blank"
                href={
                  this.state.restaurant.location.latitude === "0.0000000000"
                    ? `https://www.google.com/maps/search/?api=1&query=${this.state.restaurant.name}`
                    : `https://www.google.com/maps/dir/?api=1&destination=${this.state.restaurant.location.latitude},${this.state.restaurant.location.longitude}`
                }
              >
                <Button variant="outline-secondary">
                  <FaDirections color="IndianRed" />
                  {"  "}
                  Directions
                </Button>
              </a>{" "}
              <a href={`tel:${this.state.restaurant.phone_numbers}`}>
                <Button variant="outline-secondary">
                  <FaPhone color="IndianRed" />
                  {"  "}
                  Call
                </Button>
              </a>{" "}
              {this.favoriteBtn()}
            </div>
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
