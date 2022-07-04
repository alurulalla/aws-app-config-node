const {
  AppConfigDataClient,
  BadRequestException,
  GetLatestConfigurationCommand,
  StartConfigurationSessionCommand,
} = require('@aws-sdk/client-appconfigdata');
const dotenv = require('dotenv').config();

const client = new AppConfigDataClient({});
let existingToken = '';

const getToken = async () => {
  const getSession = new StartConfigurationSessionCommand({
    ApplicationIdentifier: process.env.APP_CONFIG_APP_IDENTIFIER,
    ConfigurationProfileIdentifier:
      process.env.APP_CONFIG_CONFIG_PROFILE_IDENTIFIER,
    EnvironmentIdentifier: process.env.APP_CONFIG_ENVIRONMENT_IDENTIFIER,
  });
  const sessionToken = await client.send(getSession);
  return sessionToken.InitialConfigurationToken || '';
};

exports.configData = async () => {
  if (!existingToken) {
    existingToken = await getToken();
  }

  try {
    const command = new GetLatestConfigurationCommand({
      ConfigurationToken: existingToken,
    });
    const response = await client.send(command);
    let configurations = {};
    if (response.Configuration) {
      let str = '';
      for (let i = 0; i < response.Configuration.length; i++) {
        str += String.fromCharCode(response.Configuration[i]);
      }

      const data = JSON.parse(str);

      configurations = Object.assign({}, data);

      return configurations;
    }
  } catch (err) {
    if (err instanceof BadRequestException) {
      existingToken = await getToken();

      return configData();
    } else {
      throw err;
    }
  }
};
