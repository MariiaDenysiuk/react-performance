import StringAdapter from "./StringAdapter";

class DrillsAdapter  {
    getData(data) {
        return data;
    }

    getParsedDataSet(data) {
        const header = [];
        let body = [];
        const part1 = [];
        const part2= [];
        const part3 = [];
        for(const currentItem in data[0]) {
            if(data[0].hasOwnProperty(currentItem)) {
                header.push({label: StringAdapter.replaceSymbol(currentItem), dataKey: currentItem});
            }
        }

        data.map((el, i) => {
            if(i < 81) {
               part1.push(el);
            }
            if(81 < i && i < 160) {
                part2.push(el);
            }
            if(i > 120) {
                part3.push(el);
            }
        });

        body = [ part1, part2, part3 ];

        return { header: header, body: body };
    }
}

export default new DrillsAdapter();
