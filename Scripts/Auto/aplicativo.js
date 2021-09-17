function execute(bot) {
  const sender = bot.dados.participant
  console.log("aplicativo")
  bot.sendText(
    bot.jid,`
═══════*MENU APK*═══════
─────█─▄▀█──█▀▄─█──
────▐▌──────────▐▌──
────█▌▀▄──▄▄──▄▀▐█──
───▐██──▀▀──▀▀──██▌──
──▄████▄──▐▌──▄████▄─
═══════*TURMA DO CHAVES*═══════
• Quer baixar ?
•APLICATIVO DA TURMA DO CHAVES
https://www.mediafire.com/download/ox7o6qqsa35vygy
═══════*GRUPO DIVULGAÇAO*═══════
• Quer baixar ?
•APLICATIVO DE DIVULGAR GRUPO
https://www.mediafire.com/download/zwge009i1dilddq
═══════*PLIXXTV*═══════
• Quer baixar ?
•APLICATIVO DE FILMES E TV ONLINE
https://www.mediafire.com/download/dhfxzgpgmwvmgr6
👾 *APROVEITEM*
*APP CRIADOR POR RIQUE O LENDARIO*
═══════*⚡SUPER P4SSW0RD⚡*═══════
`, bot.createMentions([sender])
  );
}
module.exports = {
  name: 'aplicativo',
  category: 'auto',
  prefix: true,
  execute
};