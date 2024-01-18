const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");

async function changeTextInPdf(inputPath, outputPath, newText) {
  const pdfBytes = fs.readFileSync(inputPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const pointToCm = (pointValue) => pointValue * (2.54 / 72);

  firstPage.drawText(newText, {
    x: 250, //0 => 500
    y: 700, //0 => 1000
    size: 50,
    color: rgb(0, 0, 0),
  });

  const modifiedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, modifiedPdfBytes);
}

module.exports = {
  changeTextInPdf,
};

// const { PDFDocument, rgb } = require("pdf-lib");
// const fs = require("fs");

// async function changeTextInPdf(inputPath, outputPath, existingText, newText) {
//   const pdfBytes = fs.readFileSync(inputPath);
//   const pdfDoc = await PDFDocument.load(pdfBytes);

//   const pages = pdfDoc.getPages();
//   const firstPage = pages[0];

//   const textFound = firstPage.getText().includes(existingText);
//   if (textFound) {
//     firstPage.drawText(newText, {
//       x: 50,
//       y: 500,
//       size: 50,
//       color: rgb(0, 0, 0),
//     });
//   } else {
//     console.log("Teks tidak ditemukan dalam PDF");
//     return;
//   }

//   const modifiedPdfBytes = await pdfDoc.save();
//   fs.writeFileSync(outputPath, modifiedPdfBytes);
// }

// module.exports = {
//   changeTextInPdf,
// };
