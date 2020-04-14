var DATA_URI_PATTERN = /^data:(\S*?)?(;charset=[^;]+)?(;[^,]+?)?,(.+)/;

function matchDataUri(uri) {
  return DATA_URI_PATTERN.exec(uri);
}

export default matchDataUri;
