const puppeteer = require("puppeteer");
const fs = require("fs");
// const screenShot = async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://www.amazon.co.uk", { waitUntil: "networkidle2" });
//   await page.screenshot({ path: "example.png" });

//   await browser.close();
// };
// screenShot();
const URL = process.env.LINK || "http://localhost:3000/login";
const login = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
    args: ["--window-size=1920,1080"],
  });
  const page = await browser.newPage();
  await page.goto(URL);
  await page.click("input#email");
  await page.type("input#email", "test3@gmail.com");
  await page.click("input#password");
  await page.type("input#password", "123456");
  await page.click("button#submit");
};
login();
// let URL = "https://www.youtube.com/watch?v=w3F4rUaWNcU";
// const linkPreview = async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(URL);
//   const grabYouTubeTitles = await page.evaluate(() => {
//     // const titleTags = document.querySelectorAll("#video-title");
//     // const titles = [];
//     // titleTags.forEach((element) => {
//     //   titles.push(element.innerHTML);
//     // });
//     // return titles;
//     const dada = document.getElementsByTagName("meta");
//     const metaToJSON = (data) => {
//       const object = {};
//       for (var i = 0; i < data.length; i++) {
//         var item = data[i];
//         data[item.name] = item.content;
//       }
//       return object;
//     };

//     metaToJSON(meta);
//   });
//   await console.log(grabYouTubeTitles);
//   // const headHandle = await page.$("head");
//   // const metaDescription = await page.evaluate((head) => head.meta, headHandle);
//   // console.log(metaDescription);
//   // await page.evaluate(() => {
//   //   const list = document.getElementsByTagName("meta");
//   //   const data = {};
//   //   const metaToJSON = (form) => {
//   //     for (var i = 0; i < form.length; i++) {
//   //       var item = form[i];
//   //       data[item.name] = item.content;
//   //     }
//   //   };

//   //   metaToJSON(list);
//   // });
//   // await fs.writeFile(
//   //   "test1.txt",
//   //   JSON.stringify(grabYouTubeTitles),
//   //   function (err) {
//   //     if (err) {
//   //       console.log(err);
//   //     }
//   //   }
//   // );
//   await browser.close();
// };
// linkPreview();
