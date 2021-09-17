function execute(bot) {
  const sender = bot.dados.participant
  console.log("menu")
  bot.sendText(
    bot.jid,`┏━━━━━━━━━━━━━━━━━━━━
┃─────〘 INFORMAÇÕES 〙────
┃━━━━━━━━━━━━━━━━━━━━
┠⊷ Nome: @${sender.split("@")[0]}
┠⊷ Bot esta Desenvolvimento
┠⊷ Status: 24 horas on
┠⊷ número é (wa.me/${sender.split("@")[0]}) 
┠⊷ Prefix:「-」 
┗━━━━━━━━━━━━━━━━━━━━
┏━━━━━━━━━━━━━━━━━━━━
┃─────〘 MENU DO BOT 〙────
┃━━━━━━━━━━━━━━━━━━━━
┠⊷ oi (sem prefixo)
┠⊷ tutor(com prefixo)
┠⊷ numero (com prefixo)
┠⊷ figurinha (sem prefixo)
┗━━━━━━━━━━━━━━━━━━━━
┏━━━━━━━━━━━━━━━━━━━━
┃─────〘 Dono do Bot 〙────
┃━━━━━━━━━━━━━━━━━━━━
┠⊷ tiradm (sem prefixo)
┠⊷ remover (sem prefixo)
┠⊷ promover(sem prefixo)
┗━━━━━━━━━━━━━━━━━━━━ 

┏━━━━━━━━━━━━━━━━━━━━
┠⊷ Cᴏᴘʏʀɪɢʜᴛ ® Bᴏᴛ ᴏ Lᴇɴᴅᴀʀɪᴏ 
┠⊷ Comandos (7)
┗━━━━━━━━━━━━━━━━━━━━ `, bot.createMentions([sender])
  );
}
module.exports = {
  name: 'menu',
  category: 'auto',
  prefix: true,
  execute
};