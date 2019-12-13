class DrillsAdapter  {
    getData(data) {
        return data;
    }

    adaptedString(data) {
        return data.replace(/_/g," ");
    }

  // need mark from drilling datasets on , becouse for now datasets without marks
    getParsedDataSet(data) {
        const header = [];
        let body = [];

        const part1 = [];
        const part2= [];
        const part3 = [];

        // for(const currentItem in data[0]) {
        //     header.push(currentItem);
        // }
        //


        for(const currentItem in data[0]) {
            header.push({label: this.adaptedString(currentItem), dataKey: currentItem});
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

        body = [part1, part2, part3];
        console.log(header);
        console.log(body);
        return {header: header, body: body};
    }
}

export default new DrillsAdapter();
