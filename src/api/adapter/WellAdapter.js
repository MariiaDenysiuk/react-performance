class WellAdapter  {
   getData(data) {
       let header = [];
       let body = data;
       for(const currentItem in data[0]) {
           if(currentItem !== 'WID' && currentItem !== 'Spud Date' && currentItem !== 'Frac Date' && currentItem !== 'DOFP' && currentItem !== 'DIOD') {
               header.push({title: currentItem, field: currentItem, editable: 'onUpdate'});
           } else {
               header.push({title: currentItem, field: currentItem, editable: 'never'});
           }
       }
       return {header: header, body: body};
   }
}

export default new WellAdapter();
