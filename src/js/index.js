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

//Validation funtions
//////////////////////////
/// Year validation
const validateYear = function (element) {
  let isValid = true;
  const inputValue = element.value;
  const currentYear = new Date().getFullYear();

  if (inputValue === "") {
    renderError("empty", element);
    isValid = false;
  } else if (inputValue < 1000) {
    renderError("invalid", element);
    isValid = false;
  } else if (inputValue > currentYear) {
    renderError("future", element);
    isValid = false;
  } else {
    renderError("", element);
    isValid = true;
  }

  return isValid;
};

//////////////////////////
/// Month validation
const validateMonth = function (element) {
  let isValid = true;
  const inputValue = element.value;
  const day = inputDay.value;
  const lastDayOfMonth = new Date(
    inputYear.value,
    inputMonth.value,
    0
  ).getDate();

  if (inputValue === "") {
    renderError("empty", element);
    isValid = false;
  } else if (inputValue < 1 || inputValue > 12) {
    renderError("invalid", element);
    isValid = false;
  } else if (day > lastDayOfMonth) {
    renderError("invalid", inputDay);
    isValid = false;
  } else {
    renderError("", element);
    renderError("", inputDay);
    isValid = true;
  }

  return isValid;
};

const validateDay = function (element) {
  let isValid = true;
  const inputValue = element.value;
  const lastDayOfMonth = new Date(
    inputYear.value,
    inputMonth.value,
    0
  ).getDate();

  if (inputValue === "") {
    renderError("empty", element);
    isValid = false;
  } else if (inputValue > lastDayOfMonth || inputValue < 1) {
    renderError("invalid", element);
    isValid = false;
  } else {
    renderError("", element);
    isValid = true;
  }

  return isValid;
};

//////////////////////
inputYear.addEventListener("input", function () {
  validateYear(this);
  extreamError.textContent = null;
});

inputMonth.addEventListener("input", function () {
  validateMonth(this);
  extreamError.textContent = null;
});

inputDay.addEventListener("input", function () {
  validateDay(this);
  extreamError.textContent = null;
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    validateDay(inputDay) &&
    validateMonth(inputMonth) &&
    validateYear(inputYear)
  ) {
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

    outputYear.style.transform = "scale(.5)";
    outputMonth.style.transform = "scale(.5)";
    outputDay.style.transform = "scale(.5)";
    outputYear.style.opacity = "0";
    outputMonth.style.opacity = "0";
    outputDay.style.opacity = "0";

    setTimeout(() => {
      outputYear.textContent = years;
      outputMonth.textContent = months;
      outputDay.textContent = days;

      outputYear.style.transform = "scale(1)";
      outputMonth.style.transform = "scale(1)";
      outputDay.style.transform = "scale(1)";

      outputYear.style.opacity = "1";
      outputMonth.style.opacity = "1";
      outputDay.style.opacity = "1";
    }, 300);

    inputDay.value = "";
    inputMonth.value = "";
    inputYear.value = "";
  }
});

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
