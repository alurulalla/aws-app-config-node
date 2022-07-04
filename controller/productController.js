const { configData } = require('../util/getConfigurations');

const productV1 = [{ name: 'Product 1' }];

const productV2 = [{ name: 'Product 2' }];

const getConfigurations = async () => {
  try {
    return await configData();
  } catch (error) {
    console.log(error);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const config = await getConfigurations();
    console.log(config);
    console.log(config.organization);

    if (config.version === 'v1') {
      res.send(productV1);
    } else if (config.version === 'v2') {
      res.send(productV2);
    }
  } catch (error) {
    res.status(404);
  }
};
