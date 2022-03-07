const { SOMETHING_WENT_WRONG } = require('../../constants/constant-keys');

const getErrorResponse = (apiType, data) => {
    const defaultData = { api_type: apiType, res_code: 0, msg: data };
    switch (apiType) {
        case 'catch_error':
            return defaultData;
        default:
            return { api_type: apiType, res_code: 0, msg: SOMETHING_WENT_WRONG };
    }
}

module.exports = getErrorResponse;
