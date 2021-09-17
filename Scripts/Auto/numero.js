function execute(bot) {
  const sender = bot.dados.participant
     bot.createMentions([sender])
	bot.sendText(bot.jid, `┏━━━━━━━━━━━━━━━━━━━━ 
┠⊷seu numero é
┠⊷ wa.me/${sender.split("@")[0]}   
┗━━━━━━━━━━━━━━━━━━━━ `);
	console.log('numero');
}

module.exports = {
	name: 'numero',
	prefix: true,
	execute
};