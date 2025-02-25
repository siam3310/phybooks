const textbooks = [
  {
    id: 1,
    title: "Soptobarna clas 7 - Bangla",
    author: "Siam",
    publishedDate: "29-08-2025",
    semester: 1,
    subject: ["humayun"], // can have more than one value for reference books
    filepath: "/textbooks/semester-6/thermodynamics/soptoborna.pdf",
    image: {
      url: "/textbooks/semester-6/thermodynamics/cover/thermodynamics.jpg",
      width: 126,
      height: 165,
    },
    isReference: false,
    category: [""],
    pages: 255,
    size: 18,
  },
  
  {
    id: 2,
    title: "modern physics",
    author: "Kenneth Krane",
    publishedDate: "August 29, 2021",
    semester: 6,
    subject: ["modern physics"],
    filepath: "/textbooks/semester-6/reference-books/modern-physics.pdf",
    image: {
      url: "/textbooks/semester-6/reference-books/covers/modern-physics.png",
      width: 126,
      height: 157,
    },
    isReference: true,
    category: [""],
    pages: 566,
    size: 22,
  },
  {
    id: 3,
    title: "Astrophysics Is Easy!: An Introduction for the Amateur Astronomer",
    author: "Michael Inglis",
    publishedDate: "2023",
    semester: 6,
    subject: ["relativistic mechanics and astrophysics"],
    filepath:
      "/textbooks/semester-6/reference-books/Astrophysics Is Easy! An Introduction for the Amateur Astronomer.pdf",
    image: {
      url: "/textbooks/semester-6/reference-books/covers/astrophysics-is-easy.jpg",
      width: 126,
      height: 191.5,
    },
    isReference: true,
    category: [],
    pages: 462,
    size: 14,
  },
];

export { textbooks };
