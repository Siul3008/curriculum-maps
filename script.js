const STORAGE_KEY = "completadas";
let selectedCourseId = null;

function getCompletedMap() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

function saveCompletedMap(completedMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(completedMap));
}

function getCourses() {
  return Array.from(document.querySelectorAll(".materia"));
}

function getCourseById(courseId) {
  return document.querySelector(`.materia[data-id="${courseId}"]`);
}

function getRequiredIds(course) {
  return course.dataset.req?.split(",").filter(Boolean) || [];
}

function getCoRequiredIds(course) {
  return course.dataset.coreq?.split(",").filter(Boolean) || [];
}

function requirementsMet(requirements, completedMap) {
  return requirements.every((requirement) => completedMap[requirement]);
}

function selectCourse(course) {
  const isSameCourse = selectedCourseId === course.dataset.id;
  selectedCourseId = isSameCourse ? null : course.dataset.id;
  renderSelection();
}

function toggleCourseCompletion(course) {
  if (course.classList.contains("bloqueada")) {
    return;
  }

  course.classList.toggle("completada");

  const completedMap = getCompletedMap();
  completedMap[course.dataset.id] = course.classList.contains("completada");
  saveCompletedMap(completedMap);

  updateAvailability();
}

function updateAvailability() {
  const completedMap = getCompletedMap();
  const states = {};
  const courses = getCourses();

  courses.forEach((course) => {
    const courseId = course.dataset.id;
    const requirements = getRequiredIds(course);
    const hasCompletedRequirements = requirementsMet(requirements, completedMap);

    if (course.classList.contains("completada")) {
      states[courseId] = "completada";
    } else if (hasCompletedRequirements) {
      states[courseId] = "desbloqueada";
    } else {
      states[courseId] = "bloqueada";
    }
  });

  courses.forEach((course) => {
    const courseId = course.dataset.id;
    const coRequirements = getCoRequiredIds(course);
    const hasCompletedCoRequirements = coRequirements.every((coRequirement) =>
      states[coRequirement] === "completada" || states[coRequirement] === "desbloqueada"
    );
    const toggle = course.querySelector(".status-toggle");

    course.classList.remove("bloqueada", "desbloqueada");

    if (states[courseId] === "completada") {
      course.classList.add("completada");
      toggle.textContent = "Aprobada";
      toggle.disabled = false;
    } else if (states[courseId] === "desbloqueada" && hasCompletedCoRequirements) {
      course.classList.remove("completada");
      course.classList.add("desbloqueada");
      toggle.textContent = "Marcar";
      toggle.disabled = false;
    } else {
      course.classList.remove("completada");
      course.classList.add("bloqueada");
      toggle.textContent = "Bloqueada";
      toggle.disabled = true;
    }
  });

  updateDashboard();
  renderSelection();
}

function updateDashboard() {
  const courses = getCourses();
  const totalCourses = courses.length;
  const completedCourses = courses.filter((course) => course.classList.contains("completada"));
  const availableCourses = courses.filter(
    (course) => course.classList.contains("desbloqueada") && !course.classList.contains("completada")
  );
  const totalCredits = courses.reduce((sum, course) => sum + Number(course.dataset.credits || 0), 0);
  const completedCredits = completedCourses.reduce(
    (sum, course) => sum + Number(course.dataset.credits || 0),
    0
  );
  const progress = totalCourses === 0 ? 0 : Math.round((completedCourses.length / totalCourses) * 100);

  document.getElementById("progressPercent").textContent = `${progress}%`;
  document.getElementById("progressText").textContent =
    `${completedCourses.length} de ${totalCourses} cursos completados`;
  document.getElementById("creditsCompleted").textContent = `${completedCredits}/${totalCredits}`;
  document.getElementById("availableCount").textContent = String(availableCourses.length);
}

function getLinkedCourseIds(courseId) {
  const selectedCourse = getCourseById(courseId);

  if (!selectedCourse) {
    return new Set();
  }

  const linkedIds = new Set([courseId]);
  getRequiredIds(selectedCourse).forEach((id) => linkedIds.add(id));
  getCoRequiredIds(selectedCourse).forEach((id) => linkedIds.add(id));

  getCourses().forEach((course) => {
    if (getRequiredIds(course).includes(courseId) || getCoRequiredIds(course).includes(courseId)) {
      linkedIds.add(course.dataset.id);
    }
  });

  return linkedIds;
}

function renderSelection() {
  const courses = getCourses();
  const hasSelection = Boolean(selectedCourseId);
  const linkedIds = hasSelection ? getLinkedCourseIds(selectedCourseId) : new Set();

  courses.forEach((course) => {
    const isSelected = course.dataset.id === selectedCourseId;
    const isLinked = linkedIds.has(course.dataset.id);

    course.classList.toggle("selected", isSelected);
    course.classList.toggle("related", hasSelection && !isSelected && isLinked);
    course.classList.toggle("faded", hasSelection && !isLinked);
  });

  drawConnections();
}

