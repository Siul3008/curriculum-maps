const STORAGE_KEY_PREFIX = "completadas";
const SELECTED_CAREER_KEY = "selectedCareer";

const CAREER_METADATA = {
  computacion: {
    title: "Malla Interactiva de Ingeniería en Computación",
    description:
      "Selecciona una materia para ver sus conexiones como diagrama, identifica qué cursos desbloquea y marca tu avance sin perder de vista la ruta completa.",
    legendLabels: {
      mate: "Matemática",
      prog: "Programación",
      compu: "Computación",
      sw: "Software",
      hum: "Humanidades",
      gest: "Gestión",
      ind: "Investigación",
      elect: "Electivas",
      proj: "Proyectos",
      prac: "Práctica",
      deporcult: "Actividad"
    }
  },
  arquitectura: {
    title: "Malla Interactiva de Arquitectura",
    description:
      "Explora la ruta de arquitectura por semestre, visualiza dependencias entre talleres, teoría, urbanismo y técnica, y guarda tu avance por separado.",
    legendLabels: {
      mate: "Geometría y matemática",
      prog: "Ambiental",
      compu: "Técnica y representación",
      sw: "Diseño y composición",
      hum: "Historia y teoría",
      gest: "Gestión",
      ind: "Urbanismo e investigación",
      elect: "Electivas",
      proj: "Laboratorio de proyectos",
      prac: "Práctica y graduación",
      deporcult: "Actividad"
    }
  }
};

