import path from 'path';
import url from 'url';

function rebaseRemoteMap(sourceMap, sourceUri) {
  var sourceDirectory = path.dirname(sourceUri);

  sourceMap.sources = sourceMap.sources.map(function(source) {
    return url.resolve(sourceDirectory, source);
  });

  return sourceMap;
}

export default rebaseRemoteMap;
