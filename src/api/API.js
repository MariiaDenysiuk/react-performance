import axios from 'axios';
import WellAdapter from "./adapter/WellAdapter";
import DrillsAdapter from "./adapter/DrillsAdapter";
import ChartAdapter from "./adapter/ChartAdapter";
import { drills } from "./testData/drills";
import { options } from "./endpoints";
import { wells } from "../api/testData/wells";
import { financial } from "../api/testData/financial";
import { rigsCrews_schedule } from "./testData/rigsCrewsDataTable";
import { production_schedule } from "./testData/productionDataTable";
import ProductionPricingAdapter from "./adapter/ProductionPricingAdapter";
import {drilling_schedule} from "./testData/drilling_schedule";
import FinancialAdapter from "./adapter/FinancialAdapter";

class API {
    // wells data for first tab   ------- 1 tab -------------
    getWellsData() {
        // axios.get(`${options.root}/wells_list`)
        //     .then(res => {
        //       return WellAdapter.getData(res);
        //     }).catch(error => {
        //
        // });
        if(!options.root) return WellAdapter.getData(wells);
    }

    updateWells() {
        // axios.post(`${options.root}/wells_update`)
        //     .then(res => {
        //         console.log(res);
        //     });
    }

    // drills data for second   ------- 2 tab ----------------
    getDrillData() {
        // axios.get(`${options.root}/drilling_default`)
        //     .then(res => {
        //         return DrillsAdapter.getData(res);
        //     });
        if(!options.root) return DrillsAdapter.getData(drills);
    }

    getDrillDataTable() {
        // axios.get(`${options.root}/drilling_default`)
        //     .then(res => {
        //         return DrillsAdapter.getData(res);
        //     });
        console.log(DrillsAdapter.getParsedDataSet(drilling_schedule))
        if(!options.root) return DrillsAdapter.getParsedDataSet(drilling_schedule);
    }

    postDrillData(runDrillData) {
        return axios.post(`${options.root}/drilling/calculate_drilling_schedule`, {runDrillData})
            .then(res => {
               console.log(res)
            });
    }

    // ----------------- completion tab, data for bnuilding tables and charts -----------------------------------
    getCrewsData() {// }
        // axios.post(`${options.root}/drilling/CrewsData?`)
        //     .then(res => {
        //         return ChartAdapter.getData(res);
        //     });
        if(!options.root) return ChartAdapter.getData(rigsCrews_schedule);
    }

    // getWaterOut() {
    //     // axios.post(`${options.root}/drilling/waterOut`)
    //     //     .then(res => {
    //     //         return ChartAdapter.getData(res);
    //     //     });
    //     if(!options.root) return ChartAdapter.getData(production_schedule, false);


    // production data table
    getProductionWaterOut() {
        // axios.post(`${options.root}/drilling/production`)
        //     .then(res => {
        //         return ChartAdapter.getData(res);
        //     });

        if(!options.root) return ChartAdapter.getData(production_schedule);
    }

    // ----------------- financial tab -----------------------------------

    getRevenue(data) {
        return ProductionPricingAdapter.getRevenue(data);
    }

    getFiancial() {
        return FinancialAdapter.getData(financial);
    }
}

export default new API();
