const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// In-memory storage
const complaints = [];

// Routes
app.post("/api/submit", upload.single("file"), (req, res) => {
  try {
    const formData = req.body;

    if (req.file) {
      formData.fileURL = `/uploads/${req.file.filename}`;
      formData.fileName = req.file.originalname;
    }

    const complaint = {
      id: Date.now().toString(),
      timestamp: new Date(),
      status: "Received",
      ...formData,
    };

    // Save to db
    complaints.push(complaint);

    res.status(201).json({
      success: true,
      message: "Malalamiko yamepokelewa",
      data: complaint,
    });
  } catch (error) {
    console.error("Error submitting complaint:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while submitting your complaint",
    });
  }
});

app.get("/api/complaints", (req, res) => {
  res.json(complaints);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
