const fetch = require("node-fetch");
const cheerio = require("cheerio");
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
  //   console.log(linkDataObject);
  return linkDataObject;
};

module.exports = getData;
