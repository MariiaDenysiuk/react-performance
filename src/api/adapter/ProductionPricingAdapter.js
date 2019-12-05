class ProductionPricingAdapter  {

    getRevenue(data) {
        const dateItems = [];
        let oilRevenue = [];
        let totalRevenue = [];
        console.log(data.data);

        // got date
        data.data.columns.forEach(e => {
            if(e.title.length > 0) {
                const date = Date.parse(new Date(e.title));
                dateItems.push(date);
            }
        });
        // got oil revenue
        data.data.data2.forEach(e => {
            const test1 = [];

            if(e.price_name === 'Oil Revenue') {
                console.log(e)
                delete e.tableData;
                delete e.price_name;
                oilRevenue = this.passData(Object.values(e), dateItems);

            }

        });


        // total revenue
        data.data.data2.forEach(e => {
            const test1 = [];

            if(e.price_name === 'Total Revenue') {
                console.log(e)
                delete e.tableData;
                delete e.price_name;
                totalRevenue = this.passData(Object.values(e), dateItems);

            }

        });

      console.log( {oilRevenue: oilRevenue, totalRevenue: totalRevenue});

        return  {oilRevenue: oilRevenue, totalRevenue: totalRevenue}
    }

    passData(data, date) {
        let test = [];
        Object.values(data).map((dat, i) => {
            test.push([date[i], dat]);
        });

        return test;
    }
}

export default new ProductionPricingAdapter();
