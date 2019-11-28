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

const api = {
    wells,
    drillings
};

export const options = {
    root: baseUrl,
};

export default api;
