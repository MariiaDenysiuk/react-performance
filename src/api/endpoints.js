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
    get_drillings_production() {
        return 'drilling_production';
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
};

/**
 * Object responsible for completion endpoints.
 */
const financial = {
    get_financial() {
        return 'financial';
    },
    get_revenue() {
        return 'revenue';
    }
};

const api = {
    wells,
    drillings,
    completion,
    financial
};

export const options = {
    root: baseUrl,
};

export default api;
