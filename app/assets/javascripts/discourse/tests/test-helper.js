import config from "../config/environment";
import { start } from "ember-qunit";
import { setEnvironment } from "discourse-common/config/environment";

setEnvironment("testing");

document.addEventListener("discourse-booted", () => {
  let setupTests = require("discourse/tests/setup-tests").default;
  Ember.ENV.LOG_STACKTRACE_ON_DEPRECATION = false;

  let appConfig = Object.assign({}, config.APP, {
    autoboot: false,
  });

  setupTests(appConfig);
  start();
});
