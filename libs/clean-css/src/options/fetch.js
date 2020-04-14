import loadRemoteResource from '../reader/load-remote-resource';

function fetchFrom(callback) {
  return callback || loadRemoteResource;
}

export default fetchFrom;
