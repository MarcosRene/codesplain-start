import { setupServer } from "msw/node";
import { rest } from "msw";

export const createServer = (handlerConfig) => {
  const handlers = handlerConfig.map((config) =>
    rest[config.method || "get"](config.path, (req, res, ctx) =>
      res(ctx.json(config.res(req, res, ctx)))
    )
  );

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());
};
