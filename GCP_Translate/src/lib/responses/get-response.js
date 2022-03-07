const { SUCCESS, PARAMETER_ERROR } = require('../../constants/constant-keys');

const getResponse = (apiType, data) => {
    const defaultData = { api_type: apiType, res_code: 1, msg: SUCCESS };
    switch (apiType) {
        case 'gcp_controller':
            return {
                data: data,
                ...defaultData
            };
        default:
            return { api_type: apiType, res_code: 0, msg: PARAMETER_ERROR };
    }
};

module.exports = getResponse;
