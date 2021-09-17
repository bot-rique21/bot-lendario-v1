async function execute(bot) {
  const info = bot.contextInfo;
  if(!info || info.participant != bot.commands.bot_num + '@s.whatsapp.net') {
    const msg = new bot.Message();
    msg.addAnswer(bot.messageId, bot.id);
    msg.createText('Marque uma mensagem minha!');
    return wa.send(msg);
  }
  await bot.conn.deleteMessage(bot.jid, {id: info.stanzaId, remoteJid: bot.jid, fromMe: true});
  wa.sendMessage('Mensagem apagada!');
}

module.exports = {
  name: 'deleta',
  info: 'Apaga uma mensagem',
  category: 'auto',
  execute
}