const handler = async (m, { usedPrefix, command }) => {
    try {
        const who = m.quoted?.sender || m.quoted?.key?.remoteJid || m.quoted?.vM?.key?.remoteJid || m.mentionedJid?.[0] || m.sender || m.key.remoteJid || m.chat;
        const url = await conn.profilePictureUrl(who, 'image');
        await conn.sendFile(m.chat, url, 'profile.jpg', `@${who.split('@')[0]}`, m, null, {
            mentions: [who]
        });
    } catch (e) {
        console.error(e);
    }
};

handler.command = /^(get(pp|profile))$/i;
handler.help = ['getprofile [@users]'];
handler.tags = ['tools'];
handler.group = true;

export default handler;
