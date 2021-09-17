const wsapp = require('wsapp');
const sharp = require('sharp');
const { Connection, MessageType, Presence } = wsapp;
const express = require('express');
const app = express();
const fs = require('fs');

app.get('/', (request, response) => {
	console.log('Bot Online');
	response.sendStatus(200);
});
app.listen(process.env.PORT);

const conn = new Connection();
conn.on('qr', () => {
});

if (fs.existsSync('./auth_info.json'))
conn.loadAuthInfo('./auth_info.json');

conn.on('open', () => {
 const authInfo = conn.base64EncodedAuthInfo();
	fs.writeFileSync('./auth_info.json', JSON.stringify(authInfo, null, '\t'));
});
conn.connect();

var bot = {
	nome: 'bot-lendario',
	conn,
	MessageType,
	sendText(jid, message, quoted) {
		conn.sendMessage(jid, message, MessageType.extendedText, quoted);
	},
	createMentions(participants) {
		return { contextInfo: { mentionedJid: participants } };
	},
	scripts: {}
};

getPatch('./Scripts');

function getPatch(path) {
	const files = fs.readdirSync(path);
	files.forEach(function(element, index, array) {
		let file = `${path}/${element}`;
		if (fs.lstatSync(file).isDirectory()) {
			getPatch(file);
		} else {
			let script = require(file);
			bot.scripts[script.name] = script;
		}
	});
}

conn.on('group-participants-update', update => {
	const participants = update.participants;
	if (update.action == 'add') {
		for (let index in participants) {
			bot.sendText(
				update.jid,
				`┏━━━━━━━━━━━━━━━━━━━━
┃─────〘𝙱𝙴𝙼 𝚅𝙸𝙽𝙳𝙾 〙────
┃━━━━━━━━━━━━━━━━━━━━
┠⊷ 𝙽𝙾𝙼𝙴: @${participants[index].split('@')[0]}
┠⊷ Lᴇɪᴀ ᴀs ʀᴇɢʀᴀs ᴘʀᴀ ɴᴀ̃ᴏ sᴇʀ
┠⊷ ʙᴀɴɪᴅᴏ! 
┠⊷ Mᴇᴜ ᴄʀɪᴀᴅᴏʀ:
┠⊷ wa.me/554891428604
┗━━━━━━━━━━━━━━━━━━━━`,
				bot.createMentions([participants[index]])
			);
		}
	}
	if (update.action == 'remove') {
		bot.sendText(
			update.jid,
			`que pena saiu do nosso grupo @${participants[0].split('@')[0]}`,
			bot.createMentions(participants)
		);
	}
});


conn.on('chat-update', chatUpdate => {
	if (chatUpdate.messages && chatUpdate.count) {
		bot.dados = chatUpdate.messages.all()[0];
		bot.jid = bot.dados.key.remoteJid;
		bot.info = bot.dados.message;
		bot.type = Object.keys(bot.info);

		bot.message =
			bot.type == 'conversation' && bot.info.conversation
				? bot.info.conversation
				: bot.type == 'imageMessage' && bot.info.imageMessage.caption
					? bot.info.imageMessage.caption
					: bot.type == 'videoMessage' && bot.info.videoMessage.caption
						? bot.info.videoMessage.caption
						: bot.type == 'extendedTextMessage' &&
						  bot.info.extendedTextMessage.text
							? bot.info.extendedTextMessage.text
							: '';

		bot.args = bot.message
			.trim()
			.split(/ +/)
			.slice(1);

		conn.chatRead(bot.jid);

		if (!bot.message.startsWith('-')) {
			bot.command = bot.message.split(/ +/)[0];
			bot.message_prefix = false;
		} else {
			bot.command = bot.message
				.slice(1)
				.trim()
				.split(/ +/)
				.shift()
				.toLowerCase();
			bot.message_prefix = true;
		}
		conn.updatePresence(Presence.composing);

		let cmd = bot.scripts[bot.command];
		if (cmd && cmd.prefix == bot.message_prefix) {
			cmd.execute(bot);
			console.log(`CMD --> execute --> ${cmd.name}`);
		}
	}
});

