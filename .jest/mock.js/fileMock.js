module.exports = "test-file-stub";

import {rest} from msw;

export const handlers = [
    rest.get("https://pokeapi.co/api/v2/pokemon", (req, res, ctx) => {
      const limit = req.url.searchParams.get("limit");
      return res(ctx.json({ results: [], limit }));
    }),
  ];