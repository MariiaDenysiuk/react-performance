class ChartAdapter  {
    chartsPoints = ['frac_date', 'date', 'total_production_with_waterout', 'total_waterout', 'total_crews', 'total_rigs'];
    adaptedString(data) {
        return data.replace(/_/g," ");
    }

    // create model for chart adapter
    getData(tableData) {
       const table = this.buildTable(tableData);
       const chart = this.buildChart(tableData);
       return {table: table, chart: chart};
    }

    buildTable(table) {
      const tableData = {header: [], body: table};
      for(const currentItem in table[0]) {
             if(table[0].hasOwnProperty(currentItem)) {
               tableData.header.push({label: this.adaptedString(currentItem), dataKey: currentItem});
             }
           }
      return tableData;
    }

    buildChart(table) {
        let chart = {crews: [], rigs: [], production: [],  waterOut: []};
        table.forEach(items => {
            let curCrews = [];
            let curRigs = [];
            let production = [];
            let waterOut = [];
            for(let key in items) {
                if(key === "frac_date") {
                    const dat = Date.parse(new Date(items['frac_date']));
                    curCrews.push(dat);
                    curRigs.push(dat);
                }

                if(key === "date") {
                    const dat = Date.parse(new Date(items['date']));
                    production.push(dat);
                    waterOut.push(dat);
                }

                if(key === "total_production_with_waterout") {
                    production.push(items['total_production_with_waterout']);
                }
                if(key === "total_waterout") {
                    waterOut.push(items['total_waterout']);
                }

                if(key === "total_crews") {
                    curCrews.push(items['total_crews']);
                }
                if(key === "total_rigs") {
                    curRigs.push(items['total_rigs']);
                }
            }
            chart.crews.push(curCrews);
            chart.rigs.push(curRigs);
            chart.production.push(production);
            chart.waterOut.push(waterOut);
        });

        return chart;
    }
}

export default new ChartAdapter();
