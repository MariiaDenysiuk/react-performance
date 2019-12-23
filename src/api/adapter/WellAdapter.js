import StringAdapter from "./StringAdapter";

class WellAdapter  {
   notChangeData = ['wid', 'spud_date', 'frac_date', 'dofp', 'diod'];
   getData(data) {
       let header = [];
       let body = data;
       for(const currentItem in data[0]) {
           if(data[0].hasOwnProperty(currentItem)) {
               header.push({title:  StringAdapter.replaceSymbol(currentItem), field: currentItem, editable: this.notChangeData.includes(currentItem) ? 'onUpdate' : 'edit'});
           }
       }
       return { header: header, body: body };
   }
}

export default new WellAdapter();
