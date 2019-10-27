import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import parse from "html-react-parser";
import "./date-picker.scss";

const DatePicker = () => {
  const getDaysInMonth = (month, year) => {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
    return new Date(year, month, 0).getDate();
    // Here January is 0 based
    // return new Date(year, month+1, 0).getDate();
  };
  const dpDays = useRef(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // const generatePicker = useCallback(() => {
  //   return (
  //     <div
  //       className="dp-container"
  //       style={{
  //         display: showPicker ? "block" : "none"
  //       }}
  //     >
  //       {generateTitle(date.toDateString().split(" "))}
  //       {generateWeekdays()}

  //       <div
  //         className="dp-days"
  //         onClick={e => dateClicked(e)}
  //         ref={dpDays}
  //         // dangerouslySetInnerHTML={{ __html: generateDays(new Date()) }}
  //       >
  //         {generateDays()}
  //       </div>
  //     </div>
  //   );
  // });

  useEffect(() => {
    // This is be executed when `loading` state changes
  }, [date]);

  // const date = new Date();

  const newElement = (element, className, innerHTML) => {
    const el = document.createElement(element);
    if (className !== "") el.className = className;
    if (typeof innerHTML != "undefined") el.innerHTML = innerHTML;
    return el;
  };

  const inputClicked = e => {
    setShowPicker(true);
  };

  const changeMonthYear = e => {
    console.log(e.target.dataset.type);
    if (e.target.dataset.type === "prev-year")
      setDate(
        new Date(date.getFullYear() - 1, date.getMonth(), date.getDate())
      );
    else if (e.target.dataset.type === "prev-month")
      setDate(
        new Date(date.getFullYear(), date.getMonth() - 1, date.getDate())
      );
    else if (e.target.dataset.type === "next-month")
      //next month
      setDate(
        new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())
      );
    else if (e.target.dataset.type === "next-year")
      //next year
      setDate(
        new Date(date.getFullYear() + 1, date.getMonth(), date.getDate())
      );

    // this.showCalander();
    generatePicker();
  };

  const generateTitle = dateString => {
    return (
      <div className="dp-header">
        <div
          data-type="prev-year"
          className="dp-arrow-l"
          onClick={e => changeMonthYear(e)}
        >
          &lt;&lt;
        </div>
        <div
          data-type="prev-month"
          className="dp-arrow-l"
          onClick={e => changeMonthYear(e)}
        >
          &lt;
        </div>
        <span>
          {dateString[1]} - {dateString[3]}
        </span>
        <div
          data-type="next-month"
          className="dp-arrow-r"
          onClick={e => changeMonthYear(e)}
        >
          &gt;
        </div>
        <div
          data-type="next-year"
          className="dp-arrow-r"
          onClick={e => changeMonthYear(e)}
        >
          &gt;&gt;
        </div>
      </div>
    );
  };

  const generateWeekdays = () => {
    return (
      <ul className="dp-weekdays">
        <li>Sun</li>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
      </ul>
    );
  };

  const generateDays = () => {
    // const daysNumber = new Date(
    //   date.getFullYear(),
    //   date.getMonth() + 1,
    //   0
    // ).getDate();

    const daysNumber = getDaysInMonth(date.getMonth() + 1, date.getFullYear());
    const daysOffset = date.getDate() - daysNumber;
    // let temp = date.toDateString().split(" ")[1];
    let temp;
    let daysEl = document.createElement("div");

    for (var i = daysOffset + 2; i < daysNumber; i++) {
      let newEl = i < 0 ? "span" : "div";
      temp = newElement(newEl, "", "&nbsp;");
      daysEl.appendChild(temp);
      if (i >= 0) temp.innerHTML = i + 1;
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
    }
  };

  const generatePicker = () => {
    return (
      <div
        className="dp-container"
        style={{
          display: showPicker ? "block" : "none"
        }}
      >
        {generateTitle(date.toDateString().split(" "))}
        {generateWeekdays()}

        <div
          className="dp-days"
          onClick={e => dateClicked(e)}
          ref={dpDays}
          // dangerouslySetInnerHTML={{ __html: generateDays(new Date()) }}
        >
          {generateDays()}
        </div>
      </div>
    );
  };

  return (
    <>
      <input
        type="text"
        name="date"
        onClick={e => inputClicked(e)}
        onChange={e => inputClicked(e)}
        value={selectedDate}
      ></input>
      {showPicker && generatePicker()}
    </>
  );
};

export default DatePicker;
