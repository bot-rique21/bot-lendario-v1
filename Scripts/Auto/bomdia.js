function execute(bot) {
	const sender = bot.dados.participant
  bot.sendText(
		bot.jid, `bom dia amigo @${sender.split("@")[0]}`,bot.createMentions([sender]));
	console.log('bom');
}

module.exports = {
	name: 'bom',
	prefix: false,
	execute
}; 