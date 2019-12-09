export const financial = {
    columns: [
        { title: 'PPrice Deck', field: 'price_name', editable: 'never', cellStyle: {textAlign: 'right'}, headerStyle: {textAlign: 'right'} },
        { title: '4/30/19', field: 'date1', type: 'currency', cellStyle: {textAlign: 'right'}, headerStyle: {textAlign: 'right'} },
        { title: '5/31/19', field: 'date2', type: 'currency', cellStyle: {textAlign: 'right'}, headerStyle: {textAlign: 'right'} },
        { title: '6/30/19', field: 'date3', type: 'currency', cellStyle: {textAlign: 'right'}, headerStyle: {textAlign: 'right'} },

    ],
    data: [
        { price_name: 'Gas', date1: 2.05, date2: 2.05, date3: 2.05 },
        { price_name: 'Oil', date1: 92.56, date2: 90.47, date3: 88.10 },
        { price_name: 'NGLs', date1: 77, date2: 9, date3: 10 },
    ],

    columns1: [
        { title: 'Production', field: 'price_name', editable: 'never', cellStyle: {textAlign: 'right'}, headerStyle: {textAlign: 'right'}  },
        { title: '4/30/19', field: 'date1', cellStyle: {textAlign: 'right'}, headerStyle: {textAlign: 'right'} },
        { title: '5/31/19', field: 'date2', cellStyle: {textAlign: 'right'}, headerStyle: {textAlign: 'right'} },
        { title: '6/30/19', field: 'date3', cellStyle: {textAlign: 'right'}, headerStyle: {textAlign: 'right'} },

    ],
    data1: [
        { price_name: 'Gas', date1: 1.415, date2: 1.429, date3: 1.384 },
        { price_name: 'Oil', date1: 1.149, date2: 1.156, date3: 1.107 },
        { price_name: 'NGLs', date1: 337, date2: 333, date3: 323 },
        { price_name: 'Total(Mboe)', date1: 0, date2: 0, date3: 0 },
        { price_name: 'Total(Mboepd)', date1: 0, date2: 0, date3: 0 },
    ],

    columns2: [
        { title: '', field: 'price_name', editable: 'never', cellStyle: {textAlign: 'right'} , headerStyle: {textAlign: 'right'} },
        { title: '4/30/19', field: 'date1', type: 'currency', cellStyle: {textAlign: 'right'}, headerStyle: {textAlign: 'right'} },
        { title: '5/31/19', field: 'date2', type: 'currency', cellStyle: {textAlign: 'right'} , headerStyle: {textAlign: 'right'}},
        { title: '6/30/19', field: 'date3', type: 'currency', cellStyle: {textAlign: 'right'}, headerStyle: {textAlign: 'right'} },

    ],
    data2: [
        { price_name: 'Gas Revenue',date1: 4.704, date2: 4.530, date3: 4.259 },
        { price_name: 'Oil Revenue', date1: 105.781, date2: 104.054, date3: 97.070 },
        { price_name: 'NGLs Revenue', date1: 13.671, date2: 90.47, date3: 88.10 },
        { price_name: 'Other Revenue', date1: '', date2: '', date3: '' },
        { price_name: 'Effect of Hedges', date1: 22, date2: 21.802, date3: 19.324 },
        { price_name: 'Total Revenue', date1: 101490, date2: 99995, date3: 94477 },
    ],
    point: []
}
