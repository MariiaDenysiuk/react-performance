class WellAdapter  {
   adaptedString(data) {
       return data.replace(/_/g," ");
   }

   getData(data) {
       let header = [];
       let body = data;
       for(const currentItem in data[0]) {
           if(currentItem !== 'wid' && currentItem !== 'spud_date' && currentItem !== 'frac_date' && currentItem !== 'dofp' && currentItem !== 'diod') {
               header.push({title: this.adaptedString(currentItem), field: currentItem, editable: 'onUpdate'});
           } else {
               header.push({title: this.adaptedString(currentItem), field: currentItem, editable: 'never'});
           }
       }
       return {header: header, body: body};
   }
}

export default new WellAdapter();
