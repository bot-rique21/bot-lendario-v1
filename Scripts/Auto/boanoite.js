function execute(bot) {
	const sender = bot.dados.participant
  bot.sendText(
		bot.jid, `boa noite amigo, como está sua noite?  @${sender.split("@")[0]}`,bot.createMentions([sender]));
	console.log('bom');
}

module.exports = {
	name: 'boanoite',
	prefix: false,
	execute
}; 