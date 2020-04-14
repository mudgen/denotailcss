import Token from '../../tokenizer/token';
import { body as serializeBody } from '../../writer/one-time';
import { rules as serializeRules } from '../../writer/one-time';

function removeDuplicates(tokens) {
  var matched = {};
  var moreThanOnce = [];
  var id, token;
  var body, bodies;

  for (var i = 0, l = tokens.length; i < l; i++) {
    token = tokens[i];
    if (token[0] != Token.RULE)
      continue;

    id = serializeRules(token[1]);

    if (matched[id] && matched[id].length == 1)
      moreThanOnce.push(id);
    else
      matched[id] = matched[id] || [];

    matched[id].push(i);
  }

  for (i = 0, l = moreThanOnce.length; i < l; i++) {
    id = moreThanOnce[i];
    bodies = [];

    for (var j = matched[id].length - 1; j >= 0; j--) {
      token = tokens[matched[id][j]];
      body = serializeBody(token[2]);

      if (bodies.indexOf(body) > -1)
        token[2] = [];
      else
        bodies.push(body);
    }
  }
}

export default removeDuplicates;
