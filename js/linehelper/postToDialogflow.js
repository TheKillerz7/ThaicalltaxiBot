const axios = require('axios')

exports.postToDialogflow = req => {
  req.headers.host = "dialogflow.cloud.google.com";

  let config = {
    headers: {
        ...req.headers
    }
  }
  let body = {
    ...req.body
  }

  return axios.post("https://dialogflow.cloud.google.com/v1/integrations/line/webhook/c85c863b-76fb-488e-aed7-b0a41afabbd8", body, config);
};