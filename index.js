const request = require("request");
const cheerio = require("cheerio");

var jobs = [];

const scrapper = (filters='')=>{

    const url = `https://internshala.com/internships/angular.js%20development-internship/${filters}`

    request(url, (error, response, html)=>{
            if(!error && response.statusCode == 200) {
               // console.log(html)
                const $ = cheerio.load(html);
                var a = 0;
                $('.individual_internship').each((i, ele)=>{
                    const job = {
                        position: null,
                        company: null,
                        stipend: null,
                        place: null,
                        apply_by: null,
                        startDate: null,
                        link: null
                    }
                   job.position = $(ele).find('.company a').text ().split('\n')[0];
                   job.company = $(ele).find('.company .company_name').text ().trim ();
                   job.place = $(ele).find('.individual_internship_details #location_names').text ().trim();
                   job.startDate = $(ele).find('#start-date-first .start_immediately_mobile').text();
                   job.stipend = $(ele).find('.stipend').text();
                   job.apply_by = $(ele).find('.apply_by').text().trim().split('\n').pop().trim()
                   const link = `https://internshala.com${$(ele).find('.profile a').attr()['href']}`
                   job.link = link;
                   jobs.push (job);

                })
                
               console.log(jobs)
            }
    });

}

scrapper ();
