function execute(bot) {
  const sender = bot.dados.participant
	bot.sendText(bot.jid, ` 
┏━━━━━━━━━━━━━━━━━━━━
┃        〘 TUTORIAL BOT 〙
┃━━━━━━━━━━━━━━━━━━━━
┠⊷ Nome: @${sender.split("@")[0]}
┠⊷ CRIANDO BOT PARA WHATSAPP :
┠⊷ https://youtu.be/d2l3qrkKG1o
┠⊷ TUTORIAL NOSSO AMIGO LAXEDER NOSSO PROF
┏━━━━━━━━━━━━━━━━━━━━
┃───〘 CREATING BOT〙──
┗━━━━━━━━━━━━━━━━━━━━
 `,bot.createMentions([sender]));
	console.log('tutor');
}

module.exports = {
	name: 'tutor',
	prefix: true,
	execute
};
