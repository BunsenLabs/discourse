(function () {
  // TODO: Remove this and have resolver find the templates
  const prefix = "discourse/templates/";
  const adminPrefix = "admin/templates/";
  let len = prefix.length;
  Object.keys(requirejs.entries).forEach(function (key) {
    if (key.indexOf(prefix) === 0) {
      Ember.TEMPLATES[key.substr(len)] = require(key).default;
    } else if (key.indexOf(adminPrefix) === 0) {
      Ember.TEMPLATES[key] = require(key).default;
    }
  });

  // TODO: Eliminate this global
  window.virtualDom = require("virtual-dom");

  let head = document.getElementsByTagName("head")[0];
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      let script = document.createElement("script");
      script.onload = () => resolve();
      script.src = src;
      head.appendChild(script);
    });
  }

  let element = document.querySelector(
    `meta[name="discourse/config/environment"]`
  );
  const config = JSON.parse(
    decodeURIComponent(element.getAttribute("content"))
  );
  fetch("/bootstrap.json")
    .then((res) => res.json())
    .then((data) => {
      config.bootstrap = data.bootstrap;

      // We know better, we packaged this.
      config.bootstrap.setup_data.markdown_it_url =
        "/assets/discourse-markdown.js";

      let locale = data.bootstrap.locale_script;

      (data.bootstrap.stylesheets || []).forEach((s) => {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", s.href);
        if (s.media) {
          link.setAttribute("media", s.media);
        }
        if (s.target) {
          link.setAttribute("data-target", s.target);
        }
        if (s.theme_id) {
          link.setAttribute("data-theme-id", s.theme_id);
        }
        head.append(link);
      });

      loadScript(locale).then(() => {
        define("I18n", ["exports"], function (exports) {
          return I18n;
        });
        window.__widget_helpers = require("discourse-widget-hbs/helpers").default;
        let extras = (data.bootstrap.extra_locales || []).map(loadScript);
        return Promise.all(extras).then(() => {
          const event = new CustomEvent("discourse-booted", { detail: config });
          document.dispatchEvent(event);
        });
      });
    });
})();
