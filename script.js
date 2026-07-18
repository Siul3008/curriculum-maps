const STORAGE_KEY_PREFIX = "completadas";
const SELECTED_CAREER_KEY = "selectedCareer";

const CAREER_METADATA = CAREERS;

let activeCareerId = null;
const selectedCourseIdByCareer = {};

function getCareerStorageKey(careerId) {
  return `${STORAGE_KEY_PREFIX}:${careerId}`;
}

function getCompletedMap(careerId = activeCareerId) {
  return JSON.parse(localStorage.getItem(getCareerStorageKey(careerId))) || {};
}

function saveCompletedMap(completedMap, careerId = activeCareerId) {
  localStorage.setItem(getCareerStorageKey(careerId), JSON.stringify(completedMap));
}

function getCareerPanel(careerId = activeCareerId) {
  return document.querySelector(`.career-panel[data-career="${careerId}"]`);
}

function getActivePanel() {
  return getCareerPanel(activeCareerId);
}

function getCourses(panel = getActivePanel()) {
  return panel ? Array.from(panel.querySelectorAll(".materia")) : [];
}

function getCourseById(courseId, panel = getActivePanel()) {
  return panel?.querySelector(`.materia[data-id="${courseId}"]`) || null;
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

function selectCourse(course, careerId = activeCareerId) {
  const currentSelected = selectedCourseIdByCareer[careerId] || null;
  selectedCourseIdByCareer[careerId] = currentSelected === course.dataset.id ? null : course.dataset.id;
  renderSelection(careerId);
}

function toggleCourseCompletion(course, careerId = activeCareerId) {
  if (course.classList.contains("bloqueada")) {
    return;
  }

  course.classList.toggle("completada");
  const completedMap = getCompletedMap(careerId);
  completedMap[course.dataset.id] = course.classList.contains("completada");
  saveCompletedMap(completedMap, careerId);
  updateAvailability(careerId);
}

function updateAvailability(careerId = activeCareerId) {
  const panel = getCareerPanel(careerId);
  const completedMap = getCompletedMap(careerId);
  const states = {};
  const courses = getCourses(panel);

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

  if (careerId === activeCareerId) {
    updateDashboard(careerId);
    renderSelection(careerId);
  }
}

function updateDashboard(careerId = activeCareerId) {
  const panel = getCareerPanel(careerId);
  const courses = getCourses(panel);
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

function getLinkedCourseIds(courseId, careerId = activeCareerId) {
  const panel = getCareerPanel(careerId);
  const selectedCourse = getCourseById(courseId, panel);

  if (!selectedCourse) {
    return new Set();
  }

  const linkedIds = new Set([courseId]);
  getRequiredIds(selectedCourse).forEach((id) => linkedIds.add(id));
  getCoRequiredIds(selectedCourse).forEach((id) => linkedIds.add(id));

  getCourses(panel).forEach((course) => {
    if (getRequiredIds(course).includes(courseId) || getCoRequiredIds(course).includes(courseId)) {
      linkedIds.add(course.dataset.id);
    }
  });

  return linkedIds;
}

function renderSelection(careerId = activeCareerId) {
  const panel = getCareerPanel(careerId);
  const courses = getCourses(panel);
  const selectedCourseId = selectedCourseIdByCareer[careerId] || null;
  const hasSelection = Boolean(selectedCourseId);
  const linkedIds = hasSelection ? getLinkedCourseIds(selectedCourseId, careerId) : new Set();

  courses.forEach((course) => {
    const isSelected = course.dataset.id === selectedCourseId;
    const isLinked = linkedIds.has(course.dataset.id);

    course.classList.toggle("selected", isSelected);
    course.classList.toggle("related", hasSelection && !isSelected && isLinked);
    course.classList.toggle("faded", hasSelection && !isLinked);
  });

  if (careerId === activeCareerId) {
    drawConnections(careerId);
  }
}

function buildConnectionPath(fromRect, toRect, containerRect) {
  const startX = fromRect.left + fromRect.width - containerRect.left;
  const startY = fromRect.top + fromRect.height / 2 - containerRect.top;
  const endX = toRect.left - containerRect.left;
  const endY = toRect.top + toRect.height / 2 - containerRect.top;
  const middleX = startX + (endX - startX) / 2;

  return {
    path: `M ${startX} ${startY} C ${middleX} ${startY}, ${middleX} ${endY}, ${endX} ${endY}`
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
    path: `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`
  };
}

function createLine(svg, pathData, type) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathData);
  path.setAttribute("class", `connection-line ${type}`);
  path.style.strokeDashoffset = "1000";
  svg.appendChild(path);
}

