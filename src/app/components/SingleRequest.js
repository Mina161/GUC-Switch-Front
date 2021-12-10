import React from "react";
import { connect } from "react-redux";

export const SingleRequest = ({ request }) => {
  return (
    <div className="request p-2">
      <div className="d-flex justify-content-between">
        <h4>Switching Request of {request?.appNo}</h4>
      </div>
      <div>
        <p>Major: {request?.major}</p>
        <p>Semester: {request?.semester}</p>
        <p>Tutorial Number: {request?.tutNo}</p>
        <p>Wants to go to: {request?.goTo.toString()}</p>
        <p>German: {request?.germanLevel}</p>
        <p>English: {request?.englishLevel}</p>
      </div>
      <p></p>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SingleRequest);
