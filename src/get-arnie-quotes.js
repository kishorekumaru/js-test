const { httpGet } = require("./mock-http-interface");

/**
 * This is a helper function helps to extend to
 * have different property names based on the status code.
 * @param {number} status
 * return {string} property name
 */
const getPropertyName = (status) => {
  switch (status) {
    case 500:
      return "FAILURE";
    case 200:
    default:
      return "Arnie Quote";
  }
};

/**
 *
 * @param {API Response} response
 * @returns JSON parsed response
 */
const getMessage = (response) => JSON.parse(response.body)?.message;

/**
 *
 * @param {string} urls
 * @returns Array of response
 */
const getArnieQuotes = async (urls) => {
  // TODO: Implement this function.
  const results = await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await httpGet(url);
        return {
          [getPropertyName(response.status)]: getMessage(response),
        };
      } catch (e) {
        return { FAILURE: e.message };
      }
    })
  );

  return results;
};

module.exports = {
  getArnieQuotes,
};
