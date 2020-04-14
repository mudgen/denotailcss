import Token from '../../tokenizer/token';
import { all as serializeAll } from '../../writer/one-time';
import { rules as serializeRules } from '../../writer/one-time';

function removeDuplicateMediaQueries(tokens) {
  var candidates = {};
  var candidate;
  var token;
  var key;
  var i, l;

  for (i = 0, l = tokens.length; i < l; i++) {
    token = tokens[i];
    if (token[0] != Token.NESTED_BLOCK) {
      continue;
    }

    key = serializeRules(token[1]) + '%' + serializeAll(token[2]);
    candidate = candidates[key];

    if (candidate) {
      candidate[2] = [];
    }

    candidates[key] = token;
  }
}

export default removeDuplicateMediaQueries;
