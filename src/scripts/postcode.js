const cheerio = require('cheerio');
const fs = require('fs');
const { lib, genie_call, process_items } = require("./lib");

async function ggs2(postCode) {
  // Get first page
  const urlResponse = await genie_call("postcode", {
    q6: postCode,
    s: 0
  });

  // Process first page
  const $ = cheerio.load(urlResponse.data);
  const items = $('div.CSSTableGenerator');
  let first_page_results = await process_items(items, $);

  // Send first page of results to the frontend
  const resultString = first_page_results.map(result => JSON.stringify(result) + '\r\n').join('');
  const writeStream = fs.createWriteStream("Results.txt");
  writeStream.write(resultString);

  // Get total number of results
  const results_str = $("a ~ font > b");
  let total_pages = 0;

  if (results_str.length !== 0 && results_str.text().split("of ")[1] !== undefined) {
    console.log("split: ", results_str.text().split("of ")[1]);
    const total_results = results_str.text().split("of ")[1].split(" ")[0];
    total_pages = Math.ceil(total_results / 10);
    console.log(total_pages);
  } else {
    return first_page_results;
  }

  // Construct requests to get all the other pages
  const requests = [];
  console.log(total_pages);
  for (let i = 1; i <= total_pages - 1; i++) {
    requests.push(genie_call("postcode", {
      q6: postCode,
      s: i * 10
    }));
  }

  // Do all the requests at once
  const pageUrlResponses = await Promise.all(requests);

  // Load the page HTML and create processing tasks
  const process_tasks = pageUrlResponses.map(urlResponse => {
    const $ = cheerio.load(urlResponse.data);
    const items = $('div.CSSTableGenerator');
    return process_items(items, $);
  });

  // Process (get occupancy data) the results all at once
  const results = await Promise.all(process_tasks);
  const all_results = [].concat(...results);
  const allResultsString = all_results.map(result => JSON.stringify(result) + '\r\n').join('');
  writeStream.write(allResultsString);
  writeStream.on('finish', () => {
    console.log('Results saved!');
  });
  writeStream.end();

  console.log("Done!");
  return first_page_results.concat(all_results);
}

module.exports = {
  ggs2
};