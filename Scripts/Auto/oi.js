function execute(bot) {
	const sender = bot.dados.participant
  bot.sendText(
		bot.jid, `Oi, estou pronto pode me usar!!! @${sender.split("@")[0]}`,bot.createMentions([sender]));
	console.log('bom');
}

module.exports = {
	name: 'oi',
	prefix: false,
	execute
}; 