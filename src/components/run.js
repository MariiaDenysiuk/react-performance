import API from "../api/API";

export default function run(stateRigs) {
   let rigs = [];
   stateRigs.forEach(item => {
       item.tanks.forEach(tank => {
           API.getData().body.forEach(well => {
               if(well.drill_tank === tank.name) {
                   rigs.push(
                       {
                           "rig": item.name,
                           "drill_tank": tank.name,
                           "well_name": well.well_name,
                           "bench": well.bench,
                           "project": well.project,
                           "splitted_drill_tank": ""
                       },
                   );
               }
           });

       })
   });

   API.postDrillData(rigs).then(
       res => { console.log(res) }
   );

}
