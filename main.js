"use strict";

// DOM elements
const days = document.querySelectorAll(".day");
const columns = document.querySelectorAll(".column");
const popups = document.querySelectorAll(".popup");

// Fetch data from data.json
async function displayGraph() {
  const res = await fetch("./data.json");
  const data = await res.json();

  // Map 'day' to an array
  const colTitle = data.map((n) => {
    return n.day;
  });

  // Map 'amount' to an array
  const amount = data.map((n) => {
    return n.amount;
  });

  // Render day of the week on x axis title
  days.forEach((day, index) => {
    day.textContent = colTitle[index];
  });

  // Render bars on graph
  columns.forEach((column, index) => {
    column.style.height = `${amount[index] * 5}px`;

    // Add hover effects for color shift and popup reveal
    column.addEventListener("mouseover", () => {
      column.classList.add("active");
      popups[index].classList.remove("hidden");
    });
    column.addEventListener("mouseout", () => {
      column.classList.remove("active");
      popups[index].classList.add("hidden");
    });
  });

  // Render popup on graph
  popups.forEach((popup, index) => {
    popup.textContent = `$${amount[index]}`;
  });
}
displayGraph();
