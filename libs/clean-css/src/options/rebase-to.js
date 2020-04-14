import path from 'path';

function rebaseToFrom(option) {
  return option ? path.resolve(option) : process.cwd();
}

export default rebaseToFrom;
