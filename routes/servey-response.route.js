const servey = require('../controller/servey-response.controller');
const auth = require('../middleware/auth');

module.exports = (router, mainPath) => {
  router.post(`${mainPath}/submitResponse`,auth.retriveAuth, servey.submitResponse);
  router.get(`${mainPath}/getChartData`,servey.getChartData);
  router.post(`${mainPath}/checkResponseValidity`, servey.checkResponseValidity);
  router.post(`${mainPath}/getEmotionsData`, servey.getEmotionsData);
  router.post(`${mainPath}/getTopMostPolledData`, servey.getTopMostPolledData);
}
