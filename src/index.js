const core = require("@actions/core");
const github = require("@actions/github");
const send = require("./send");


(async () => {
  try {
    const url = core.getInput("url").trim();
    const status = core.getInput("status");
    console.log("🚀 ~ file: index.js ~ line 10 ~ status", status)
    const title = core.getInput("title");
    const description = core.getInput("description");
    const mention = core.getInput("mention");
    const mention_if = core.getInput("mention_if");
  
    await send({
      url,
      username: "Ci/Cd",
      content: `${github.context.workflow} - Success`,
      embeds: [
        {
          title,
          description,
          author: {
            name: "Ci/Cd",
          },
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
  
    console.log("Success ✅")
  } catch (error) {
    core.setFailed(error.message);
  }
})();
