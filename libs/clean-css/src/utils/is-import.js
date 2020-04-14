var IMPORT_PREFIX_PATTERN = /^@import/i;

function isImport(value) {
  return IMPORT_PREFIX_PATTERN.test(value);
}

export default isImport;
