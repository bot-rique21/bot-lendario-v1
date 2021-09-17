function execute(bot) {
	const sender = bot.dados.participant
  bot.sendText(
		bot.jid, `boa tarde  amigo, como foi sua tarde ? @${sender.split("@")[0]}`,bot.createMentions([sender]));
	console.log('bom');
}

module.exports = {
	name: 'boatarde',
	prefix: false,
	execute
}; 