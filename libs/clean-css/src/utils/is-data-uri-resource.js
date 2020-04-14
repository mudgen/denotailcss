var DATA_URI_PATTERN = /^data:(\S*?)?(;charset=[^;]+)?(;[^,]+?)?,(.+)/;

function isDataUriResource(uri) {
  return DATA_URI_PATTERN.test(uri);
}

export default isDataUriResource;
