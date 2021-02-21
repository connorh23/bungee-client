const rest = require('./rest');

let MODEL_NAME;

class ModelClient {

   constructor({ model_name }) {
      MODEL_NAME = model_name;
   }

   create = async item => {
      let response = await rest.create({ model: MODEL_NAME, item });
      return response.data;
   };

   retrieve = async id => {
      let response = await rest.retrieve({ model: MODEL_NAME, id });
      return response.data;
   };

   update = async item => {
      let response = await rest.update({ model: MODEL_NAME, item });
      return response.data;
   };

   destroy = async id => {
      let response = await rest.destroy({ model: MODEL_NAME, id });
      return response.data === 1;
   };
}

module.exports = ModelClient;
