const settings = {
  repo: "fischer-frontend",
  user: "Christian99-dev",
  event_types: ["strapi-staging", "strapi-production"],
  token: process.env.GIT_PAT,
};
const fs = require("fs");
const util = require("util");
const log_file = fs.createWriteStream(__dirname + "/githubactions_debug.log", {
  flags: "w",
});
const log_stdout = process.stdout;

const logging = (d, e, f, g) => {
  log_file.write(
    util.format("LOG: ", d ? d : "", e ? e : "", f ? f : "", g ? g : "") + "\n"
  );
  log_stdout.write(
    util.format("LOG: ", d ? d : "", e ? e : "", f ? f : "", g ? g : "") + "\n"
  );
};

module.exports = {
  githubActionCall() {
    if (process.env.NODE_ENV === "development") {
      logging(
        "Jetzt würde GithubActionCall() ausgeführt werden, wenn wir in Production wären"
      );
      return;
    }

    settings.event_types.forEach(async (eventType) => {
      const requestData = JSON.stringify({ event_type: eventType });

      try {
        const response = await fetch(
          `https://api.github.com/repos/${settings.user}/${settings.repo}/dispatches`,
          {
            method: "POST",
            body: requestData,
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: `token ${settings.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 204) {
          logging(`Event "${eventType}" dispatched successfully.`);
        } else {
          const errorData = await response.text();
          logging(
            `Failed to dispatch event "${eventType}". Status code: ${response.status}`
          );
          logging(errorData);
        }
      } catch (error) {
        logging(`Error dispatching event "${eventType}": ${error.message}`);
      }
    });
  },
  register: {
    afterCreate() {
      strapi.config.githubActions.githubActionCall();
    },
    afterUpdate() {
      strapi.config.githubActions.githubActionCall();
    },
    afterDelete() {
      strapi.config.githubActions.githubActionCall();
    },
  },
};
