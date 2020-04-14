var HTTP_RESOURCE_PATTERN = /^http:\/\//;

function isHttpResource(uri) {
  return HTTP_RESOURCE_PATTERN.test(uri);
}

export default isHttpResource;
