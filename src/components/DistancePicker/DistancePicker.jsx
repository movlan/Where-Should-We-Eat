import React from "react";

function DistancePicker(props) {
  return (
    <div>
      <form>
        <p>How far do you want to search?</p>
        <input
          type="radio"
          id="walking"
          name="radius"
          onChange={() => props.changeSearchRadius(1500)}
        />
        <label htmlFor="walking">Walking</label>
        <br />
        <input
          type="radio"
          id="drive-short"
          defaultChecked
          name="radius"
          onChange={() => props.changeSearchRadius(4000)}
        />
        <label htmlFor="drive-short">Short Driving</label>
        <br />
        <input
          type="radio"
          id="drive-Long"
          name="radius"
          onChange={() => props.changeSearchRadius(8000)}
        />
        <label htmlFor="drive-Long">Long Driving</label>
        <br />
      </form>
    </div>
  );
}

export default DistancePicker;
