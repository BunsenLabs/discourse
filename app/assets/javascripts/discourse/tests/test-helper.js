import Application from "../app";
import config from "../config/environment";
import { setApplication } from "@ember/test-helpers";
import { start } from "ember-qunit";

document.addEventListener("discourse-booted", () => {
  let setupTests = require("discourse/tests/setup-tests").default;
  let app = Application.create(config.APP);
  setApplication(app);
  setupTests(app, app.__registry__.container());
  start();
});
