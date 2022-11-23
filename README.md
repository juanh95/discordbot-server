# discordbot-server

## Getting Started With The Code: 
1. Ensure [Node](https://nodejs.org/en/) is installed on your machine. 
2. Ensure [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) is installed on your machine 
3. Clone the repo onto your desired folder using `gh repo clone juanh95/discordbot-server` on terminal (You may need to authenticate before cloning)
4. Navigate into the main directory and create a `.env` file. The contents in the .env file will have this format: 

  ```
  DISCORD_TOKEN=<Your discord bot token>
  TOMTOM_KEY=<Your Tom Tom API Key>
  APP_ID=<Discord bot application id found in bot overview in discord dev portal> 
  GUILD_ID=<Server ID the bot will be added to found in discord server overview>
  ```
5. Download depenencies needed by running `npm install` on the terminal in the main directory 
6. Run `git checkout -b ＜new branch name＞` to create branch off main for the feature you will be working on 

Note: Discord Bot permissions include 'read' and 'see history'. TomTom API Key must have SearchAPI and GeocodingAPI enabled. 

## Getting Started with the Bot
6. Follow [Adding your bot to servers](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#adding-your-bot-to-servers) guide to add the bot your server 
7. Run `node deploy-commands.js' on the terminal in the main directory to populate the commands for the bot on the server 
8. Run `node index.js` to activate the bot 
9. Test with `/ping` on the discord server the bot is on 
