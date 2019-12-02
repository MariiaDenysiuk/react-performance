import axios from 'axios';
import WellAdapter from "./adapter/WellAdapter";
import DrillsAdapter from "./adapter/DrillsAdapter";
import ChartAdapter from "./adapter/ChartAdapter";
import { drills } from "./testData/drills";
import { options } from "./endpoints";
import { wells } from "../api/testData/wells";
import { production } from "./testData/production";
import { rigsCrews_schedule } from "./testData/rigsCrewsDataTable";
import { water_schedule } from "./testData/waterDataTable";
import { water } from "./testData/water";
import { production_schedule } from "./testData/productionDataTable";
import { crewsRigs } from "./testData/RigsCrews";

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
    getRigsData() {
        axios.post(`${options.root}/drilling/rigsCrewsData?`)
            .then(res => {
                return ChartAdapter.getData(res);
            });
        if(!options.root) return ChartAdapter.getData(rigsCrews_schedule, crewsRigs.rigs);
    }

    getCrewsData() {
        axios.post(`${options.root}/drilling/CrewsData?`)
            .then(res => {
                return ChartAdapter.getData(res);
            });
        if(!options.root) return ChartAdapter.getData(rigsCrews_schedule, crewsRigs.crews);
    }

    getWaterOut() {
        axios.post(`${options.root}/drilling/waterOut`)
            .then(res => {
                return ChartAdapter.getData(res);
            });
        if(!options.root) return ChartAdapter.getData(water_schedule, water);
    }

    getProduction() {
        axios.post(`${options.root}/drilling/production`)
            .then(res => {
                return ChartAdapter.getData(res);
            });
        if(!options.root) return ChartAdapter.getData(production_schedule, production);
    }
}

export default new API();
