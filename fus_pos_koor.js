// fusion of post word and get koor
const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");
const pdfParse = require("pdf-parse");

async function changeTextInPdfV2(inputPath, outputPath, searchText, newText) {
  try {
    const dataBuffer = fs.readFileSync(inputPath);
    const data = await pdfParse(dataBuffer);

    const textIndex = data.text.indexOf(searchText);

    if (textIndex !== -1) {
      // Temukan posisi awal dan akhir kata
      const startPosition = textIndex;
      const endPosition = textIndex + searchText.length - 1;

      const pdfBytes = fs.readFileSync(inputPath);
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const x = startPosition;
      const y = endPosition;

      console.log("x : ", x);
      console.log("y : ", y);

      const pointToCm = (pointValue) => pointValue * (2.54 / 72);

      const fontSize = 50;

      // Background color (white in this example)
      const backgroundColor = rgb(1, 1, 1);

      // Calculate width and height of the text
      const textWidth = newText.length * fontSize * 0.6; // Adjust as needed
      const textHeight = fontSize;

      // Draw background rectangle
      firstPage.drawRectangle({
        x: x * 6.5, // Adjust multiplier as needed
        y: y * 22.5, // Adjust multiplier as needed
        width: textWidth,
        height: textHeight,
        color: backgroundColor,
      });

      firstPage.drawText(newText, {
        x: x * 6.5, // Adjust multiplier as needed
        y: y * 22.5, // Adjust multiplier as needed
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      const modifiedPdfBytes = await pdfDoc.save();
      fs.writeFileSync(outputPath, modifiedPdfBytes);
      console.log(data.text);
      // Return the position
      return { startPosition, endPosition };
    } else {
      return { error: "Kata tidak ditemukan." };
    }
  } catch (error) {
    console.error("Error during PDF parsing:", error);
    return { error: "Terjadi kesalahan selama parsing PDF." };
  }
}

module.exports = {
  changeTextInPdfV2,
};

// async function changeTextInPdfV2(inputPath, outputPath, searchText, newText) {
//   try {
//     const dataBuffer = fs.readFileSync(inputPath);
//     const data = await pdfParse(dataBuffer);

//     const textIndex = data.text.indexOf(searchText);

//     if (textIndex !== -1) {
//       // Temukan posisi awal dan akhir kata
//       const startPosition = textIndex;
//       const endPosition = textIndex + searchText.length - 1;

//       startPosition, endPosition;

//       const pdfBytes = fs.readFileSync(inputPath);
//       const pdfDoc = await PDFDocument.load(pdfBytes);

//       const pages = pdfDoc.getPages();
//       const firstPage = pages[0];
//       const x = startPosition;
//       const y = endPosition;

//       console.log("x : ", x);
//       console.log("y : ", y);

//       const pointToCm = (pointValue) => pointValue * (2.54 / 72);

//       const fontSize = 50;

//       // Background color (white in this example)
//       const backgroundColor = rgb(1, 1, 1);

//       // Calculate width and height of the text
//       const textWidth = newText.length * fontSize * 0.6; // Adjust as needed
//       const textHeight = fontSize;

//       // Draw background rectangle
//       firstPage.drawRectangle({
//         x: startPosition.x * 6.5, // Adjust multiplier as needed
//         y: startPosition.y * 22.5, // Adjust multiplier as needed
//         width: textWidth,
//         height: textHeight,
//         color: backgroundColor,
//       });

//       firstPage.drawText(newText, {
//         x: x * 6.5, //0 => 500
//         y: y * 22.5, //0 => 1000
//         size: fontSize,
//         color: rgb(0, 0, 0),
//       });

//       console.log(" x * 12.5", x * 6.5);
//       console.log("y * 37.5 ", y * 20.83);

//       const modifiedPdfBytes = await pdfDoc.save();
//       fs.writeFileSync(outputPath, modifiedPdfBytes);
//     } else {
//       return { error: "Kata tidak ditemukan." };
//     }
//   } catch (error) {
//     console.error("Error during PDF parsing:", error);
//     return { error: "Terjadi kesalahan selama parsing PDF." };
//   }
// }

// module.exports = {
//   changeTextInPdfV2,
// };
