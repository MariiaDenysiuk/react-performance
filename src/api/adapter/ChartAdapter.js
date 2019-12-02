class ChartAdapter  {
    adaptedString(data) {
        return data.replace(/_/g," ");
    }

    getData(tableData, chartData) {
       const chart = chartData;
       let currentChart = [];
       const arr = {table: {}, chart: currentChart};
        let header = [];
        let body = tableData;
        for(const currentItem in tableData[0]) {
           header.push({title: this.adaptedString(currentItem), field: currentItem, editable: 'onUpdate'});
        }
       arr.table['header'] = header;
       arr.table['body'] = body;

        chart.forEach(item => {
            item.date = Date.parse(new Date(item.date));
            currentChart.push(Object.values(item));
        });

       return arr;
    }
}

export default new ChartAdapter();
