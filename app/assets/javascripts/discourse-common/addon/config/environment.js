export const INPUT_DELAY = 250;

let environment = "unknown";

export function setEnvironment(e) {
  environment = e;
}

export function isTesting() {
  return environment === "testing";
}

export function isDevelopment() {
  return environment === "development";
}

export function isProduction() {
  return environment === "production";
}
