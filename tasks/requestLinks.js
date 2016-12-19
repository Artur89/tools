// Dependencies
var request = require('request'),
    chalk = require('chalk');

// Data
var arr = require('../data/links.json');

// Variables
var pass = 0,
    fail = 0,
    totalTime = Date.now();

Promise.all(arr.map(function(obj) {
    return new Promise(function(resolve, reject) {
        // Make request
        request
            .get(obj.url)
            .on('response', function(res) {
                var time = Date.now(),
                    diff,
                    dom = '',
                    found;

                if(res.statusCode === 200) {
                    res.on('data', function(chunk) {
                        dom += chunk;
                    });
                    res.on('end', function() {
                        // Stop timer
                        diff = time - Date.now();

                        // Find test String in DOM
                        found = dom.indexOf(obj.test) > -1;
                        
                        // Increase counter
                        found ? pass++ : fail++;

                        // Output
                        if(found) {
                            console.log(chalk.green('[+]') + ' Text: ' + chalk.green(obj.test) + ' found here: ' + chalk.magenta(obj.url) + ', request takes: ' + Math.abs(diff) + 'ms');
                        } else {
                            console.log(chalk.red('[-]') + ' Text: ' + chalk.red(obj.test) + ' not found here: ' + chalk.red(obj.url) + ', request takes: ' + Math.abs(diff) + 'ms');
                        }
                        resolve();
                    });
                } else {
                    reject();
                }

        });
    });
})).then(function() {
    // Final output
    if(fail === 0) {
        console.log(chalk.green('\nSuccess!'));
        console.log(chalk.green('Total passed: ' + pass));
    } else {
        console.log(chalk.green('\nTotal: passed: ' + pass));
        console.log(chalk.red('Total failed: ' + fail));
    }
    console.log('Total time spent:', Math.abs(totalTime - Date.now()) + 'ms');
})

