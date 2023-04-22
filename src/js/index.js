"use strict";
import "../sass/main.scss";

const form = document.querySelector(".form");
const inputDay = document.getElementById("day");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");

const outputDay = document.getElementById("render-output-day");
const outputMonth = document.getElementById("render-output-month");
const outputYear = document.getElementById("render-output-year");

const extreamError = document.getElementById("extream-error");

//Dark mode veriables
const darkModeToggle = document.getElementById("dark-mode-checkbox");
const root = document.documentElement;

//////////////////////////////////
//dark mode feature
const darkMode = function () {
  if (darkModeToggle.checked === true) {
    root.classList.add("dark-mode");
  } else {
    root.classList.remove("dark-mode");
  }
};

darkModeToggle.addEventListener("change", darkMode);
window.addEventListener("load", darkMode);
//////////////////////////////////

//Validation funtions
const validateYear = function (year) {
  const currentYear = new Date().getFullYear();
  return year > 0 && year <= currentYear;
};

const validateMonth = function (month) {
  return month >= 1 && month <= 12;
};
const validateDay = function (day, month, year) {
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  return day >= 1 && day <= lastDayOfMonth;
};

///////////////
//Error output
const renderError = function (status, element) {
  const msgError = element.nextElementSibling;
  const fieldName = element.name;

  switch (status) {
    case "empty":
      msgError.textContent = `${fieldName} cannot be empty`;
      element.style.borderColor = "var(--light-red)";
      break;
    case "invalid":
      msgError.textContent = `Must be a valid ${fieldName.toLowerCase()}`;
      element.style.borderColor = "var(--light-red)";
      break;
    case "future":
      msgError.textContent = "Must be in the past";
      element.style.borderColor = "var(--light-red)";
      break;
    default:
      msgError.textContent = "";
      element.style.borderColor = null;
  }
};
//////////////////////
inputYear.addEventListener("input", function () {
  let inputValue = this.value;
  const currentYear = new Date().getFullYear();
  extreamError.textContent = null;

  if (inputValue === "") {
    renderError("empty", this);
  } else if (inputValue < 1) {
    renderError("invalid", this);
  } else if (inputValue > currentYear) {
    renderError("future", this);
  } else {
    renderError("", this);
  }
});

inputMonth.addEventListener("input", function () {
  let inputValue = this.value;
  const day = inputDay.value;
  const lastDayOfMonth = new Date(
    inputYear.value,
    inputMonth.value,
    0
  ).getDate();
  extreamError.textContent = null;

  if (inputValue === "") {
    renderError("empty", this);
  } else if (inputValue < 1 || inputValue > 12) {
    renderError("invalid", this);
  } else if (day > lastDayOfMonth) {
    renderError("invalid", inputDay);
  } else {
    renderError("", this);
    renderError("", inputDay);
  }
});

inputDay.addEventListener("input", function () {
  let inputValue = this.value;
  const lastDayOfMonth = new Date(
    inputYear.value,
    inputMonth.value,
    0
  ).getDate();

  extreamError.textContent = null;

  if (inputValue === "") {
    renderError("empty", this);
  } else if (inputValue > lastDayOfMonth || inputValue < 1) {
    renderError("invalid", this);
  } else {
    renderError("", this);
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const validYear = validateYear(inputYear.value);
  const validMonth = validateMonth(inputMonth.value);
  const validDay = validateDay(
    inputDay.value,
    inputMonth.value,
    inputYear.value
  );

  if (validDay && validYear && validMonth) {
    const today = new Date();
    const birth = new Date(
      `${inputYear.value}-${inputMonth.value}-${inputDay.value}`
    );

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (birth > today) {
      return (extreamError.textContent =
        "Date of birth can't be in the future");
    }

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      days = lastDayOfMonth - birth.getDate() + today.getDate();
      months--;
      if (months < 0) {
        months += 12;
        years--;
      }
    }

    outputYear.textContent = years;
    outputMonth.textContent = months;
    outputDay.textContent = days;
  }
});
