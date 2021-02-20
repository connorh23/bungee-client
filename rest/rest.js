const { environment } = require('bungee-lib');

const { requests, responses } = require('bungee-lib/http');

const create = async ({ model, item }) => {
    const url = `${environment.vars.API_DOMAIN}/rest/${model}/create`;
    const response =  await requests.post({ url, request_body: item });
    return __parse_response(response);
};

const retrieve = async ({ model, id }) => {
    const url = `${environment.vars.API_DOMAIN}/rest/${model}/retrieve/${id}`;
    const response =  await requests.get({ url });
    return __parse_response(response);
};

const update = async ({ model, item }) => {
    const url = `${environment.vars.API_DOMAIN}/rest/${model}/update`;
    const response =  await requests.put({ url, request_body: item });
    const raw_update_response = __parse_response(response);
    return { ... raw_update_response, data: raw_update_response.data[1] }
};

const destroy = async ({ model, id }) => {
    const url = `${environment.vars.API_DOMAIN}/rest/${model}/destroy/${id}`;
    const response = await requests.destroy({ url });
    return __parse_response(response);
};

const __parse_response = response => {
    return (({
        status,
        statusText,
        headers,
        config,
        data,
    }) => ({ status, statusText, headers, config, telemetry: data.telemetry, data: data.data }))(response);
};

module.exports = {
    create,
    retrieve,
    update,
    destroy
};
