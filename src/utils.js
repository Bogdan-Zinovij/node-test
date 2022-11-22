const safeJSONParse = (data, fallback) => {
  try {
    return JSON.parse(data);
  } catch {
    return fallback;
  }
};

module.exports = { safeJSONParse };
