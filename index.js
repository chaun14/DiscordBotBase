//dépendances
const Discord               = require('discord.js');         // discord.js = lib pour les bots discord
const fs                    = require('fs');                 // fs = gestionnaire de fichiers

//fichiers json externes
const config                = require("./config.json");      //fichier de configuration du bot


const client                = new Discord.Client();          //Initialisation du client discord.js 
client.commands             = new Discord.Collection();      //list pour les commandes 

//Connexion du bot à discord
client.login(config.token)                                                             //préfix ici
	.then(function() {                                                                      // récupère l'état de la tâche
		console.log("Connexion à discord réussie");                                           //log si tout s'est bien passé
	}, function(err) {
		console.log("Erreur durant la connexion à discord. Vérifiez votre token ou regardez l'erreur suivante:" + " ~ " + err);    //si problème log tout dans la console
  });


//event de démarrage du bot
client.on("ready", () => {
  // message de bienvenue dans la console du bot
  console.log(`
        ╔═════════════════════════════════╗
        ║-->  Bot Name : ${client.user.username}         ╢
        ╟─────────────────────────────────╢
        ║-->  Prefix   : ${config.prefix}                ╢
        ╟─────────────────────────────────╢
        ║-->  Users    : ${client.users.filter(user => user.bot === false).size}               ╢
        ╟─────────────────────────────────╢
        ║-->  Bots     : ${client.users.filter(user => user.bot === true).size}                ╢
        ╟─────────────────────────────────╢
        ║-->  Channels : ${client.channels.size}               ╢
        ╟─────────────────────────────────╢
        ║-->  Guilds   : ${client.guilds.size}                ╢
        ╚═════════════════════════════════╝`);



  //met le bot en streaming et lui défini un jeu
  client.user.setActivity(`${config.prefix}help | Bot de base`, { type: 'STREAMING', url: 'https://www.twitch.tv/1234' });

});


// recherche les différents fichiers de commande dans un dossier spécifique
fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

//prend les fichiers de commande et les add à la collection
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    client.commands.set(props.help.name, props);
  });
});




//event message du bot 
client.on("message", async message => {

  if(message.content.indexOf(config.prefix) !== 0) return;                                 // vérifie que le message commence bien par le préfix
  if(message.author.bot) return;                                                           // stop si c'est un autre bot qui à envoyé le message

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);            // récupère les argument donnés après le préfix

  let messageArray = message.content.split(" ");                                           //sépare les argument séparés par un espace et les met dans un tableau

  let cmd = messageArray[0];                                                               // récupère le premier argument qui correspond à la commande

  let commandfile = client.commands.get(cmd.slice(config.prefix.length));                  // recherche si il n'y à pas une commande correspondant dans la collection (+ enlève le préfix)
  if(commandfile) commandfile.run(client,message,args);                                    //lance la commande dans le fichier en question
  
  const command = args.shift().toLowerCase();                                              // utile si utilisation des commandes dans le index.js





// exemple de commande dans le index.js    
  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Le ping du bot est de ${m.createdTimestamp - message.createdTimestamp}ms. Ping de l'API ${Math.round(client.ping)}ms`);
  }


});


//event ajoute sur un serveur
client.on("guildCreate", guild => {

});

//event retiré d'un serveur
client.on("guildDelete", guild => {
 
});
