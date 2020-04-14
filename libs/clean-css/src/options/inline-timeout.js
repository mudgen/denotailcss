var DEFAULT_TIMEOUT = 5000;

function inlineTimeoutFrom(option) {
  return option || DEFAULT_TIMEOUT;
}

export default inlineTimeoutFrom;
