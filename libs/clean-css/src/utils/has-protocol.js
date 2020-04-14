var NO_PROTOCOL_RESOURCE_PATTERN = /^\/\//;

function hasProtocol(uri) {
  return !NO_PROTOCOL_RESOURCE_PATTERN.test(uri);
}

export default hasProtocol;
