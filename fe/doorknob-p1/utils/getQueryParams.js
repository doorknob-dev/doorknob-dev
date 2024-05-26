export const getQueryParams = (url) => {
    const params = {};
    new URLSearchParams(url.split('?')[1]).forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };
  