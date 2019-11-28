const fs = require('fs');

fs.readFile('./tanklist.json', "utf8", (e, data) => {

    let res = {};
    let sortByRig = {}
    JSON.parse(data).forEach(e => {
        if (res[e['Rig Number']]) {
            if (res[e['Rig Number']][e['Project Unit']])
                res[e['Rig Number']][e['Project Unit']].push(e);
            else
                res[e['Rig Number']][e['Project Unit']] = [e];
        } else {
            res[e['Rig Number']] = { [e['Project Unit']]: [e] };
        }
    });

    JSON.parse(data).forEach(e => {
        if (sortByRig[e['Rig Number']]) {
            sortByRig[e['Rig Number']].push(e)
        } else {
            sortByRig[e['Rig Number']] = [e];
        }
    });

    // not used but might be useful
    // fs.writeFile("sortedByRigAndTank.json", JSON.stringify(res), 'utf8', function(err) {
    //     if (err) return console.log(err);
    // });


    let tankid = 0;

    for (let i in res) {
        let rigA = [];
        for (let j in res[i]) {
            let o = {};
            o.tankID = tankid++;
            o.name = j;
            o.f2f = 20;
            o.s2s = 20;
            o.benches = {};
            res[i][j].forEach(e => {
                if (e.Bench in o.benches)
                    o.benches[e.Bench]++;
                else o.benches[e.Bench] = 1;
            });

            rigA.push(o);
        }

        res[i] = rigA;
    }


    let res1 = [];
    let rigID = 0;
    for (let rig in sortByRig) {
        let o = {};
        o['spud'] = sortByRig[rig][0]['Spud Date'];
        o['frac'] = sortByRig[rig][0]['Frac Date'];
        o['name'] = rig;
        o['rigID'] = rigID++;
        o['tanks'] = res[rig];
        res1.push(o);
    }

    fs.writeFile("sorted0.json", JSON.stringify(res1), 'utf8', function(err) {
        if (err) return console.log(err);
    });

    // not used but might be useful
    // fs.writeFile("sorted2.json", JSON.stringify(res), 'utf8', function(err) {
    //     if (err) return console.log(err);
    // });

});
