import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

const MainPage = (props) => {
  return (
    <InputGroup className="mt-5">
      <InputGroup.Append>
        <FormControl
          placeholder={
            props.localInfo ? props.localInfo.data.location.city_name : "City"
          }
        />
      </InputGroup.Append>
      <FormControl className="mr-sm-2" placeholder="Restaurants" />
      <Button>Search</Button>
    </InputGroup>
  );
};

export default MainPage;
