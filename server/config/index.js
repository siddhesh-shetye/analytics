'use strict';

module.exports = {
  default: ({ env }) => (
    {
      attempts_enabled: env("ATTEMPTS_ENABLED"),
      analytics_hours: env("ATTEMPTS_HOURS"),
      analytics_attempts: env("ATTEMPTS"),
    }
  ),
  validator() {},
};