function drawConnections(careerId = activeCareerId) {
  const panel = getCareerPanel(careerId);
  const svg = panel?.querySelector(".connection-layer");
  const board = panel?.querySelector(".board");
  const selectedCourseId = selectedCourseIdByCareer[careerId] || null;

  if (!svg || !board || !selectedCourseId || window.innerWidth <= 860) {
    if (svg) {
      svg.innerHTML = "";
    }
    return;
  }

  const selectedCourse = getCourseById(selectedCourseId, panel);
  if (!selectedCourse) {
    svg.innerHTML = "";
    return;
  }

  const boardRect = board.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${boardRect.width} ${boardRect.height}`);
  svg.innerHTML = "";

  const courses = getCourses(panel);
  const pushConnection = (originCourse, targetCourse, type) => {
    if (!originCourse || !targetCourse) {
      return;
    }

    const originRect = originCourse.getBoundingClientRect();
    const targetRect = targetCourse.getBoundingClientRect();
    const builder = type === "coreq" ? buildVerticalCoreqPath : buildConnectionPath;
    const { path } = builder(originRect, targetRect, boardRect);
    createLine(svg, path, type);
  };

  getRequiredIds(selectedCourse).forEach((targetId) => {
    pushConnection(getCourseById(targetId, panel), selectedCourse, "req");
  });

  getCoRequiredIds(selectedCourse).forEach((targetId) => {
    pushConnection(getCourseById(targetId, panel), selectedCourse, "coreq");
  });

  courses.forEach((course) => {
    if (getRequiredIds(course).includes(selectedCourseId)) {
      pushConnection(selectedCourse, course, "req");
    }

    if (getCoRequiredIds(course).includes(selectedCourseId)) {
      pushConnection(selectedCourse, course, "coreq");
    }
  });
}

function attachCourseInteractions(panel, careerId) {
  getCourses(panel).forEach((course) => {
    if (course.dataset.bound === "true") {
      return;
    }

    const toggle = course.querySelector(".status-toggle");

    course.addEventListener("click", () => selectCourse(course, careerId));
    course.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectCourse(course, careerId);
      }
    });

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleCourseCompletion(course, careerId);
    });

    course.dataset.bound = "true";
  });
}

function restoreProgress(panel, careerId) {
  const completedMap = getCompletedMap(careerId);

  getCourses(panel).forEach((course) => {
    if (completedMap[course.dataset.id]) {
      course.classList.add("completada");
    }
  });

  attachCourseInteractions(panel, careerId);
}

function resetProgress() {
  localStorage.removeItem(getCareerStorageKey(activeCareerId));
  selectedCourseIdByCareer[activeCareerId] = null;

  getCourses().forEach((course) => {
    course.classList.remove("completada", "desbloqueada", "bloqueada", "selected", "related", "faded");
  });

  updateAvailability(activeCareerId);
}

function updateCareerHeader(careerId) {
  const metadata = CAREER_METADATA[careerId];
  document.getElementById("careerTitle").textContent = metadata.title;
  document.getElementById("careerDescription").textContent = metadata.description;
  updateLegend(careerId);
}

function updateLegend(careerId) {
  const labels = CAREER_METADATA[careerId].legendLabels;

  document.querySelectorAll("[data-legend-item]").forEach((item) => {
    const key = item.dataset.legendItem;
    const label = item.querySelector(".legend-label");

    if (label && labels[key]) {
      label.textContent = labels[key];
    }
  });
}

function switchCareer(careerId) {
  if (!CAREERS[careerId]) {
    return;
  }

  activeCareerId = careerId;
  localStorage.setItem(SELECTED_CAREER_KEY, careerId);

  document.querySelectorAll(".career-panel").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.career === careerId);
  });

  updateCareerHeader(careerId);
  updateAvailability(careerId);
  document.getElementById("catalogView").hidden = true;
  document.getElementById("careerView").hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showCareerCatalog() {
  selectedCourseIdByCareer[activeCareerId] = null;
  renderSelection(activeCareerId);
  document.getElementById("careerView").hidden = true;
  document.getElementById("catalogView").hidden = false;
  renderCareerCards();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function buildCourseMarkup(course) {
  const req = course.req?.join(",") || "";
  const coreq = course.coreq?.join(",") || "";
  const reqAttr = req ? ` data-req="${req}"` : "";
  const coreqAttr = coreq ? ` data-coreq="${coreq}"` : "";

  return `<article class="materia ${course.area}" data-id="${course.id}" data-credits="${course.credits}"${reqAttr}${coreqAttr} tabindex="0"><div class="materia-content"><span>${course.name}</span><small>${course.code} · ${course.credits}</small></div><button class="status-toggle" type="button">Marcar</button></article>`;
}

function buildSemesterMarkup(semester) {
  const courses = semester.courses.map(buildCourseMarkup).join("");
  const highlightClass = semester.highlight ? " highlight" : "";

  return `<section class="semestre${highlightClass}"><div class="semester-heading"><p class="semester-kicker">${semester.label}</p><h2>${semester.name}</h2><span>${semester.credits} créditos</span></div><div class="materias">${courses}</div></section>`;
}

function renderCareerCatalog() {
  const container = document.getElementById("careerPanels");
  container.innerHTML = Object.entries(CAREERS).map(([id, career], index) => `<section class="career-panel${index === 0 ? " is-active" : ""}" data-career="${id}"><main class="diagram-shell"><svg class="connection-layer" aria-hidden="true"></svg><div class="board">${career.semesters.map(buildSemesterMarkup).join("")}</div></main></section>`).join("");
}

function renderCareerCards() {
  const savedCareerId = localStorage.getItem(SELECTED_CAREER_KEY);
  document.getElementById("careerCards").innerHTML = Object.entries(CAREERS)
    .map(([id, career]) => {
      const isRecent = id === savedCareerId;
      return `<button class="career-card" type="button" data-career-choice="${id}"><span class="career-card-icon" aria-hidden="true">${career.name.charAt(0)}</span><span>${career.name}</span>${isRecent ? '<small>Última visitada</small>' : ""}</button>`;
    })
    .join("");
}

function initialize() {
  renderCareerCatalog();
  renderCareerCards();
  Object.keys(CAREERS).forEach((careerId) => {
    const panel = getCareerPanel(careerId);
    restoreProgress(panel, careerId);
  });
  const defaultCareerId = Object.keys(CAREERS)[0];
  activeCareerId = defaultCareerId;
  updateAvailability(activeCareerId);

  document.getElementById("careerCards").addEventListener("click", (event) => {
    const card = event.target.closest("[data-career-choice]");
    if (card) {
      switchCareer(card.dataset.careerChoice);
    }
  });

  document.getElementById("backToCatalog").addEventListener("click", showCareerCatalog);
  document.getElementById("resetProgress").addEventListener("click", resetProgress);
  window.addEventListener("resize", () => drawConnections(activeCareerId));
  window.addEventListener("scroll", () => drawConnections(activeCareerId), { passive: true });
}

window.addEventListener("DOMContentLoaded", initialize);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    let refreshing = false;
    const notice = document.getElementById("updateNotice");
    const showUpdate = (worker) => {
      notice.hidden = false;
      document.getElementById("applyUpdate").onclick = () => {
        worker.postMessage({ type: "SKIP_WAITING" });
      };
    };

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });

    navigator.serviceWorker.register("./sw.js").then((registration) => {
      if (registration.waiting) {
        showUpdate(registration.waiting);
      }

      registration.addEventListener("updatefound", () => {
        const worker = registration.installing;
        worker.addEventListener("statechange", () => {
          if (worker.state === "installed" && navigator.serviceWorker.controller) {
            showUpdate(worker);
          }
        });
      });
    }).catch((error) => {
      console.error("No se pudo registrar el service worker:", error);
    });

    document.getElementById("dismissUpdate").addEventListener("click", () => {
      notice.hidden = true;
    });
  });
}
