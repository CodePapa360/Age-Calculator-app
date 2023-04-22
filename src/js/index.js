"use strict";
import "../sass/main.scss";

const form = document.querySelector(".form");
const inputDay = document.getElementById("day");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");

const outputDay = document.getElementById("render-output-day");
const outputMonth = document.getElementById("render-output-month");
const outputYear = document.getElementById("render-output-year");

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

inputYear.addEventListener("input", function () {
  let inputValue = this.value;
  const msgError = this.nextElementSibling;
  const currentYear = new Date().getFullYear();

  if (inputValue === "") {
    msgError.textContent = "Year can not be empty";
    this.style.borderColor = "var(--light-red)";
  } else if (inputValue < 1) {
    msgError.textContent = "Must be a valid year";
    this.style.borderColor = "var(--light-red)";
  } else if (inputValue > currentYear) {
    msgError.textContent = "Must be in the past";
    this.style.borderColor = "var(--light-red)";
  } else {
    msgError.textContent = "";
    this.style.borderColor = null;
  }
});

inputMonth.addEventListener("input", function () {
  let inputValue = this.value;
  const msgError = this.nextElementSibling;
  const day = inputDay.value;
  const msgErrorDay = inputDay.nextElementSibling;
  const lastDayOfMonth = new Date(
    inputYear.value,
    inputMonth.value,
    0
  ).getDate();

  if (inputValue === "") {
    msgError.textContent = "Month can not be empty";
    this.style.borderColor = "var(--light-red)";
  } else if (inputValue < 1) {
    msgError.textContent = "Must be a valid month";
    this.style.borderColor = "var(--light-red)";
  } else if (day > lastDayOfMonth) {
    msgErrorDay.textContent = "Must be a valid day";
    inputDay.style.borderColor = "var(--light-red)";
  } else if (inputValue > 12) {
    msgError.textContent = "Must be a valid month";
    this.style.borderColor = "var(--light-red)";
  } else {
    msgError.textContent = "";
    this.style.borderColor = null;
    inputDay.style.borderColor = null;
    msgErrorDay.textContent = "";
  }
});

inputDay.addEventListener("input", function () {
  let inputValue = this.value;
  const msgError = this.nextElementSibling;
  const lastDayOfMonth = new Date(
    inputYear.value,
    inputMonth.value,
    0
  ).getDate();

  if (inputValue === "") {
    msgError.textContent = "Day can not be empty";
    this.style.borderColor = "var(--light-red)";
  } else if (inputValue > lastDayOfMonth) {
    msgError.textContent = "Must be a valid day";
    this.style.borderColor = "var(--light-red)";
  } else if (inputValue < 1) {
    msgError.textContent = "Must be a valid day";
    this.style.borderColor = "var(--light-red)";
  } else {
    msgError.textContent = "";
    this.style.borderColor = null;
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
    const d = inputDay.value;
    const m = inputMonth.value - 1;
    const y = inputYear.value;
    const birth = new Date(y, m, d);

    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

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
