const express = require("express");
const app = express.Router();

const multer = require("multer");
const { changeTextInPdf } = require("./post_word");
const { extractTextAndFindPosition } = require("./get_koor");
const { changeTextInPdfV2 } = require("./fus_pos_koor");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "daftar_surat/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app
  .post("/post-word", upload.single("file"), async (req, res) => {
    const inputPath = `daftar_surat/${req.file.filename}`;
    const outputPath = `daftar_surat/${req.file.originalname.replace(
      ".pdf",
      "_modified.pdf"
    )}`;
    const existingText = "xxxxx";
    const newText = "Januari 9, 2024";

    try {
      await changeTextInPdf(inputPath, outputPath, existingText, newText);

      console.log("Perubahan teks pada PDF berhasil disimpan ke", outputPath);
      res.json(`Perubahan teks pada PDF berhasil disimpan ke ${outputPath}`);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json("Terjadi kesalahan dalam memproses permintaan");
    }
  })

  .post("/get-koor", upload.single("file"), async (req, res) => {
    const pdfPath = `daftar_surat/${req.file.filename}`;

    const searchText = "xxxxx";
    try {
      extractTextAndFindPosition(pdfPath, searchText)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json("Terjadi kesalahan dalam memproses permintaan");
    }
  })

  .post("/fusion", upload.single("file"), async (req, res) => {
    const inputPath = `daftar_surat/${req.file.filename}`;
    const outputPath = `daftar_surat/${req.file.originalname.replace(
      ".pdf",
      "_modified.pdf"
    )}`;
    const searchText = "xxxxx";
    const newText = "Januari 9, 2024";

    try {
      await changeTextInPdfV2(inputPath, outputPath, searchText, newText);

      console.log("Perubahan teks pada PDF berhasil disimpan ke", outputPath);
      res.json(`Perubahan teks pada PDF berhasil disimpan ke ${outputPath}`);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json("Terjadi kesalahan dalam memproses permintaan");
    }
  });

module.exports = app;
