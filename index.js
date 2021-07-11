const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const puppeteer = require("puppeteer");
const cors = require("cors");
const getData = require("./linkp");
// -- MIDDLEWARE -- //
app.use(cors());
app.use(express.json());
// ROUTES //
app.post("/api/linkpreviewer", async (req, res) => {
  const { text: url } = req.body;
  const linkData = await getData(url);

  // console.log(linkData);
  res.status(200).json(linkData);
});

// --- //

// const url =
//   process.env.LINK ||
//   "https://dev.to/pb/10-github-repositories-which-will-help-you-to-become-a-better-javascript-developer-5om";
const linkPreview = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const metaTags = await page.evaluate(() =>
    Array.from(document.querySelectorAll("meta")).map((item) => ({
      key: item.outerHTML.split(" ")[1],
      value: item.content,
    }))
  );
  console.log(metaTags);
  browser.close();
  return metaTags;
};
// linkPreview();

// --- //

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
