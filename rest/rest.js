const { environment, http } = require('bungee-lib');
const { requests } = http;

const query = async ({ model, query_params, page, page_size, order_by, order_direction }) => {
    const url = `${environment.vars.API_DOMAIN}/rest/${model}/`;
    const response = await requests.get({
        url,
        query_params: {
            ... query_params,
            page,
            page_size,
            order_by,
            order_direction
        }
    });
    return __parse_response(response);
};

const create = async ({ model, item }) => {
    const url = `${environment.vars.API_DOMAIN}/rest/${model}`;
    const response =  await requests.post({ url, request_body: item });
    return __parse_response(response);
};

const retrieve = async ({ model, id }) => {
    const url = `${environment.vars.API_DOMAIN}/rest/${model}/${id}`;
    const response =  await requests.get({ url });
    return __parse_response(response);
};

const update = async ({ model, item }) => {
    const url = `${environment.vars.API_DOMAIN}/rest/${model}`;
    const response =  await requests.put({ url, request_body: item });
    const raw_update_response = __parse_response(response);
    return { ... raw_update_response, data: raw_update_response.data[1][0] }
};

const destroy = async ({ model, id }) => {
    const url = `${environment.vars.API_DOMAIN}/rest/${model}/${id}`;
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
    query,
    create,
    retrieve,
    update,
    destroy
};
