var REMOTE_RESOURCE_PATTERN = /^(\w+:\/\/|\/\/)/;

function isRemoteResource(uri) {
  return REMOTE_RESOURCE_PATTERN.test(uri);
}

export default isRemoteResource;
