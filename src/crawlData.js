const cheerio = require('cheerio');
const fetch = require('node-fetch'); // Menggunakan node-fetch versi 2.x

const crawlData = async () => {
    try {
        const url = 'https://www.bola.net/jadwal-pertandingan/'; // URL yang valid
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        const schedule = {};

        $('.ligaList').each((index, element) => {
            const date = $(element).prev('.ligaList_title').text().trim();
            const matches = [];

            $(element).find('.main-table tbody tr').each((index, row) => {
                const homeTeamName = $(row).find('.team-row-name').first().find('.clubBox-name').text().trim();
                const homeTeamLogo = $(row).find('.team-row-name').first().find('.clubBox-logo img').attr('src');
                const awayTeamName = $(row).find('.team-row-name').last().find('.clubBox-name').text().trim();
                const awayTeamLogo = $(row).find('.team-row-name').last().find('.clubBox-logo img').attr('src');
                const time = $(row).find('td').eq(1).text().trim();
                const detailLink = $(row).find('.table_link').attr('href');

                const match = {
                    homeTeam: {
                        name: homeTeamName,
                        logo: homeTeamLogo
                    },
                    awayTeam: {
                        name: awayTeamName,
                        logo: awayTeamLogo
                    },
                    time: time,
                    detailLink: detailLink
                };

                matches.push(match);
            });

            schedule[date] = matches;
        });

        return schedule;
    } catch (error) {
        console.error('Error crawling data:', error);
        throw error;
    }
}

module.exports = crawlData;