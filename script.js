const startingHours = 24;

const starterRows = [
  { purpose: "Sleep", deduct: 8 },
  { purpose: "Eating", deduct: 3 },
  { purpose: "Buffer", deduct: 1 },
  { purpose: "Work", deduct: 8 },
];

let rows = structuredClone(starterRows);

const rowsTable = document.querySelector("#rowsTable");
const remainingNumber = document.querySelector("#remainingNumber");
const statusMessage = document.querySelector("#statusMessage");
const resetButton = document.querySelector("#resetButton");
const addFinalRowButton = document.querySelector("#addFinalRowButton");

function formatHours(hours) {
  return Number.isInteger(hours) ? `${hours}` : `${Number(hours.toFixed(2))}`;
}

function calculateRows() {
  let previous = startingHours;

  return rows.map((row) => {
    const deduct = Number(row.deduct) || 0;
    const remaining = previous - deduct;
    const calculatedRow = {
      ...row,
      previous,
      deduct,
      remaining,
    };

    previous = remaining;
    return calculatedRow;
  });
}

function finalRemaining(calculatedRows) {
  if (calculatedRows.length === 0) {
    return startingHours;
  }

  return calculatedRows[calculatedRows.length - 1].remaining;
}

function createInput({ label, value, type, step, min, className, index }) {
  const input = document.createElement("input");

  input.setAttribute("aria-label", label);
  input.dataset.index = index;
  input.type = type;
  input.value = value;
  input.className = className;

  if (step) {
    input.step = step;
  }

  if (min !== undefined) {
    input.min = min;
  }

  return input;
}

function renderRows() {
  const calculatedRows = calculateRows();
  rowsTable.innerHTML = "";

  calculatedRows.forEach((row, index) => {
    const tableRow = document.createElement("tr");
    const purposeCell = document.createElement("td");
    const previousCell = document.createElement("td");
    const deductCell = document.createElement("td");
    const remainingCell = document.createElement("td");
    const actionCell = document.createElement("td");
    const purposeInput = createInput({
      label: `Purpose for row ${index + 1}`,
      value: row.purpose,
      type: "text",
      className: "purpose-input",
      index,
    });
    const deductInput = createInput({
      label: `Hours to deduct for row ${index + 1}`,
      value: row.deduct,
      type: "number",
      step: "0.25",
      min: "0",
      className: "deduct-input",
      index,
    });
    const addButton = document.createElement("button");
    const removeButton = document.createElement("button");

    previousCell.dataset.index = index;
    previousCell.className = "previous-output";
    previousCell.textContent = formatHours(row.previous);
    remainingCell.dataset.index = index;
    remainingCell.className = `remaining-output${row.remaining < 0 ? " negative" : ""}`;
    remainingCell.textContent = formatHours(row.remaining);

    addButton.type = "button";
    addButton.className = "small-button add-below";
    addButton.dataset.index = index;
    addButton.textContent = "Add row beneath";

    removeButton.type = "button";
    removeButton.className = "small-button remove-row";
    removeButton.dataset.index = index;
    removeButton.textContent = "Remove";

    purposeCell.append(purposeInput);
    deductCell.append(deductInput);
    actionCell.append(addButton, removeButton);
    tableRow.append(purposeCell, previousCell, deductCell, remainingCell, actionCell);
    rowsTable.append(tableRow);
  });

  renderSummary(calculatedRows);
}

function updateCalculatedCells() {
  const calculatedRows = calculateRows();

  calculatedRows.forEach((row, index) => {
    const previousCell = rowsTable.querySelector(`.previous-output[data-index="${index}"]`);
    const remainingCell = rowsTable.querySelector(`.remaining-output[data-index="${index}"]`);

    previousCell.textContent = formatHours(row.previous);
    remainingCell.textContent = formatHours(row.remaining);
    remainingCell.classList.toggle("negative", row.remaining < 0);
  });

  renderSummary(calculatedRows);
}

function renderSummary(calculatedRows = calculateRows()) {
  const remaining = finalRemaining(calculatedRows);

  remainingNumber.textContent = formatHours(remaining);
  statusMessage.classList.toggle("warning", remaining < 0);
  statusMessage.textContent = remaining < 0
    ? `You are ${formatHours(Math.abs(remaining))} hours over your 24-hour day.`
    : `Start with ${startingHours} hours, deduct each row, and keep the final number above.`;
}

function addRowAfter(index) {
  rows.splice(index + 1, 0, { purpose: "New block", deduct: 0 });
  renderRows();
}

rowsTable.addEventListener("input", (event) => {
  const index = Number(event.target.dataset.index);

  if (!Number.isInteger(index)) {
    return;
  }

  if (event.target.classList.contains("purpose-input")) {
    rows[index].purpose = event.target.value;
  }

  if (event.target.classList.contains("deduct-input")) {
    rows[index].deduct = Number(event.target.value);
    updateCalculatedCells();
  }
});

rowsTable.addEventListener("click", (event) => {
  const index = Number(event.target.dataset.index);

  if (!Number.isInteger(index)) {
    return;
  }

  if (event.target.classList.contains("add-below")) {
    addRowAfter(index);
  }

  if (event.target.classList.contains("remove-row")) {
    rows.splice(index, 1);
    renderRows();
  }
});

addFinalRowButton.addEventListener("click", () => {
  rows.push({ purpose: "New block", deduct: 0 });
  renderRows();
});

resetButton.addEventListener("click", () => {
  rows = structuredClone(starterRows);
  renderRows();
});

renderRows();
