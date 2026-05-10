const dayHours = 24;
const minutesPerSlot = 30;
const totalSlots = (dayHours * 60) / minutesPerSlot;

const starterBlocks = [
  { name: "Sleep", hours: 8, color: "#312e81" },
  { name: "Eating", hours: 3, color: "#f97316" },
  { name: "Buffer", hours: 1, color: "#14b8a6" },
  { name: "Work", hours: 8, color: "#2563eb" },
];

let blocks = structuredClone(starterBlocks);

const form = document.querySelector("#blockForm");
const blocksTable = document.querySelector("#blocksTable");
const equation = document.querySelector("#equation");
const plannedHours = document.querySelector("#plannedHours");
const remainingHours = document.querySelector("#remainingHours");
const plannedSlots = document.querySelector("#plannedSlots");
const statusMessage = document.querySelector("#statusMessage");
const timeline = document.querySelector("#timeline");
const resetButton = document.querySelector("#resetButton");

function formatHours(hours) {
  return Number.isInteger(hours) ? `${hours}` : `${hours.toFixed(1)}`;
}

function blockSlots(hours) {
  return Math.round((hours * 60) / minutesPerSlot);
}

function textColorForBackground(hexColor) {
  const red = Number.parseInt(hexColor.slice(1, 3), 16);
  const green = Number.parseInt(hexColor.slice(3, 5), 16);
  const blue = Number.parseInt(hexColor.slice(5, 7), 16);
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

  return brightness > 150 ? "#172033" : "#ffffff";
}

function renderTable() {
  blocksTable.innerHTML = "";

  blocks.forEach((block, index) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const swatch = document.createElement("span");
    const hoursCell = document.createElement("td");
    const slotsCell = document.createElement("td");
    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");

    swatch.className = "swatch";
    swatch.style.background = block.color;
    nameCell.append(swatch, block.name);
    hoursCell.textContent = formatHours(block.hours);
    slotsCell.textContent = blockSlots(block.hours);
    deleteButton.className = "delete";
    deleteButton.type = "button";
    deleteButton.dataset.index = index;
    deleteButton.textContent = "Remove";
    actionCell.append(deleteButton);
    row.append(nameCell, hoursCell, slotsCell, actionCell);
    blocksTable.append(row);
  });
}

function renderSummary() {
  const usedHours = blocks.reduce((total, block) => total + block.hours, 0);
  const freeHours = dayHours - usedHours;
  const equationParts = [`${dayHours}hr day`, ...blocks.map((block) => `- ${formatHours(block.hours)}hr ${block.name}`)];

  equation.textContent = `${equationParts.join(" ")} = ${formatHours(freeHours)}hr free`;
  plannedHours.textContent = formatHours(usedHours);
  remainingHours.textContent = formatHours(freeHours);
  plannedSlots.textContent = blockSlots(usedHours);

  statusMessage.classList.toggle("warning", freeHours < 0);
  statusMessage.textContent = freeHours < 0
    ? `You planned ${formatHours(Math.abs(freeHours))} more hours than fit in a day. Remove or shorten a block.`
    : `You still have ${formatHours(freeHours)} hours, or ${blockSlots(freeHours)} half-hour blocks, to assign.`;
}

function buildSlotList() {
  const slots = [];

  blocks.forEach((block) => {
    for (let index = 0; index < blockSlots(block.hours); index += 1) {
      slots.push(block);
    }
  });

  while (slots.length < totalSlots) {
    slots.push({ name: "Free", color: "#e2e8f0" });
  }

  return slots.slice(0, totalSlots);
}

function slotLabel(index) {
  const totalMinutes = index * minutesPerSlot;
  const hours = Math.floor(totalMinutes / 60).toString().padStart(2, "0");
  const minutes = (totalMinutes % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function renderTimeline() {
  timeline.innerHTML = "";
  buildSlotList().forEach((block, index) => {
    const slot = document.createElement("div");
    slot.className = "slot";
    const slotName = document.createElement("strong");
    const slotTime = document.createElement("small");

    slot.style.background = block.color;
    slot.style.color = textColorForBackground(block.color);
    slotName.textContent = block.name;
    slotTime.textContent = slotLabel(index);
    slot.append(slotName, slotTime);
    timeline.append(slot);
  });
}

function render() {
  renderTable();
  renderSummary();
  renderTimeline();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("taskName").trim();
  const hours = Number(formData.get("taskHours"));
  const color = formData.get("taskColor");

  if (!name || !Number.isFinite(hours) || hours <= 0) {
    return;
  }

  blocks.push({ name, hours, color });
  form.reset();
  document.querySelector("#taskHours").value = 1;
  document.querySelector("#taskColor").value = "#4f46e5";
  render();
});

blocksTable.addEventListener("click", (event) => {
  if (!event.target.matches("button.delete")) {
    return;
  }

  blocks.splice(Number(event.target.dataset.index), 1);
  render();
});

resetButton.addEventListener("click", () => {
  blocks = structuredClone(starterBlocks);
  render();
});

render();
