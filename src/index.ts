import { Probot } from "probot";
// import commands from "probot-commands";
import Scathach from 'scathach-api'

const config = {
  useragent: '',
  apikey: ''
};

const sca = new Scathach(config);

export = (app: Probot) => {
  app.log("Im alive!");

  app.on("issues.opened", async (context) => {
    const list: any = [await sca.getReaction('uwu'), await sca.getReaction('uwu'),
    await sca.getReaction('pout'), await sca.getReaction('smug')];
    let img: any = list[Math.floor(Math.random() * list.length)];

    const thanks: Array<string> = [
      "You'll get a response soon! UwU",
      "Thanks for opening this issue, we will get back to you soon! OwO",
      "I see you opened an issue, an admins or collaborators will get back to you soon! UmU",
    ];
    const issueComment = context.issue({
      //mention username
      body: `Hey! @${context.payload.issue.user.login} ${thanks[Math.floor(Math.random() * thanks.length)]}
      <details>
      <summary>Click here to make your day UmU</summary>
      ![abc](${img.url} "UmU")
      </details>`,
    });
    await context.octokit.issues.createComment(issueComment);
    await context.octokit.issues.addLabels(context.issue({ labels: ["triage"] }));
  });

  // create event pull request
  app.on("pull_request.opened", async (context) => {
    let img: any = await sca.getReaction('pat');
    //create random thanks array
    const thanks: Array<string> = [
      "Thanks for making a pull request, an collaborators will get back to you soon! UwU",
      "We will get back to you soon! OwO",
      "What a great improvements, we will consider it! UmU",
    ];
    const issueComment = context.issue({
      //mention username
      body: `Hey?! @${context.payload.pull_request.user.login} ${thanks[Math.floor(Math.random() * thanks.length)]}
      <details>
      <summary>Click here to make your day UmU</summary>
      ![abc](${img.url} "UmU")
      </details>`
    });
    await context.octokit.issues.createComment(issueComment);
    await context.octokit.issues.addLabels(context.issue({ labels: ["pr:pending"] }));
  });

  /*
  commands(app, "label", async (context: any, command: any) => {
    console.log(context.payload.comment.user);
    const labels = ## 
    await context.octokit.issues.addLabels(context.issue({ labels }));

    
    const issueComment = context.issue({
      //mention username
      body: `welp`
    });
    await context.octokit.issues.createComment(issueComment);
   
  });
 */
};


