import React from "react";
import { useState } from "react";
import parse from "html-react-parser";
import "./date-picker.scss";

const DatePicker = props => {
  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const inputClicked = e => {
    setShowPicker(true);
  };

  const changeMonthYear = e => {
    if (e.target.dataset.type === "prev-year")
      setDate(
        new Date(date.getFullYear() - 1, date.getMonth(), date.getDate())
      );
    if (e.target.dataset.type === "prev-month")
      setDate(
        new Date(date.getFullYear(), date.getMonth() - 1, date.getDate())
      );
    if (e.target.dataset.type === "next-month")
      setDate(
        new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())
      );
    if (e.target.dataset.type === "next-year")
      setDate(
        new Date(date.getFullYear() + 1, date.getMonth(), date.getDate())
      );
  };

  const generateTitle = dateString => {
    return (
      <div className="dp-header">
        <div className="dp-arrow-bg">
          <div
            data-type="prev-year"
            className="dp-arrow-l"
            onClick={e => changeMonthYear(e)}
          ></div>
        </div>
        <div className="dp-arrow-bg">
          <div
            data-type="prev-month"
            className="dp-arrow-l"
            onClick={e => changeMonthYear(e)}
          ></div>
        </div>
        <span>
          {dateString[1]} {dateString[3]}
        </span>
        <div className="dp-arrow-bg">
          <div
            className="dp-arrow-r"
            data-type="next-month"
            onClick={e => changeMonthYear(e)}
          ></div>
        </div>
        <div className="dp-arrow-bg">
          <div
            data-type="next-year"
            className="dp-arrow-r"
            onClick={e => changeMonthYear(e)}
          ></div>
        </div>
      </div>
    );
  };

  const generateDays = () => {
    const daysNumber = getDaysInMonth(date.getMonth() + 1, date.getFullYear());
    let daysEl = document.createElement("div");

    for (var i = 1; i <= daysNumber; i++) {
      let temp = document.createElement("div");
      temp.classList.add("dp-day");
      temp.innerHTML = i;
      daysEl.appendChild(temp);
    }
    return parse(daysEl.innerHTML);
  };

  const dateClicked = e => {
    const value = parseInt(e.target.innerHTML);
    if (!isNaN(value)) {
      const dateSelectedRaw = new Date(
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + value
      );

      const dateSelectedFormatted = `${dateSelectedRaw.getDate()}-${dateSelectedRaw.getMonth() +
        1}-${dateSelectedRaw.getFullYear()}`;
      setSelectedDate(dateSelectedFormatted);
      setShowPicker(false);
      props.handleOnChange(e, "", dateSelectedFormatted);
    }
  };

  const generatePicker = () => {
    return (
      <div
        className=" dp-container"
        style={{
          display: showPicker ? "block" : "none"
        }}
      >
        {generateTitle(date.toDateString().split(" "))}

        <div className="dp-days" onClick={e => dateClicked(e)}>
          {generateDays()}
        </div>
      </div>
    );
  };

  return (
    <div className="dp-field-container">
      <input
        className="dp-field"
        type="text"
        name="dp-field"
        onClick={e => inputClicked(e)}
        onChange={e => inputClicked(e)}
        value={selectedDate}
        placeholder="Choose birthday date!"
      ></input>
      {selectedDate && (
        <span
          className="dp-remove close"
          onClick={e => {
            setSelectedDate("");
            props.handleOnChange(e, "", "");
          }}
        />
      )}
      {showPicker && generatePicker()}
    </div>
  );
};

export default DatePicker;
