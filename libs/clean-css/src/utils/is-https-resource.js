var HTTPS_RESOURCE_PATTERN = /^https:\/\//;

function isHttpsResource(uri) {
  return HTTPS_RESOURCE_PATTERN.test(uri);
}

export default isHttpsResource;
