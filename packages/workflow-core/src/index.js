import { resolve, alternatives } from './resolver';
import { load } from './loader';
import { transform } from './transformer';
import { apply, screen } from './wm';

export function workflow({ resolvers, loaders, argumentParser, transformers, layout, server, wm }) {
  return {
    resolve: async path => resolve(resolvers, path),
    alternatives: async path => alternatives(resolvers, path),
    load: async path => load(loaders, path),
    parseArguments: async (flow, argv) => argumentParser.parse(flow, argv),
    transform: async (flow, args) => transform(transformers, flow, args),
    layout: async (flow, { screen }) => layout.layout(flow, { screen }),
    screen: async () => screen(wm),
    apply: async (flow, waitFor) => apply(wm, flow, waitFor),

    /* workflow-server */
    startServer: () => server.start(),
    register: async flow => server.register(flow),
    waitFor: async app => server.waitFor(app),
    updateRegister: async flow => server.updateRegister(flow),
  };
}
