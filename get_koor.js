// // extractTextAndFindPosition.js
// const Tesseract = require("tesseract.js");

// async function extractTextAndFindPosition(pdfPath, searchText) {
//   const ocrOptions = {
//     lang: "eng",
//   };

//   try {
//     const result = await Tesseract.recognize(pdfPath, ocrOptions);
//     const extractedText = result.data.text;

//     const textIndex = extractedText.indexOf(searchText);

//     if (textIndex !== -1) {
//       // Temukan posisi awal dan akhir kata
//       const startPosition = result.data.lines[textIndex].box;
//       const endPosition =
//         result.data.lines[textIndex + searchText.length - 1].box;

//       return { startPosition, endPosition };
//     } else {
//       return { error: "Kata tidak ditemukan." };
//     }
//   } catch (error) {
//     console.error("Error during OCR:", error);
//     return { error: "Terjadi kesalahan dalam proses OCR." };
//   }
// }

// module.exports = { extractTextAndFindPosition };

const fs = require("fs");
const pdfParse = require("pdf-parse");

async function extractTextAndFindPosition(pdfPath, searchText) {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);

    const textIndex = data.text.indexOf(searchText);

    if (textIndex !== -1) {
      // Temukan posisi awal dan akhir kata
      const startPosition = textIndex;
      const endPosition = textIndex + searchText.length - 1;

      return { x: startPosition, y: endPosition };
    } else {
      return { error: "Kata tidak ditemukan." };
    }
  } catch (error) {
    console.error("Error during PDF parsing:", error);
    return { error: "Terjadi kesalahan selama parsing PDF." };
  }
}

module.exports = { extractTextAndFindPosition };

// const pdf = require("pdf-parse");
// const fs = require("fs");

// async function extractTextAndFindPosition(pdfPath, searchText) {
//   let dataBuffer = fs.readFileSync(pdfPath);

//   pdf(dataBuffer)
//     .then(function (data) {
//       // number of rendered pages
//       console.log(data.numpages);
//       // number of rendered pages
//       console.log(data.numrender);
//       // PDF info
//       console.log(data.info);
//       // PDF metadata
//       console.log(data.metadata);
//       // PDF.js version
//       // check https://mozilla.github.io/pdf.js/getting_started/
//       console.log(data.version);
//       // PDF text
//       console.log(data.text);

//       const extractedText = data.text;
//       const textIndex = extractedText.indexOf(searchText);

//       if (textIndex !== -1) {
//         // Temukan posisi awal dan akhir kata
//         const startPosition = textIndex;
//         const endPosition = textIndex + searchText.length - 1;

//         return { startPosition, endPosition };
//       } else {
//         return { error: "Kata tidak ditemukan." };
//       }
//     })
//     .catch(function (error) {
//       console.error("Error during PDF parsing:", error);
//       return { error: "Terjadi kesalahan selama parsing PDF." };
//     });
// }

// module.exports = { extractTextAndFindPosition };

// extractTextAndFindPosition.js
// const pdfParse = require("pdf-parse");
// const fs = require("fs").promises;

// function extractTextAndFindPosition(pdfPath, searchText) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       // Baca isi dokumen PDF
//       const pdfData = await fs.readFile(pdfPath);
//       console.log("testing");

//       // Ekstraksi teks dari dokumen PDF
//       const pdfText = await pdfParse(pdfData);
//       console.log("testing2");
//       // Lakukan pencarian pada teks
//       const textIndex = pdfText.text.indexOf(searchText);

//       if (textIndex !== -1) {
//         console.log("testing3");
//         // Temukan posisi awal dan akhir kata
//         const startPosition = pdfText.text[textIndex].box;
//         console.log("testing4");
//         const endPosition = pdfText.text[textIndex + searchText.length - 1].box;

//         return console.log({
//           startPosition,
//           endPosition,
//         });
//       } else {
//         reject({ error: "Kata tidak ditemukan." });
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       reject({ error: "Terjadi kesalahan dalam memproses permintaan" });
//     }
//   });
// }

// module.exports = { extractTextAndFindPosition };
