const { httpGet } = require("./mock-http-interface");

const getArnieQuotes = async (urls) => {
  // TODO: Implement this function.
  const results = await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await httpGet(url);
        return {
          [response.status === 200 ? "Arnie Quote" : "FAILURE"]: JSON.parse(
            response.body
          )?.message,
        };
      } catch (e) {
        return {
          FAILURE: e.message,
        };
      }
    })
  );

  return results;
};

module.exports = {
  getArnieQuotes,
};
