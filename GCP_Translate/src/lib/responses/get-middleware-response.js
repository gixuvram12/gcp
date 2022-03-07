const { PLEASE_CHECK_INPUT_DATA, PARAMETER_ERROR } = require('../../constants/constant-keys');

const getMiddlewareResponse = (apiType, data) => {
    const defaultData = { status: PLEASE_CHECK_INPUT_DATA, res_code: 0, msg: data };
    switch (apiType) {
        case 'joi_validation':
            return defaultData;
        default:
            return { api_type: apiType, res_code: 0, msg: PARAMETER_ERROR };
    }
}


module.exports = getMiddlewareResponse;
