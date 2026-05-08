const News = require("../models/News");
const Event = require("../models/Event");

const defaultNews = [
  {
    title: "SWAYAM/NPTEL Registration Open for Quantum Computing Courses",
    description:
      "Registration open for courses on Quantum Computing and Quantum Technology via SWAYAM/NPTEL portal.",
    content:
      "Registration open for courses on Quantum Computing and Quantum Technology via SWAYAM/NPTEL portal.",
    category: "General",
    publishDate: new Date("2026-01-24T00:00:00.000Z"),
    isActive: true,
  },
  {
    title: "International Conference ICICGR 2026 by E&TC Dept",
    description:
      "International Conference on Innovations in Communication, Geoscience and Robotics scheduled for 24-25 April 2026.",
    content:
      "International Conference on Innovations in Communication, Geoscience and Robotics scheduled for 24-25 April 2026.",
    category: "Event",
    publishDate: new Date("2025-11-13T00:00:00.000Z"),
    isActive: true,
  },
  {
    title: "TCS Accredits SSGMCE as Top Priority College",
    description:
      "Tata Consultancy Services officially accredited SSGMCE as a Top Priority College for campus placements.",
    content:
      "Tata Consultancy Services officially accredited SSGMCE as a Top Priority College for campus placements.",
    category: "Placement",
    publishDate: new Date("2025-07-09T00:00:00.000Z"),
    isActive: true,
  },
  {
    title: "Gold Medal at Khelo India Games",
    description:
      "Jayashri Shetye (Electrical Engg) won gold at Khelo India Games held at Diu & Daman.",
    content:
      "Jayashri Shetye (Electrical Engg) won gold at Khelo India Games held at Diu & Daman.",
    category: "Achievement",
    publishDate: new Date("2025-07-03T00:00:00.000Z"),
    isActive: true,
  },
  {
    title: "Drone Club Wins First Prize at SPARK 2025",
    description:
      "Students secured First Prize at National Level SPARK 2025 competition in drone technology.",
    content:
      "Students secured First Prize at National Level SPARK 2025 competition in drone technology.",
    category: "Achievement",
    publishDate: new Date("2025-04-17T00:00:00.000Z"),
    isActive: true,
  },
  {
    title: "NAAC Accreditation Received",
    description:
      "SSGMCE successfully receives NAAC accreditation in the 3rd cycle. Congratulations to all stakeholders.",
    content:
      "SSGMCE successfully receives NAAC accreditation in the 3rd cycle. Congratulations to all stakeholders.",
    category: "General",
    publishDate: new Date("2024-12-21T00:00:00.000Z"),
    isActive: true,
  },
];

const defaultEvents = [
  {
    title: "ICICGR 2026 - International Conference",
    description: "Innovations in Communication, Geoscience and Robotics",
    eventDate: new Date("2026-04-24T09:00:00.000Z"),
    location: "E&TC Department",
    organizer: "E&TC Department",
    category: "Conference",
    isActive: true,
  },
  {
    title: "Pursuit 2026 - Technical Festival",
    description: "Annual technical fest with competitions and workshops",
    eventDate: new Date("2026-01-01T09:00:00.000Z"),
    location: "SSGMCE Campus",
    organizer: "SSGMCE",
    category: "Technical",
    isActive: true,
  },
  {
    title: "Parishkriti 2026 - Cultural Festival",
    description: "Annual cultural celebration with performances and events",
    eventDate: new Date("2026-01-01T09:00:00.000Z"),
    location: "SSGMCE Campus",
    organizer: "SSGMCE",
    category: "Cultural",
    isActive: true,
  },
];

async function seedHomepageContent() {
  for (const item of defaultNews) {
    await News.updateOne({ title: item.title }, { $setOnInsert: item }, { upsert: true });
  }

  for (const item of defaultEvents) {
    await Event.updateOne({ title: item.title }, { $setOnInsert: item }, { upsert: true });
  }
}

module.exports = {
  seedHomepageContent,
};
