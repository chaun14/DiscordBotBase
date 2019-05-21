const { Discord, RichEmbed} = require('discord.js');


module.exports.run = async (bot, message, args) => {
        const sayMessage = args.join(' ').slice(3)
            if(sayMessage === "") {
      message.channel.send("il manque un truc... *(exemple: hw!say je suis le meilleur des bots)*");}
   if(message.member.hasPermission("MANAGE_GUILD")) {
      message.delete().catch(O_o=>{});
      message.channel.send(sayMessage);
      console.log('[say] --> '+ sayMessage);}
      else {
      message.reply("tu n'as pas la permission d'effectuer cette commande");
  console.log('[say] un joueur à tenté de !say --> '+ sayMessage );
     }
  
}


  module.exports.help = {
    name: "say"
  }