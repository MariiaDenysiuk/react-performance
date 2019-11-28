import axios from 'axios';
import WellAdapter from "./adapter/WellAdapter";
import DrillsAdapter from "./adapter/DrillsAdapter";
import { drills } from "./testData/drills";
import { options } from "./endpoints";
import { wells } from "../api/testData/wells";

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
            })
    }
}

export default new API();
