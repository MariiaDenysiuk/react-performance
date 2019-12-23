import WellAdapter from "./adapter/WellAdapter";
import DrillsAdapter from "./adapter/DrillsAdapter";
import ChartAdapter from "./adapter/ChartAdapter";
import ProductionPricingAdapter from "./adapter/ProductionPricingAdapter";
import FinancialAdapter from "./adapter/FinancialAdapter";
import httpMethods from "./http-methods";
import { drilling_schedule } from "./testData/drilling_schedule";
import { drills } from "./testData/drills";
import { options } from "./endpoints";
import { wells } from "../api/testData/wells";
import { financial } from "../api/testData/financial";
import { rigsCrews_schedule } from "./testData/rigsCrewsDataTable";
import { production_schedule } from "./testData/productionDataTable";
import api from "./endpoints";

class API {
    /**
     * Wells data.
     */
    getWellsData() {
        const data = httpMethods.get(api.wells.get_wells_list());
        data.then( res => {
            return WellAdapter.getData(res);
        }).catch(error => {});
        if(!options.root) return WellAdapter.getData(wells);
    }

    updateWells() {
        httpMethods.post(api.wells.update_wells()).then(
            res => {
                console.log(res);
            }
        );
    }

    /**
     * Drills data.
     */
    getDrillData() {
        httpMethods.get(api.drillings.get_drillings_list()).then( res => {
            return DrillsAdapter.getData(res);
        }).catch(error => {});
        if(!options.root) return DrillsAdapter.getData(drills);
    }

    getDrillDataTable() {
        if(!options.root) return DrillsAdapter.getParsedDataSet(drilling_schedule);
    }

    postDrillData(runDrillData) {}

    /**
     * Completion data.
     */
    getCrewsData() {
        httpMethods.post(api.completion.get_calculate_drilling_schedule).then(
            res => {
                return ChartAdapter.getData(res);
            }
        );
        if(!options.root) return ChartAdapter.getData(rigsCrews_schedule);
    }

    getProductionWaterOut() {
        httpMethods.post(api.completion.get_calculate_production_waterout())
            .then(res => {
                return ChartAdapter.getData(res);
            });

        if(!options.root) return ChartAdapter.getData(production_schedule);
    }

    /**
     * Financial data.
    */
    getRevenue(data) {
        return ProductionPricingAdapter.getRevenue(data);
    }

    getFiancial() {
        return FinancialAdapter.getData(financial);
    }
}

export default new API();
