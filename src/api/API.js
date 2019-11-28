import axios from 'axios';
import { wells } from "../api/testData/wells";
import WellAdapter from "./adapter/WellAdapter";
import DrillsAdapter from "./adapter/DrillsAdapter";
import { drills } from "./testData/drills";

class API {
    getData() {
        axios.get(`https:/........../wells_list`)
            .then(res => {
                console.log(res)
                const wells = res;
            });
       return WellAdapter.getData(wells);
    }

    getDrillData() {
        return DrillsAdapter.getData(drills);
        // axios.get(`https://jsonplaceholder.typicode.com/users`)
        //     .then(res => {
        //         const wells = res;
        //     })
    }
}

export default new API();
