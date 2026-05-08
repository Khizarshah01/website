const mongoose = require("mongoose");

const BUCKET_NAME = "uploads";
const VALID_CATEGORIES = new Set(["images", "documents", "nirf"]);

const normalizeCategory = (category = "") => {
  const normalized = String(category || "").trim().toLowerCase();
  return VALID_CATEGORIES.has(normalized) ? normalized : null;
};

const getBucket = () => {
  if (!mongoose.connection?.db) {
    throw new Error("Database connection is not ready for upload storage.");
  }
  return new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: BUCKET_NAME,
  });
};

const getFilesCollection = () => {
  if (!mongoose.connection?.db) {
    throw new Error("Database connection is not ready for upload storage.");
  }
  return mongoose.connection.db.collection(`${BUCKET_NAME}.files`);
};

const uploadBufferToGridFS = async ({
  buffer,
  filename,
  contentType,
  category,
  originalName = "",
}) => {
  const normalizedCategory = normalizeCategory(category);
  if (!normalizedCategory) {
    throw new Error("Invalid upload category.");
  }

  return new Promise((resolve, reject) => {
    const bucket = getBucket();
    const uploadStream = bucket.openUploadStream(filename, {
      contentType,
      metadata: {
        category: normalizedCategory,
        originalName,
      },
    });

    uploadStream.on("error", reject);
    uploadStream.on("finish", resolve);
    uploadStream.end(buffer);
  });
};

const findLatestFileByName = async (filename, category) => {
  const normalizedCategory = normalizeCategory(category);
  if (!normalizedCategory || !filename) return null;

  return getFilesCollection().findOne(
    {
      filename,
      "metadata.category": normalizedCategory,
    },
    {
      sort: { uploadDate: -1 },
    },
  );
};

const listFilesByCategory = async (category) => {
  const normalizedCategory = normalizeCategory(category);
  if (!normalizedCategory) return [];

  return getFilesCollection()
    .find({ "metadata.category": normalizedCategory })
    .sort({ uploadDate: -1 })
    .toArray();
};

const deleteFilesByName = async (filename, category) => {
  const normalizedCategory = normalizeCategory(category);
  if (!normalizedCategory || !filename) return 0;

  const files = await getFilesCollection()
    .find({
      filename,
      "metadata.category": normalizedCategory,
    })
    .toArray();

  const bucket = getBucket();
  for (const file of files) {
    await bucket.delete(file._id);
  }

  return files.length;
};

module.exports = {
  normalizeCategory,
  uploadBufferToGridFS,
  findLatestFileByName,
  listFilesByCategory,
  deleteFilesByName,
  getBucket,
};
