let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    try {
        let user = global.db.data.users[m.sender]
        user.afk = +new Date();
        user.afkReason = text;

        const caption = `\n🚀 ${await conn.getName(m.sender)} @${m.sender.split("@")[0]} Sekarang lagi AFK\n*Dengan Alasan:*\n${text ? ' ' + text : 'Tanpa alasan'}`;

        await conn.reply(m.chat, caption, null, {
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: "AFK Start",
                    thumbnail: await (await conn.getFile("https://cdn-icons-png.flaticon.com/128/742/742927.png")).data
                },
            },
        });
    } catch (error) {
        console.error(error);
    }
}

handler.help = ['afk [alasan]']
handler.tags = ['main']
handler.group = true
handler.command = /^afk$/i

export default handler
