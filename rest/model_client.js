const rest = require('./rest');

class Client {
   MODEL_NAME;
   constructor({ model_name }) {
      this.MODEL_NAME = model_name;
   }
}

class ModelClient extends Client {

   constructor({ model_name }) {
      super({ model_name});
   }

   create = async item => {
      let response = await rest.create({ model: this.MODEL_NAME, item });
      return response.data;
   };

   retrieve = async id => {
      let response = await rest.retrieve({ model: this.MODEL_NAME, id });
      return response.data;
   };

   update = async item => {
      let response = await rest.update({ model: this.MODEL_NAME, item });
      return response.data;
   };

   destroy = async id => {
      let response = await rest.destroy({ model: this.MODEL_NAME, id });
      return response.data === 1;
   };
}

module.exports = ModelClient;
