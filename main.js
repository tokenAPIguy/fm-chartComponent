"use strict";

// DOM elements
const day = document.querySelectorAll(".day");
const columns = document.querySelectorAll(".bar");
const popup = document.querySelectorAll(".popup");

// Async function to generate graph
async function displayGraph() {
  const res = await fetch("./data.json");
  const data = await res.json();

  // Create days array
  const days = data.map((n) => {
    return n.day;
  });

  // Create amount array
  const amount = data.map((n) => {
    return n.amount;
  });

  // Add days to the graph x axis
  day.forEach((day, i) => {
    day.textContent = days[i];
  });

  // Render each bar
  columns.forEach((column, i) => {
    column.style.height = `${amount[i] * 5}px`;

    // Apply mouseover + mouseout event for displaying popup and hover effects
    column.addEventListener("mouseover", () => {
      columns[i].classList.add("active");
      popup[i].classList.remove("hidden");
    });

    column.addEventListener("mouseout", () => {
      columns[i].classList.remove("active");
      popup[i].classList.add("hidden");
    });
  });

  // Render popup
  popup.forEach((popup, i) => {
    popup.textContent = `$${amount[i]}`;
  });
}
displayGraph();
