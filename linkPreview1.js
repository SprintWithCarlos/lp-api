const fetch = require("node-fetch");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

const url =
  process.env.LINK ||
  "https://dev.to/pb/10-github-repositories-which-will-help-you-to-become-a-better-javascript-developer-5om";
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
linkPreview();
//   .then((metaTags) =>
//   fs.writeFile("metatags.json", JSON.stringify(metaTags), function (err) {
//     if (err) {
//       console.log(err);
//     }
//   })
// );

const getData = async (url) => {
  const res = await fetch(url);
  const data = await res.text();
  const $ = cheerio.load(data);

  const linkDataObject = {
    url,
    title: $("title").first().text(),
    favicon: $('link[rel="shortcut icon"]').attr("href"),
    canonical: $('link[rel="canonical"]').attr("href"),
    description: $("meta[name = description]").attr("content"),
    image: $("meta[name = image]").attr("content"),
    author: $("meta[name = author]").attr("content"),
    //OG Values
    title_OG: $('meta[property="og:title"]').attr("content"),
    url_OG: $('meta[property="og:url"]').attr("content"),
    description_OG: $("meta[property = og:description]").attr("content"),
    image_OG: $("meta[property = og:image]").attr("content"),
    author_OG: $("meta[property = og:author]").attr("content"),
    type_OG: $("meta[property = og:type]").attr("content"),
    // // Twitter Values
    site_Twitter: $("meta[name = twitter:site]").attr("content"),
    domain_Twitter: $("meta[name = twitter:domain]").attr("content"),
    description_Twitter: $("meta[name = twitter:description]").attr("content"),
    image_Twitter: $("meta[name = twitter:image:src]").attr("content"),
    author_Twitter: $("meta[name = twitter:creator]").attr("content"),
    // //YouTube
    videoId: $("meta[itemprop=videoId] ").attr("content"),
    // //Facebook
    appid_fb: $('meta[property="fb:app_id"]').attr("content"),
    pages_fb: $('meta[property="fb:pages"]').attr("content"),
  };
  console.log(linkDataObject);
};

// Detect if link
const trimURL = url.trim();
const checkIsURL = trimURL.match(
  /\b(http|https)?(:\/\/)?(\s*)\.(\w{2,4})(.*)/g
);
checkIsURL && getData(url);
// const url = "https://www.youtube.com/watch?v=XMfu97py3pg";
