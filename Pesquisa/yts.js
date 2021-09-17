const yts = require('yt-search');
async function execute( bot) {
  if(bot.text.trim() == '') return wa.sendMessage('Infome o que quer que eu pesquise!');

  await bot.sendMessage('Aguarde...');

  const result = await yts(bot.text);
  const video = result.videos.slice(0, 1)[0];
  if(!video) return bot.sendMessage('Não encontrei nenhum video com esse nome .-.');

  let message = '';
    message += `*Título:*\n${video.title}\n`
    message += `\n*Url:*\n${video.url}\n`
    message += `\n*Views:*\n${video.views}\n`
    message += `\n*Duração*\n${getTime(video.seconds)}\n`
    message += `\n*Canal:*\n${video.author.name}\n`
    message += `\n*Url do Canal:*\n${video.author.url}`
    console.log(video)

    const msg = new bot.Message();
    msg.addAnswer(bot.messageId, bot.id);
    msg.createImage(video.thumbnail, message);
    bot.send(msg);
}

function getTime(time) {
  let seconds = time;
  let minutes = 0;
  let hours = 0;

  while(seconds > 60) {
    seconds -= 60;
    minutes += 1;
  }

  while(minutes > 60) {
    minutes -= 60;
    hours += 1;
  }

  seconds = minutes != 0 && seconds.toString().length == 1
  ? '0' + seconds 
  : seconds;

  minutes = hours != 0 && minutes.toString().length == 1
  ? '0' + minutes 
  : minutes;

  if(hours == 0) return `${minutes}:${seconds}`
  else return `${hours}:${minutes}:${seconds}`

}

module.exports = {
  name: 'yts',
  info: 'Pesquisa um video no youtube',
  category: 'Pesquisas',
  execute
}