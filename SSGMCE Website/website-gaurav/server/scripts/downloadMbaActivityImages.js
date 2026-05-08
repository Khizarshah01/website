const fs = require("fs");
const path = require("path");

const defaultsPath = path.resolve(__dirname, "../../client/src/data/mbaDefaults.js");
const outputDir = path.resolve(__dirname, "../uploads/images/mba/activities");
const remoteImagePattern =
  /https:\/\/www\.ssgmce\.ac\.in\/images\/mba_faculty\/[^\s"']+/g;

const readActivityImageUrls = () => {
  const fileContent = fs.readFileSync(defaultsPath, "utf8");
  return [...new Set(fileContent.match(remoteImagePattern) || [])].filter(
    (url) => /\/mba_activity/i.test(url) && /\.(png|jpe?g|webp|gif)$/i.test(url),
  );
};

const ensureDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const downloadImage = async (url) => {
  const fileName = url.split("/").pop()?.split("?")[0];
  if (!fileName) {
    throw new Error(`Could not determine file name for ${url}`);
  }

  const destinationPath = path.join(outputDir, fileName);
  if (fs.existsSync(destinationPath)) {
    return { status: "skipped", fileName };
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  const imageBuffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(destinationPath, imageBuffer);

  return { status: "downloaded", fileName };
};

const main = async () => {
  ensureDirectory(outputDir);

  const urls = readActivityImageUrls();
  console.log(`Found ${urls.length} MBA activity images.`);

  const summary = {
    downloaded: 0,
    skipped: 0,
    failed: 0,
  };

  for (const url of urls) {
    try {
      const result = await downloadImage(url);
      summary[result.status] += 1;
      console.log(`${result.status.toUpperCase()}: ${result.fileName}`);
    } catch (error) {
      summary.failed += 1;
      console.error(`FAILED: ${url}`);
      console.error(`  ${error.message}`);
    }
  }

  console.log("\nDownload summary");
  console.log(`Downloaded: ${summary.downloaded}`);
  console.log(`Skipped: ${summary.skipped}`);
  console.log(`Failed: ${summary.failed}`);
  console.log(`Output: ${outputDir}`);
};

main().catch((error) => {
  console.error("Unexpected failure while downloading MBA activity images.");
  console.error(error);
  process.exit(1);
});
