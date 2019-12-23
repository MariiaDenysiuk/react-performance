import axios from 'axios';
import { options } from "./endpoints";

/**
 * Rest methods
 */
const httpMethods = {
    get(item) {
        axios.get(`${options.root}/${item}`);
    },

    update(item) {
        axios.update(`${options.root}/${item}`);
    },

    delete(item) {
        axios.delete(`${options.root}/${item}`);
    },
};

export default httpMethods;
