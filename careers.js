// Catálogo central de carreras.
// Para agregar una carrera, añade una entrada con sus metadatos y semestres.
const CAREERS = {
  computacion: {
    name: "Ingeniería en Computación",
    ...({
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
}).computacion,
    semesters: [
  {
    "label": "Etapa 1",
    "name": "I Semestre",
    "credits": 15,
    "courses": [
      {
        "id": "ma1403",
        "code": "MA1403",
        "name": "Matemática Discreta",
        "credits": 4,
        "area": "mate"
      },
      {
        "id": "ic1802",
        "code": "IC1802",
        "name": "Introducción a la Programación",
        "credits": 3,
        "area": "prog"
      },
      {
        "id": "ic1803",
        "code": "IC1803",
        "name": "Taller de Programación",
        "credits": 3,
        "area": "prog"
      },
      {
        "id": "ic1400",
        "code": "IC1400",
        "name": "Fundamentos de Organización de Computadoras",
        "credits": 3,
        "area": "compu"
      },
      {
        "id": "ei1106",
        "code": "EI1106",
        "name": "Comunicación Escrita",
        "credits": 2,
        "area": "hum"
      },
      {
        "id": "se1100",
        "code": "SE1100",
        "name": "Deportes/Cultural",
        "credits": 0,
        "area": "deporcult"
      }
    ]
  },
  {
    "label": "Etapa 2",
    "name": "II Semestre",
    "credits": 18,
    "courses": [
      {
        "id": "ma1102",
        "code": "MA1102",
        "name": "Cálculo Diferencial e Integral",
        "credits": 4,
        "area": "mate",
        "req": [
          "ma1403"
        ]
      },
      {
        "id": "ic2101",
        "code": "IC2101",
        "name": "Programación Orientada a Objetos",
        "credits": 3,
        "area": "prog",
        "req": [
          "ic1802",
          "ic1803"
        ]
      },
      {
        "id": "ic2001",
        "code": "IC2001",
        "name": "Estructuras de Datos",
        "credits": 4,
        "area": "prog",
        "coreq": [
          "ic2101"
        ]
      },
      {
        "id": "ic3101",
        "code": "IC3101",
        "name": "Arquitectura de Computadoras",
        "credits": 4,
        "area": "compu",
        "req": [
          "ic1400",
          "ic1803"
        ]
      },
      {
        "id": "ei1107",
        "code": "EI1107",
        "name": "Comunicación Oral",
        "credits": 1,
        "area": "hum",
        "req": [
          "ei1106"
        ]
      },
      {
        "id": "ci1230",
        "code": "CI1230",
        "name": "Inglés 1",
        "credits": 2,
        "area": "hum"
      },
      {
        "id": "se1200",
        "code": "SE1200",
        "name": "Deportes/Cultural",
        "credits": 0,
        "area": "deporcult"
      }
    ]
  },
  {
    "label": "Etapa 3",
    "name": "III Semestre",
    "credits": 18,
    "courses": [
      {
        "id": "ma1103",
        "code": "MA1103",
        "name": "Cálculo y Álgebra Lineal",
        "credits": 4,
        "area": "mate",
        "req": [
          "ma1102"
        ]
      },
      {
        "id": "ic3002",
        "code": "IC3002",
        "name": "Análisis de Algoritmos",
        "credits": 4,
        "area": "prog",
        "req": [
          "ic2001",
          "ma1102"
        ]
      },
      {
        "id": "ic4301",
        "code": "IC4301",
        "name": "Bases de Datos I",
        "credits": 4,
        "area": "prog",
        "req": [
          "ic2001"
        ],
        "coreq": [
          "ma1103"
        ]
      },
      {
        "id": "ic5821",
        "code": "IC5821",
        "name": "Requisitos de Software",
        "credits": 4,
        "area": "sw",
        "coreq": [
          "ic4301",
          "ma1103"
        ]
      },
      {
        "id": "ci1231",
        "code": "CI1231",
        "name": "Inglés 2",
        "credits": 2,
        "area": "hum",
        "req": [
          "ci1230"
        ]
      },
      {
        "id": "se1400",
        "code": "SE1400",
        "name": "Deportes/Cultural",
        "credits": 0,
        "area": "deporcult"
      }
    ]
  },
  {
    "label": "Etapa 4",
    "name": "IV Semestre",
    "credits": 17,
    "courses": [
      {
        "id": "ma2404",
        "code": "MA2404",
        "name": "Probabilidades",
        "credits": 4,
        "area": "mate",
        "req": [
          "ma1103"
        ]
      },
      {
        "id": "ic4700",
        "code": "IC4700",
        "name": "Lenguajes de Programación",
        "credits": 4,
        "area": "prog",
        "req": [
          "ic3002",
          "ic3101"
        ]
      },
      {
        "id": "ic4302",
        "code": "IC4302",
        "name": "Bases de Datos II",
        "credits": 3,
        "area": "prog",
        "req": [
          "ic4301"
        ]
      },
      {
        "id": "ic6821",
        "code": "IC6821",
        "name": "Diseño de Software",
        "credits": 4,
        "area": "sw",
        "req": [
          "ic5821"
        ]
      },
      {
        "id": "cs2101",
        "code": "CS2101",
        "name": "Ambiente Humano",
        "credits": 2,
        "area": "hum",
        "req": [
          "ei1107"
        ]
      }
    ]
  },
  {
    "label": "Etapa 5",
    "name": "V Semestre",
    "credits": 17,
    "courses": [
      {
        "id": "ma3405",
        "code": "MA3405",
        "name": "Estadística",
        "credits": 4,
        "area": "mate",
        "req": [
          "ma2404"
        ]
      },
      {
        "id": "ic5701",
        "code": "IC5701",
        "name": "Compiladores e Intérpretes",
        "credits": 4,
        "area": "prog",
        "req": [
          "ic4700"
        ]
      },
      {
        "id": "ic6831",
        "code": "IC6831",
        "name": "Aseguramiento de la Calidad del Software",
        "credits": 3,
        "area": "sw",
        "req": [
          "ic6821"
        ],
        "coreq": [
          "ic4810"
        ]
      },
      {
        "id": "ic4810",
        "code": "IC4810",
        "name": "Administración de Proyectos",
        "credits": 4,
        "area": "gest",
        "req": [
          "ic5821"
        ]
      },
      {
        "id": "cs3401",
        "code": "CS3401",
        "name": "Seminario EFH",
        "credits": 2,
        "area": "hum",
        "req": [
          "cs2101"
        ]
      }
    ]
  },
  {
    "label": "Etapa 6",
    "name": "VI Semestre",
    "credits": 18,
    "courses": [
      {
        "id": "ic6201",
        "code": "IC6201",
        "name": "Investigación de Operaciones",
        "credits": 4,
        "area": "ind",
        "req": [
          "ma3405"
        ]
      },
      {
        "id": "ic6600",
        "code": "IC6600",
        "name": "Principios de Sistemas Operativos",
        "credits": 4,
        "area": "compu",
        "req": [
          "ic5701"
        ]
      },
      {
        "id": "ic4003",
        "code": "IC4003",
        "name": "Electiva I",
        "credits": 3,
        "area": "elect"
      },
      {
        "id": "ic6871",
        "code": "IC6871",
        "name": "Seguridad del Software",
        "credits": 3,
        "area": "sw",
        "req": [
          "ic4810",
          "ic6831"
        ]
      },
      {
        "id": "ic7900",
        "code": "IC7900",
        "name": "Computación y Sociedad",
        "credits": 2,
        "area": "prog",
        "req": [
          "ic4810"
        ],
        "coreq": [
          "cs3402"
        ]
      },
      {
        "id": "cs3402",
        "code": "CS3402",
        "name": "Seminario EC",
        "credits": 2,
        "area": "hum",
        "req": [
          "cs3401"
        ]
      }
    ]
  },
  {
    "label": "Etapa 7",
    "name": "VII Semestre",
    "credits": 18,
    "courses": [
      {
        "id": "ic6200",
        "code": "IC6200",
        "name": "Inteligencia Artificial",
        "credits": 4,
        "area": "ind",
        "req": [
          "ic6201",
          "ic5701"
        ]
      },
      {
        "id": "ic7602",
        "code": "IC7602",
        "name": "Redes",
        "credits": 4,
        "area": "compu",
        "req": [
          "ic6600"
        ]
      },
      {
        "id": "ic5001",
        "code": "IC5001",
        "name": "Electiva II",
        "credits": 3,
        "area": "elect"
      },
      {
        "id": "ic7841",
        "code": "IC7841",
        "name": "Proyecto de Ingeniería de Software",
        "credits": 3,
        "area": "sw",
        "req": [
          "ic6871",
          "ic6831",
          "ic4302"
        ]
      },
      {
        "id": "ae4208",
        "code": "AE4208",
        "name": "Desarrollo de Emprendedores",
        "credits": 4,
        "area": "proj",
        "coreq": [
          "ic7841"
        ]
      }
    ]
  },
  {
    "label": "Etapa final",
    "name": "VIII Semestre",
    "credits": 12,
    "highlight": true,
    "courses": [
      {
        "id": "ic6524",
        "code": "IC6524",
        "name": "Práctica Profesional",
        "credits": 12,
        "area": "prac",
        "req": [
          "ae4208",
          "ci1231",
          "cs3402",
          "ic2101",
          "ic5001",
          "ic4003",
          "ic6200",
          "ic7602",
          "ic7841",
          "se1100",
          "se1200",
          "se1400"
        ]
      }
    ]
  }
]
  },
  arquitectura: {
    name: "Arquitectura",
    ...({
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
}).arquitectura,
    semesters: [
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
]
  }
};
