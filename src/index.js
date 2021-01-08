// require @actions/core
const core = require("@actions/core");
// require @actions/github
const github = require("@actions/github");
// require ./send.js
const send = require("./send");

try {
  const url = core.getInput("url");
  const status = core.getInput("status");
  const title = core.getInput("title");
  const description = core.getInput("description");
  const mention = core.getInput("mention");
  const mention_if = core.getInput("mention_if");

  // github.context.job.status
  console.log("🚀 ~ github.context", github.context)

  send({
    url,

    content: `${github.workflow} - Success`,
    embeds: [
      {
        title,
        description,
        fields: [
          {
            name: "Repository",
            value: github.context.repository,
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
} catch (error) {
  core.setFailed(error.message);
}
