require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    const PageContent = require("./models/PageContent");
    const p = await PageContent.findOne({ pageId: "admissions-process" });
    if (p) {
      console.log(
        "found, template:",
        p.template,
        "sections:",
        p.sections.length,
      );
      p.sections.forEach((s) =>
        console.log(" type:" + s.type, "id:" + s.sectionId),
      );
    } else {
      console.log("NOT FOUND in DB");
    }
    await mongoose.disconnect();
  })
  .catch((e) => console.log("ERR", e.message));
