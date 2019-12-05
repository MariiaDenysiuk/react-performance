import axios from 'axios';
import WellAdapter from "./adapter/WellAdapter";
import DrillsAdapter from "./adapter/DrillsAdapter";
import ChartAdapter from "./adapter/ChartAdapter";
import { drills } from "./testData/drills";
import { options } from "./endpoints";
import { wells } from "../api/testData/wells";
import { oil_price } from "../api/testData/Oil_Price";
import { rigsCrews_schedule } from "./testData/rigsCrewsDataTable";
import { production_schedule } from "./testData/productionDataTable";
import FinancialAdapter from "./adapter/FinancialAdapter";
import ProductionPricingAdapter from "./adapter/ProductionPricingAdapter";

class API {
    getData() {
        axios.get(`${options.root}/wells_list`)
            .then(res => {
              return WellAdapter.getData(res);
            }).catch(error => {

        });
        if(!options.root) return WellAdapter.getData(wells);
    }

    updateWells() {
        axios.post(`${options.root}/wells_update`)
            .then(res => {
                console.log(res);
            });
    }

    getDrillData() {
        axios.get(`${options.root}/drilling_default`)
            .then(res => {
                return DrillsAdapter.getData(res);
            });
        if(!options.root) return DrillsAdapter.getData(drills);
    }

    postDrillData(runDrillData) {
        return axios.post(`${options.root}/drilling/calculate_drilling_schedule`, {runDrillData})
            .then(res => {
               console.log(res)
            });
    }

    // ----------------- completion tab -----------------------------------

    getCrewsData() {
        axios.post(`${options.root}/drilling/CrewsData?`)
            .then(res => {
                return ChartAdapter.getData(res);
            });
        if(!options.root) return ChartAdapter.getData(rigsCrews_schedule, rigsCrews_schedule);
    }

    getWaterOut() {
        axios.post(`${options.root}/drilling/waterOut`)
            .then(res => {
                return ChartAdapter.getData(res);
            });
        if(!options.root) return ChartAdapter.getData(production_schedule, production_schedule);
    }

    getProduction() {
        axios.post(`${options.root}/drilling/production`)
            .then(res => {
                return ChartAdapter.getData(res);
            });
        if(!options.root) return ChartAdapter.getData(production_schedule, production_schedule);
    }

    // for now

    getRevenue(data) {
        return ProductionPricingAdapter.getRevenue(data);
    }



}

export default new API();