const ARCHITECTURE_DATA = [
  {
    label: "Etapa 1",
    name: "I Semestre",
    credits: 18,
    courses: [
      { id: "au1301", code: "AU1301", name: "Introducción a la Arquitectura I", credits: 2, area: "hum" },
      { id: "au1413", code: "AU1413", name: "Laboratorio de Proyectos I: Fundamentos", credits: 5, area: "proj", coreq: ["au1415", "au1417"] },
      { id: "au1415", code: "AU1415", name: "Fundamentos de Diseño", credits: 3, area: "sw", coreq: ["au1413"] },
      { id: "au1416", code: "AU1416", name: "Sistemas de Representación Manual", credits: 2, area: "compu" },
      { id: "au1417", code: "AU1417", name: "Geometría Descriptiva", credits: 3, area: "mate", coreq: ["au1413"] },
      { id: "cs1502", code: "CS1502", name: "Introducción a la Técnica, Ciencia y Tecnología", credits: 1, area: "hum" },
      { id: "ma0101", code: "MA0101", name: "Matemática General", credits: 2, area: "mate" }
    ]
  },
  {
    label: "Etapa 2",
    name: "II Semestre",
    credits: 17,
    courses: [
      { id: "au1303", code: "AU1303", name: "Historia del Arte y la Arquitectura I", credits: 2, area: "hum" },
      { id: "au1501", code: "AU1501", name: "Laboratorio de Proyectos II: Composición Arquitectural", credits: 5, area: "proj", req: ["au1413"] },
      { id: "au1502", code: "AU1502", name: "Introducción a la Investigación", credits: 2, area: "ind" },
      { id: "au1503", code: "AU1503", name: "Composición Arquitectónica I", credits: 3, area: "sw", req: ["au1415"] },
      { id: "ci1106", code: "CI1106", name: "Comunicación Escrita", credits: 2, area: "hum" },
      { id: "fi1503", code: "FI1503", name: "Fundamentos de Física para Arquitectura", credits: 3, area: "compu", req: ["ma0101"] },
      { id: "se1100", code: "SE1100", name: "Actividad Cultural I", credits: 0, area: "deporcult" }
    ]
  },
  {
    label: "Etapa 3",
    name: "III Semestre",
    credits: 18,
    courses: [
      { id: "au1601", code: "AU1601", name: "Laboratorio de Proyectos III: Proceso Proyectual", credits: 6, area: "proj", req: ["au1501"] },
      { id: "au1602", code: "AU1602", name: "Composición Arquitectónica II", credits: 3, area: "sw", req: ["au1503"] },
      { id: "au1603", code: "AU1603", name: "Sistemas Estructurales", credits: 3, area: "compu", req: ["fi1503"] },
      { id: "au1604", code: "AU1604", name: "Historia del Arte y la Arquitectura II", credits: 2, area: "hum", req: ["au1303", "au1502"] },
      { id: "au2104", code: "AU2104", name: "Teoría de la Arquitectura I", credits: 2, area: "hum", req: ["au1301"] },
      { id: "ci1230", code: "CI1230", name: "Inglés I", credits: 2, area: "hum" },
      { id: "se1200", code: "SE1200", name: "Actividad Deportiva I", credits: 0, area: "deporcult" }
    ]
  },
  {
    label: "Etapa 4",
    name: "IV Semestre",
    credits: 18,
    courses: [
      { id: "au1701", code: "AU1701", name: "Laboratorio de Proyectos IV: Espacio Arquitectónico", credits: 6, area: "proj", req: ["au1601", "au1602"], coreq: ["au1702"] },
      { id: "au1702", code: "AU1702", name: "Sistemas de Representación Digital I", credits: 2, area: "compu", req: ["au1417"], coreq: ["au1701"] },
      { id: "au1703", code: "AU1703", name: "Sistemas de Construcción I", credits: 3, area: "compu", req: ["au1603"] },
      { id: "au1704", code: "AU1704", name: "Diseño Bioclimático", credits: 2, area: "sw", req: ["au1601"] },
      { id: "au2103", code: "AU2103", name: "Historia del Arte y Arquitectura de Costa Rica", credits: 2, area: "hum", req: ["au1604"] },
      { id: "au3106", code: "AU3106", name: "Teoría de la Arquitectura II", credits: 2, area: "hum", req: ["au2104"] },
      { id: "ci1107", code: "CI1107", name: "Comunicación Oral", credits: 1, area: "hum" }
    ]
  },
  {
    label: "Etapa 5",
    name: "V Semestre",
    credits: 18,
    courses: [
      { id: "au1801", code: "AU1801", name: "Laboratorio de Proyectos V: Tecnología Constructiva", credits: 6, area: "proj", req: ["au1701"], coreq: ["au1803"] },
      { id: "au1802", code: "AU1802", name: "Sistemas de Representación Digital II", credits: 3, area: "compu", req: ["au1702"] },
      { id: "au1803", code: "AU1803", name: "Sistemas de Construcción II", credits: 3, area: "compu", req: ["au1703"] },
      { id: "au1804", code: "AU1804", name: "Habilitación de Sitio y Paisajismo", credits: 2, area: "sw", req: ["au1704"] },
      { id: "au2110", code: "AU2110", name: "Historia del Arte y Arquitectura de Costa Rica II", credits: 2, area: "hum", req: ["au2103"] },
      { id: "au3107", code: "AU3107", name: "Teoría e Historia del Urbanismo I", credits: 2, area: "ind", req: ["au3106"] }
    ]
  },
  {
    label: "Etapa 6",
    name: "VI Semestre",
    credits: 18,
    courses: [
      { id: "au1901", code: "AU1901", name: "Laboratorio de Proyectos VI: Sostenibilidad", credits: 6, area: "proj", req: ["au1801"], coreq: ["au1903"] },
      { id: "au1902", code: "AU1902", name: "Instalaciones Eléctricas", credits: 2, area: "compu", req: ["au1803"] },
      { id: "au1903", code: "AU1903", name: "Sistemas Ambientales Arquitectónicos I", credits: 3, area: "compu", req: ["au1804"], coreq: ["au1901"] },
      { id: "au1904", code: "AU1904", name: "Composición Urbana I", credits: 3, area: "ind", req: ["au3107"] },
      { id: "au4108", code: "AU4108", name: "Teoría e Historia Urbanismo II", credits: 2, area: "ind", req: ["au3107"] },
      { id: "ci1231", code: "CI1231", name: "Inglés II", credits: 2, area: "hum", req: ["ci1230"] }
    ]
  },
  {
    label: "Etapa 7",
    name: "VII Semestre",
    credits: 17,
    courses: [
      { id: "au2001", code: "AU2001", name: "Laboratorio de Proyectos VII: Urbano-Arquitectónico", credits: 6, area: "proj", req: ["au1901", "au1904"] },
      { id: "au2002", code: "AU2002", name: "Instalaciones Mecánicas", credits: 2, area: "compu", req: ["au1902"] },
      { id: "au2003", code: "AU2003", name: "Sistemas Ambientales Arquitectónicos II", credits: 2, area: "compu", req: ["au1903"] },
      { id: "au2004", code: "AU2004", name: "Metodología de Investigación en Arquitectura y Urbanismo", credits: 3, area: "ind", coreq: ["au2007"] },
      { id: "au2007", code: "AU2007", name: "Composición Urbana II", credits: 3, area: "ind", req: ["au1904"], coreq: ["au2004"] },
      { id: "cs2404", code: "CS2404", name: "Seminario de Problemática Urbana", credits: 1, area: "hum" },
      { id: "fh1000", code: "FH1000", name: "Centros de Formación Humanística", credits: 0, area: "deporcult" },
      { id: "se1400", code: "SE1400", name: "Actividad Cultural-Deportiva", credits: 0, area: "deporcult" }
    ]
  },
  {
    label: "Etapa 8",
    name: "VIII Semestre",
    credits: 17,
    courses: [
      { id: "au2005", code: "AU2005", name: "Laboratorio de Proyectos VIII: Diseño Integral", credits: 6, area: "proj", req: ["au2001", "au2002"] },
      { id: "au2006", code: "AU2006", name: "Planos y Especificaciones Técnicas", credits: 3, area: "compu", req: ["au1802", "au2002"] },
      { id: "au4408", code: "AU4408", name: "Urbanismo Ordenamiento Territorial I", credits: 2, area: "ind", req: ["au4108"] },
      { id: "au4533", code: "AU4533", name: "Práctica de Vinculación", credits: 4, area: "prac", req: ["au2001"] },
      { id: "cs3401", code: "CS3401", name: "Seminario de Estudios Filosóficos Históricos", credits: 2, area: "hum", req: ["ci1106"] }
    ]
  },
  {
    label: "Etapa 9",
    name: "IX Semestre",
    credits: 16,
    courses: [
      { id: "au3001", code: "AU3001", name: "Laboratorio de Proyectos IX: El Ámbito Social", credits: 6, area: "proj", req: ["au2005"] },
      { id: "au3002", code: "AU3002", name: "Presupuesto y Programación de Obra", credits: 3, area: "gest", req: ["au2006"] },
      { id: "au3003", code: "AU3003", name: "Electiva Ambiental", credits: 3, area: "elect", req: ["au2003"] },
      { id: "au4001", code: "AU4001", name: "Patrimonio", credits: 2, area: "hum", req: ["au2110"] },
      { id: "au5409", code: "AU5409", name: "Urbanismo Ordenamiento Territorial II", credits: 2, area: "ind", req: ["au4408"] }
    ]
  },
  {
    label: "Etapa 10",
    name: "X Semestre",
    credits: 16,
    courses: [
      { id: "au4002", code: "AU4002", name: "Laboratorio de Proyectos X: Electivo", credits: 6, area: "proj", req: ["au3001"] },
      { id: "au4003", code: "AU4003", name: "Planificación Urbana y Territorial Aplicadas", credits: 3, area: "ind", req: ["au2007", "au5409"] },
      { id: "au4004", code: "AU4004", name: "Investigación Dirigida", credits: 3, area: "ind", req: ["au2004", "au3001"] },
      { id: "au4005", code: "AU4005", name: "Electiva General", credits: 4, area: "elect", req: ["au2005"] }
    ]
  },
  {
    label: "Etapa final",
    name: "XI Semestre",
    credits: 7,
    highlight: true,
    courses: [
      {
        id: "au8000",
        code: "AU8000",
        name: "Requisito de Graduación",
        credits: 7,
        area: "prac",
        req: ["au1416", "au3002", "au3003", "au4001", "au4002", "au4003", "au4004", "au4005", "au4533", "ci1107", "ci1231", "cs1502", "cs3401", "se1100", "se1200", "se1400"]
      }
    ]
  }
];

