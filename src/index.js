const core = require("@actions/core");
const github = require("@actions/github");
const send = require("./send");

const colors = {
  success: 3066993,
  failure: 15158332,
  cancelled: 15844367,
};

(async () => {
  try {
    const url = core.getInput("url").trim();
    const status = core.getInput("status").toString();
    const title = core.getInput("title");
    const description = core.getInput("description");
    const username = core.getInput("username") || "GitHub Actions";

    const mention = core.getInput("mention");
    const mention_if = core.getInput("mention_if");

    const color = colors[status];

    let content = `${github.context.workflow} - ${status}`;

    if (mention_if === status || mention_if === "always") {
      content = `${mention} ${content}`;
    }

    await send({
      url,
      username,
      content,
      embeds: [
        {
          title,
          description,
          color,
          fields: [
            {
              name: "Repository",
              value: github.context.repo.repo,
            },
            {
              name: "Ref",
              value: github.context.ref,
            },
            {
              name: "Event Name",
              value: github.context.eventName,
            },
            {
              name: "Workflow",
              value: github.context.workflow,
            },
          ],
        },
      ],
    });

    console.log("Success ✅");
  } catch (error) {
    console.log(error);
    core.setFailed(error.message);
  }
})();
