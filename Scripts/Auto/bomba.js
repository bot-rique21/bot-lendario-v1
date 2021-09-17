function execute(bot) {
  if(bot.args.length < 2)
  return conn.sendMessage(bot.jid, 'Algo está faltando!');

  const num = bot.args[0];
  if(isNaN(num))
  return conn.sendMessage(bot.jid, 'Número invalido');

  if(num > 100)
  return conn.sendMessage(bot.jid, 'Ta doido? assim eu não aguento!');

  const text = bot.text
  .replace(num, '')
  .trim();

  const contextInfo = {
    contextInfo: bot.contextInfo
  };

  for(var i = 0; i < num; i++)
   bot.sendMessage(
    text,
    bot.jid,
    contextInfo);
}

module.exports = {
 
  name: 'bomba',
  category: 'auto',
  prefix: true,
  execute
}