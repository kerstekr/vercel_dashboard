const puppeteer = require('puppeteer');

async function fetchLeetCodeData(username) {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
    );

    const url = `https://leetcode.com/${username}`;
    console.log(`Checking account for: ${username}`);

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    

    const isProfileExist = await page.evaluate(() => {
      return !document.querySelector('.text-xl'); 
    });

    if (!isProfileExist) {
      console.log(`❌ Account ${username} does not exist.`);
      await browser.close();
      return null;
    }

    
    await page.waitForSelector('[class*="text-[30px]"]', { timeout: 10000 });

    
    await autoScroll(page);

    const result = await page.evaluate(() => {
      const extractSolvedCount = (selector) => {
        const el = document.querySelector(selector);
        const match = el?.innerText?.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
      };

      const totalSolved = extractSolvedCount('[class*="text-[30px]"]');
      const easy = extractSolvedCount('.text-sd-easy + div');
      const medium = extractSolvedCount('.text-sd-medium + div');
      const hard = extractSolvedCount('.text-sd-hard + div');

      
      let rank = null;
      const rankEl = [...document.querySelectorAll('div')].find(el =>
        el.textContent.includes('Global Ranking') || el.textContent.includes('Rank')
      );
      if (rankEl) {
        const match = rankEl.textContent.match(/Rank.*?([\d,]+)/);
        rank = match ? match[1].replace(/,/g, '') : null;
      }

      const badges = Array.from(document.querySelectorAll('.badge-item img, .badge img')).map(
        img => img.alt || img.title || ''
      ).filter(Boolean);

      
      const skills = [];
      const allSections = document.querySelectorAll('.mt-3'); 

      allSections.forEach(section => {
        const title = section.querySelector('h3, h4')?.innerText.trim();
        const items = section.querySelectorAll('li, .flex.flex-col');
        items.forEach((el) => {
          const text = el.innerText.trim();
          const match = text.match(/(.+?)\s*x(\d+)/);
          if (match) {
            skills.push({
              category: title || 'Skills',
              skillName: match[1].trim(),
              problemsSolved: parseInt(match[2])
            });
          }
        });
      });

      return { totalSolved, easy, medium, hard, rank, badges, skills };
    });

    await browser.close();

    console.log(`✅ Account ${username} exists. Solved: ${result.totalSolved}`);
    console.log(`🔹 Easy: ${result.easy}, Medium: ${result.medium}, Hard: ${result.hard}`);
    console.log(`🏅 Rank: ${result.rank}`);
    console.log(`🎖️ Badges: ${result.badges.join(', ')}`);
    console.log(`🛠 Skills:`, result.skills);

    return result;
  } catch (error) {
    console.error('❌ Error fetching profile:', error.message);
    return null;
  }
}


async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

module.exports = { fetchLeetCodeData };