let activeCareerId = "computacion";
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
  activeCareerId = careerId;
  localStorage.setItem(SELECTED_CAREER_KEY, careerId);

  document.querySelectorAll(".career-panel").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.career === careerId);
  });

  updateCareerHeader(careerId);
  updateAvailability(careerId);
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

function renderArchitectureMap() {
  const panel = getCareerPanel("arquitectura");
  const board = panel.querySelector(".board");
  board.innerHTML = ARCHITECTURE_DATA.map(buildSemesterMarkup).join("");
}

function initialize() {
  renderArchitectureMap();

  ["computacion", "arquitectura"].forEach((careerId) => {
    const panel = getCareerPanel(careerId);
    restoreProgress(panel, careerId);
  });

  const savedCareerId = localStorage.getItem(SELECTED_CAREER_KEY);
  const initialCareerId = savedCareerId && CAREER_METADATA[savedCareerId] ? savedCareerId : "computacion";
  document.getElementById("careerSelect").value = initialCareerId;
  switchCareer(initialCareerId);

  document.getElementById("careerSelect").addEventListener("change", (event) => {
    selectedCourseIdByCareer[activeCareerId] = null;
    switchCareer(event.target.value);
  });

  document.getElementById("resetProgress").addEventListener("click", resetProgress);
  window.addEventListener("resize", () => drawConnections(activeCareerId));
  window.addEventListener("scroll", () => drawConnections(activeCareerId), { passive: true });
}

window.addEventListener("DOMContentLoaded", initialize);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.error("No se pudo registrar el service worker:", error);
    });
  });
}