conn.on('new-message', message => {
	if (message.fromMe) return;
	if (!message.text) return;
	console.log(message);
	var id = message.sent;
	var msg = new wsapp.Message();
	var text = message.text
  var image = message.text
		.toLowerCase()
		.split('\n')[0]
		.split(' ')[0];

	switch (text) {
		case 'meme':
			msg.createText('desenvolvendo ainda');
			conn.msg.createImage({ uri: 'https://bot-apis.herokuapp.com/fillipe/meme'});
			break;
case 'figurinha':
      if(message.type == wsapp.MessageType.image) {
        
        const path = `./${Math.floor(Math.random() * 100)}.webp`;

        sharp(message.media)
          .resize({
            width: 512,
            height: 512,
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .toFormat('webp')
          .webp({ quality: 10 })
          .toFile(path, (err, info) => {
            fs.readFile(path, async (err, data) => {
              if (err) throw err;
                let str = data.toString('base64')
                console.log(info)
                data = Buffer.from(str, 'base64');
                msg.createSticker(data, false);
                msg.setSize(512, 512);
                await conn.sendMessage(id, msg);
                fs.unlinkSync(path);
            });
          });

      } else {
       fs.readFile('./pato.webp', (err, data) => {
        if (err) throw err;
        let str = data.toString('base64')
        data = Buffer.from(str, 'base64');
        msg.createSticker(data, true);
        conn.sendMessage(id, msg);
       });
      }
    break
			
		case 'tiradm':
			if (
				message.number === '554891428604' &&
				message.mentioned.length > 0 &&
				message.isGroup
			) {
				const userId = message.mentioned[0];
				msg.createText(
					`ok @${
						userId.split('@')[0]
					} esse cara não é  mais admistrador do grupo `
				);
				msg.addMentioned([userId]);
				conn.sendMessage(id, msg);
				conn.groupDemoteAdmin(id, [userId]);
			}
			break;
		case 'remover':
			if (
				message.number === '554891428604' &&
				message.mentioned.length > 0 &&
				message.isGroup
			) {
				const userId = message.mentioned[0];
				msg.createText(`tchau @${userId.split('@')[0]} voce foi banido do grupo!`
				)
				msg.addMentioned([userId])
				conn.sendMessage(id, msg);
				conn.groupRemove(id, [userId]);
			}
			break;
		case 'promover':
			if (
				message.number === '554891428604' &&
				message.mentioned.length != 0 &&
				message.isGroup
			) {
				const userId = message.mentioned[0];
				msg.createText(
					`ok @${userId.split('@')[0]} esse cara é admistrador do grupo`
				);
				msg.addMentioned([userId]);
				conn.sendMessage(id, msg);
				conn.groupMakeAdmin(id, [userId]);
			}
			break;
      case 'adicionar':
    if(message.number === '554891428604' && message.isGroup) {
    const user = message.text.toLowerCase().replace('add', '').trim() + '@s.whatsapp.net';
    //console.log(user)
    conn.groupAdd (id, [user]);
    }
    break;
	}
   
	if (message.text.toLowerCase() == 'dono') {
		msg.createButtons('Meu criador é ', 'Rique Dev');
		msg.addButton('wa.me//554891428604', 1);
		conn.sendMessage(id, msg);
	}
	if (message.text == 'help') {
		msg.createList('ESSA UMA PEQUENA INFORMAÇÕES DO BOT', 'HELP BOT');

		msg.addCategory('CATEGORIA DO BOT', 1);

		msg.addItem(1, 'bom', 'para o bot dar bom dia para um membro do grupo ');

		msg.addItem(1, 'dono', 'digita dono para falar com dono do bot ');

		msg.addCategory('informações', 2);

		msg.addItem(2, 'EXEMPLO', ' digitar -menu para informações ');

		msg.addItem(
			2,
			'para saber mais informações digita -menu dai vai ver todos  meus comandos '
		);
		conn.sendMessage(message.sent, msg);
	}
  if (message.text == 'adm') {
		msg.createList('INFORMAÇÕES DO ADMISTRADORES', 'BOT O LENDADARIO');

		msg.addCategory('informações do admistrador', 1);

		msg.addItem(1, 'tiradm', 'tirar adm do usuario do grupo');

		msg.addItem(1, 'remover', 'remover um usuario do grupo');
    
   conn.sendMessage(message.sent, msg);
  

}
});
