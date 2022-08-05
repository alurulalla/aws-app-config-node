const { configData } = require('../util/getConfigurations');

const productV1 = [
  { name: 'Product 1', price: '49.00', description: 'New Product 1' },
];

const productV2 = [
  { name: 'Product 2', price: '99.00', description: 'New Product 2' },
];

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
    return config.launchFeature.enabled
      ? res.json(productV1)
      : res.json(productV2);
  } catch (error) {
    res.status(404);
  }
};

exports.getOffers = async (req, res) => {
  try {
    const config = await getConfigurations();
    return res.json(config.promotionalOffer);
  } catch (error) {
    res.status(404);
  }
};
