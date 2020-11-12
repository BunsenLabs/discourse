import { mapRoutes } from "discourse/mapping-router";

export default {
  name: "map-routes",
  after: "inject-discourse-objects",

  initialize(container, app) {
    app.unregister("router:main");
    let router = mapRoutes();

    app.register("router:main", router);
    container.registry.register("router:main", router);
  },
};
