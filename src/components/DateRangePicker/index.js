import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { InputGroup, InputGroupText } from "reactstrap";
const Index = (props) => {
  const { minDate, maxDate, defaultVal, handleCallback, handleInput } = props;

  return (
    <>
      <InputGroup>
        <DateRangePicker
          initialSettings={{
            autoApply: true,
            singleDatePicker: true,
            showDropdowns: true,
            minDate: minDate,
            locale: { format: "DD/MM/YYYY" },
            maxDate: moment().format("DD/MM/YYYY"),
          }}
          // onEvent={handleEventStart}
          onCallback={handleCallback}
        >
          <input type="text" value={defaultVal} onChange={handleInput} className="form-control" />
        </DateRangePicker>
        <InputGroupText><i className="bi bi-calendar4"/></InputGroupText>
      </InputGroup>
    </>
  );
};

export default Index;
