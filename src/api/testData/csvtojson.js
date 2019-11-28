const fs = require('fs');

fs.readFile('./Tank lists.csv', "utf8", (e, data) => {

    let res = [];
    let lines = data.trim().split('\r\n');
    
    let headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        let obj = {};
        var splitLine = lines[i].split(',');
        headers.forEach((header, i) => {           
            obj[header] = splitLine[i];
        });
        res.push(obj);
    }    
    
    fs.writeFile("tanklist.json", JSON.stringify(res), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }     
    });

});
