const cheerio = require('cheerio');
const fs = require('fs');
const lib = require('./lib');
const {genie_call} = require("./lib");



async function ggs3(first_name, last_name, town) {
  // Get first page
  const urlResponse = await lib.genie_call("name_town", {
    q3222: first_name,
    q52: last_name,
    q32: town,
    s: 0,
    D59: '',  //No idea why this is needed, but it is
    q222: '',  //No idea why this is needed, but it is
    x: Math.floor(Math.random() * 100) + 1,
    y: Math.floor(Math.random() * 100) + 1
  });

  // Process first page
  const $ = cheerio.load(urlResponse.data);
  const items = $('div.CSSTableGenerator'); // Get all tables instead of just 1 per request.
  let first_page_results = await lib.process_items(items, $);

  // Send first page of results to the frontend
  for (const result of first_page_results) {
    if (global.io !== undefined) {
      global.io.emit('log', JSON.stringify(result) + '\r\n');
    fs.appendFile("Results.txt", JSON.stringify(result) + '\r\n', (err) =>{
      console.log('saved!');
    });
    }
    
  }

  // Get total number of results
  const results_str = $("a ~ font > b")
  let total_pages = 0

  if (results_str.length !== 0) {
    const total_results = results_str.text().split("of ")[1].split(" ")[0];
    total_pages = Math.ceil(total_results / 5); // 5 is the page size for this search type
  } else {
    return first_page_results;
  }


  // Construct requests to get all the other pages
  let requests = [];
  for (let i = 1; i <= total_pages-1; i++) {
    requests.push(lib.genie_call("name_town", {
      q3222: first_name,
      q52: last_name,
      q32: town,
      s: i*5,
      D59: '',  //No idea why this is needed, but it is
      q222: '',  //No idea why this is needed, but it is
      x: Math.floor(Math.random() * 100) + 1, //No idea why this is needed, but it is
      y: Math.floor(Math.random() * 100) + 1 //No idea why this is needed, but it is
    }));
  };

  // Do all the requests at once
  const pageUrlResponses = await Promise.all(requests);

  // Load the page HTML and create processing task

  let process_tasks = []
  for (const urlResponse of pageUrlResponses) {
    const $ = cheerio.load(urlResponse.data);
    const items = $('div.CSSTableGenerator'); // Get all tables instead of just 1 per request.
    process_tasks.push(lib.process_items(items, $));
  }

  // Process (get occupancy data) the results all at once...
  const results = await Promise.all(process_tasks);
  const all_results = [].concat.apply([], results); // Flattens the results array of arrays into 1 long array
  for (const result of all_results) {
    console.log(JSON.stringify(result));
    console.log(result)
    global.io.emit('log', JSON.stringify(result) + '\r\n');
    fs.appendFile("Results.txt", JSON.stringify(result) + '\r\n', (err) =>{
      console.log('saved!');
    });
  }

  // console.log(all_results);
  console.log("Done!")
  return first_page_results.concat(all_results);
};

module.exports = {
  ggs3
}