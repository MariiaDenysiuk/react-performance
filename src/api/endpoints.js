const baseUrl = process.env.NODE_ENV === 'development' ? false : 'http://exampleUrl';

/**
 * Object responsible for wells endpoints.
 */
const wells = {
    get_wells_list() {
        return 'wells_list';
    },
    update_wells() {
        return 'wells_update';
    },
};

/**
 * Object responsible for drillings endpoints.
 */
const drillings = {
    get_drillings_list() {
        return 'drilling_default';
    },
};

/**
 * Object responsible for completion endpoints.
 */
const completion = {
    get_calculate_drilling_schedule() {
        return 'calculate_drilling_schedule';
    },
    get_calculate_production_waterout() {
        return 'calculate_production_waterout';
    },
    get_calculate_financial() {
        return 'calculate_financial';
    },
};

const api = {
    wells,
    drillings,
    completion
};

export const options = {
    root: baseUrl,
};

export default api;
