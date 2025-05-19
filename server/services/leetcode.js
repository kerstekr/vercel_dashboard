const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');

async function fetchLeetCodeData(username) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    defaultViewport: chromium.defaultViewport
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  );

  const url = `https://leetcode.com/${username}`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  const data = await page.evaluate(() => {
    const extractText = (selector) =>
      document.querySelector(selector)?.innerText || 'N/A';

    return {
      totalSolved: extractText('.text-[24px]'),
      easySolved: extractText('div:nth-of-type(1) .text-label-2.dark\\:text-dark-label-2'),
      mediumSolved: extractText('div:nth-of-type(2) .text-label-2.dark\\:text-dark-label-2'),
      hardSolved: extractText('div:nth-of-type(3) .text-label-2.dark\\:text-dark-label-2'),
      ranking: extractText('.ranking .text-[20px]')
    };
  });

  await browser.close();
  return data;
}


module.exports = { fetchLeetCodeData };