function buildConnectionPath(fromRect, toRect, containerRect) {
  const startX = fromRect.left + fromRect.width - containerRect.left;
  const startY = fromRect.top + fromRect.height / 2 - containerRect.top;
  const endX = toRect.left - containerRect.left;
  const endY = toRect.top + toRect.height / 2 - containerRect.top;
  const middleX = startX + (endX - startX) / 2;

  return {
    path: `M ${startX} ${startY} C ${middleX} ${startY}, ${middleX} ${endY}, ${endX} ${endY}`,
    endPoint: { x: endX, y: endY }
  };
}

function buildVerticalCoreqPath(fromRect, toRect, containerRect) {
  const fromCenterX = fromRect.left + fromRect.width / 2 - containerRect.left;
  const toCenterX = toRect.left + toRect.width / 2 - containerRect.left;
  const fromIsAbove = fromRect.top < toRect.top;
  const startX = fromCenterX;
  const startY = fromIsAbove
    ? fromRect.bottom - containerRect.top
    : fromRect.top - containerRect.top;
  const endX = toCenterX;
  const endY = fromIsAbove
    ? toRect.top - containerRect.top
    : toRect.bottom - containerRect.top;
  const midY = startY + (endY - startY) / 2;

  return {
    path: `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`,
    endPoint: { x: endX, y: endY }
  };
}

function createLine(svg, pathData, type, endPoint) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathData);
  path.setAttribute("class", `connection-line ${type}`);
  path.style.strokeDashoffset = "1000";
  svg.appendChild(path);

  const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  dot.setAttribute("class", "connection-dot");
  dot.setAttribute("cx", endPoint.x);
  dot.setAttribute("cy", endPoint.y);
  dot.setAttribute("r", "5");
  svg.appendChild(dot);
}

function drawConnections() {
  const svg = document.getElementById("connectionLayer");
  const board = document.getElementById("mallaBoard");

  if (!svg || !board || !selectedCourseId || window.innerWidth <= 860) {
    if (svg) {
      svg.innerHTML = "";
    }
    return;
  }

  const selectedCourse = getCourseById(selectedCourseId);

  if (!selectedCourse) {
    svg.innerHTML = "";
    return;
  }

  const boardRect = board.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${boardRect.width} ${boardRect.height}`);
  svg.innerHTML = "";

  const connections = [];
  const pushConnection = (originCourse, targetCourse, type) => {
    if (!originCourse || !targetCourse) {
      return;
    }

    const originRect = originCourse.getBoundingClientRect();
    const targetRect = targetCourse.getBoundingClientRect();
    const builder = type === "coreq" ? buildVerticalCoreqPath : buildConnectionPath;
    const { path, endPoint } = builder(originRect, targetRect, boardRect);
    connections.push({ path, endPoint, type });
  };

  getRequiredIds(selectedCourse).forEach((targetId) => {
    pushConnection(getCourseById(targetId), selectedCourse, "req");
  });

  getCoRequiredIds(selectedCourse).forEach((targetId) => {
    pushConnection(getCourseById(targetId), selectedCourse, "coreq");
  });

  getCourses().forEach((course) => {
    if (getRequiredIds(course).includes(selectedCourseId)) {
      pushConnection(selectedCourse, course, "req");
    }

    if (getCoRequiredIds(course).includes(selectedCourseId)) {
      pushConnection(selectedCourse, course, "coreq");
    }
  });

  connections.forEach(({ path, endPoint, type }) => {
    createLine(svg, path, type, endPoint);
  });
}

function restoreProgress() {
  const completedMap = getCompletedMap();

  getCourses().forEach((course) => {
    const toggle = course.querySelector(".status-toggle");

    if (completedMap[course.dataset.id]) {
      course.classList.add("completada");
    }

    course.addEventListener("click", () => selectCourse(course));
    course.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectCourse(course);
      }
    });

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleCourseCompletion(course);
    });
  });

  updateAvailability();
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  selectedCourseId = null;

  getCourses().forEach((course) => {
    course.classList.remove("completada", "desbloqueada", "bloqueada", "selected", "related", "faded");
  });

  updateAvailability();
}

window.addEventListener("DOMContentLoaded", () => {
  restoreProgress();
  document.getElementById("resetProgress").addEventListener("click", resetProgress);
  window.addEventListener("resize", drawConnections);
  window.addEventListener("scroll", drawConnections, { passive: true });
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.error("No se pudo registrar el service worker:", error);
    });
  });
}
