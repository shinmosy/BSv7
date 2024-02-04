import os from 'os';

const handler = async (m, { conn }) => {
    try {
        const start = Date.now();
        await new Promise(resolve => setTimeout(resolve, 1000));
        const end = Date.now();
        const responseTime = (end - start) / 1000;

        const thumbnail = await conn.getFile("https://cdn-icons-png.flaticon.com/128/3064/3064677.png");

        const format = (value) => (value / (1024 ** Math.floor(Math.log2(value) / 10))).toFixed(2) + ' KMGTPEZY'[Math.floor(Math.log2(value) / 10)];

        const osInfo = `🖥️ *OS*: ${os.type()} ${os.release()}\n💻 *CPU*: ${os.cpus()[0].model}\n🧠 *Memory*: ${format(os.totalmem())}B`;
        const responseMessage = `⏰ *Response Time*: ${responseTime.toFixed(2)}s\n\n${osInfo}`;

        await conn.sendMessage(m.chat, {
            text: responseMessage,
            contextInfo: {
                externalAdReply: {
                    title: "🤖 Bot is active",
                    thumbnail: thumbnail.data,
                },
                mentionedJid: [m.sender],
            },
        }, { quoted: m });

    } catch (error) {
        console.error("Error in handler:", error);
    }
};

handler.customPrefix = /^([Tt]es[st]?)$/i;
handler.command = new RegExp;
export default handler;
