const core = require("@actions/core");
const github = require("@actions/github");
const send = require("./send");


(async () => {
  try {
    const url = core.getInput("url");
    console.log("🚀 ~ file: index.js ~ line 9 ~ url", url)
    const status = core.getInput("status");
    const title = core.getInput("title");
    const description = core.getInput("description");
    const mention = core.getInput("mention");
    const mention_if = core.getInput("mention_if");
  
    // github.context.job.status
    // console.log("🚀 ~ github.context", github.context)
  
    const result = await send({
      url,
      username: "Ci/Cd",
      content: `${github.workflow} - Success`,
      embeds: [
        {
          title,
          description,
          author: {
            name: username,
          },
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
  
    core.setOutput('result', result);
  } catch (error) {
    console.log("🚀 ~ file: index.js ~ line 51 ~ error", error)
    console.log("🚀 ~ file: index.js ~ line 51 ~ error", error.message)
    core.setFailed(error.message);
  }
})();
