var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

request("https://www.ziprecruiter.com/candidate/search?search=javascript&location=Austin%2C+TX", function (error, response, body) {
    if (!error) {
        var $ = cheerio.load(body);
        console.log("Page title:  " + $('title').text());
        $('div.job_content').each(function (job_content) {
            var title = $(this).find('span.just_job_title').text().trim();
            var company = $(this).find('a.t_org_link').text().trim();
            var description = $(this).find('p.job_snippet a').text().trim();
            console.log("Title: " + title);
            console.log("Company: " + company);
            console.log("Description: " + description);
            fs.appendFileSync('zipRecruiter.txt', "Title:  " + title + '\n' + "Company:  " + company + '\n' + "Description:  " + description + '\n');
        });
    }

});
