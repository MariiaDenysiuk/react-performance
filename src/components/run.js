import parse from 'date-fns/parse'
import addDays from 'date-fns/addDays'
import format from 'date-fns/format'
import compareAsc from 'date-fns/compareAsc'


//This function is incomplete. It doesn't calculate frac dates

export default function run(stateRigs) {

    let rigs = [];
   console.log(stateRigs);
    // stateRigs.forEach(e => {
    //
    //     // rigs.push({ ...e });
    // });
    //tanks arrays still reference the state!! (modifying a tanks array in rigs changes it in the state)
    //maybe find better way to do this

    console.log('rigs', rigs);

    // let wells = [];
    // // wells example:
    // // [
    // //     {bench: "B", crew: null, dwof: 0, frac: null, lane: "WR Bigtooth Maple", name: "1B" (*temporary name*), rig: "Big E 4", spud: "10/25/2019"},
    // //     {bench: "B", crew: null, dwof: 0, frac: null, lane: "WR Bigtooth Maple", , name: "2B", rig: "Big E 4", spud: "11/14/2019"},
    // //     {bench: "A", crew: null, dwof: 0, frac: null, lane: "FR Halogen", name: "1A", rig: "Big E 4", spud: "8/20/2020"},
    // //     ................
    // // ]
    //
    //
    // let lanes = {}; //keeps track of tank-splits (e.g. if there are multiple Avogadro 1's), Drill status and frac status
    // // lanes example:
    // // {
    // //     Alkaline Earth: [
    // //         {splitName: 'Alkaline Earth 1', drillDoneDate: Tue Jun 09 2020 (date object), numOfSplits:3, numDrilled:2},
    // //         {splitName: 'Alkaline Earth 2', drillDoneDate: Tue Jun 09 2020, numOfSplits:2, numDrilled:0}
    // //     ],
    // //     Avogadro: [
    // //         {splitName: 'Avogadro 1', drillDoneDate: Tue Jun 16 2020, numOfSplits:2, numDrilled:0},
    // //     ],
    // //     ....................
    // // }
    //
    // //***************
    // // LANE = Avogadro
    // // TANK = Avogadro 1
    // // TANK-SPLIT = this Avogadro 1  ||  that Avogadro 1
    //
    // let rigsDone = [];      //each index = each rig; 0 = not done; 1 = done (all dates calculated)
    //
    // rigs.forEach(rig => {
    //     rigsDone.push(0);
    //     rig.spud = parse(rig.spud, 'M/d/yyyy', new Date());
    //
    //     rig.tanks.forEach(tank => {
    //
    //         let lane = tank.name.split(' ').slice(0, -1).join(' ');     //removes the number at the end of name
    //
    //         //populate well list
    //         for (let bench in tank.benches) {
    //             for (let i = 0; i < tank.benches[bench]; i++) {
    //                 let wellO = {};
    //                 wellO.name = (i + 1) + bench;
    //                 wellO.bench = bench;
    //                 wellO.rig = rig.name;
    //                 wellO.lane = lane;
    //                 wellO.spud = null;
    //                 wellO.frac = null;
    //                 wellO.dwof = 0;
    //                 wellO.crew = null;
    //                 wells.push(wellO);
    //             }
    //         }
    //
    //         ////populate lanes object
    //         if (lanes[lane]) {    //if lane already added
    //             //check if tank-split is already added
    //             let laneIncludesSplit = false;
    //             let splitIndex;
    //             for (let i = 0; i < lanes[lane].length; i++) {
    //                 if (lanes[lane][i].splitName === tank.name) {
    //                     laneIncludesSplit = true;
    //                     splitIndex = i;
    //                 }
    //             }
    //             if (laneIncludesSplit) {    //increment split
    //                 lanes[lane][splitIndex].numOfSplits++;
    //             } else {       /////add new split
    //                 lanes[lane].push({
    //                     splitName: tank.name,
    //                     numOfSplits: 1,
    //                     numDrilled: 0,
    //                     //????? more fields later
    //                 });
    //             }
    //         } else {      //first time seeing this lane
    //             lanes[lane] = [{
    //                 splitName: tank.name,
    //                 numOfSplits: 1,
    //                 numDrilled: 0,
    //             }];   //create array of lane splits
    //         }
    //         ////end populate lanes object
    //
    //     });   //end tank-split loop
    //
    // });     //end rig loop
    //
    //
    // //idea is loop through rigs, loop through tank-splits in each rig, break loop (go next rig) if tank-split is undrillable,
    // //repeat so the undrillable might be drillable next loop
    //
    // // while (rigsDone.includes(0)) {
    // runRigs();
    // // }
    //
    // console.log('wells', wells);
    // console.log('rigDone', rigsDone);
    // console.log('lanes', lanes);
    //
    //
    // function runRigs() {
    //     //start drillin
    //     rigs.forEach((rig, rigI) => {
    //
    //         //when we hit a tank-split that's not ready to drill, save the index, break this loop, and come back to this index later
    //         rig.tankStartI = 0;
    //
    //         for (let tankI = rig.tankStartI; tankI < rig.tanks.length; tankI++) {
    //
    //             let breaker = false;
    //             let tank = rig.tanks[tankI];
    //             let lane = tank.name.split(' ').slice(0, -1).join(' ');
    //
    //             lanes[lane].forEach((split, i, arr) => {        //find the associated data in the lanes object
    //                 if (split.splitName === tank.name) {        //found
    //                     if (i === 0 || arr[i - 1].fracDoneDate) {     //DRILLLABLE  //if this is the first tank in the lane || previous tank is fracked
    //
    //                         for (let j = 0; j < wells.length; j++) {         ///find the wells in well array??? inefficient!
    //                             if (wells[j].lane === lane && wells[j].rig === rig.name) {     //found well
    //                                 wells[j].spud = format(rig.spud, 'M/d/yyyy');        //assign spud
    //                                 rig.spud = addDays(rig.spud, tank.s2s);             //increment rig spud by s2s
    //                             }
    //                         }
    //
    //                         //drillDoneDate = date which all wells in a TANK are drilled
    //                         //every time a well is drilled, compare tank's drillDoneDate with well's drillDoneDate(which is the current rig.spud), choose the later of the two
    //                         //when all wells in tank are drilled, tank's drillDoneDate will be the latest well's drillDoneDate
    //                         if (!split.drillDoneDate) {
    //                             split.drillDoneDate = new Date(rig.spud);        //copy the object; dont ref the object (unsafe)
    //                         } else {
    //                             if (compareAsc(rig.spud, split.drillDoneDate) === 1) {   //if rig.spud is after drillDoneDate
    //                                 split.drillDoneDate = new Date(rig.spud);
    //                             }
    //                         }
    //
    //                         split.numDrilled++;
    //                         rig.tankStartI++;       //tank-split done; increment rig start point
    //                         if (rig.tankStartI === rig.tanks.length)    //last tank-split done; rig is done
    //                             rigsDone[rigI] = 1;
    //                         if (split.numDrilled === split.numOfSplits) {  //tank(whole) drilled. ready to frac
    //
    //                             console.log('frac function');
    //                             ////////////////////////TO DO; FRACK FUNCTION//////////////////////////////////
    //
    //                         }
    //
    //                     } else {  //NOT DRILLABLE. break and do next rig
    //                         breaker = true;
    //                     }
    //                 }
    //             });
    //
    //             if (breaker) break;
    //
    //         }   //each tank-split
    //
    //     });    //rigs foreach
    //
    // }   //runRigs

}
