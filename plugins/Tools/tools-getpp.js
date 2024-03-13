const handler = async (m, { text, conn }) => {
    try {
        const whoSet = new Set([
            ...(await conn.parseMention(text)),
            m.mentionedJid?.[0],
            m.quoted?.sender || m.quoted?.key?.remoteJid || m.quoted?.vM?.key?.remoteJid || m.sender || m.chat || m.key.remoteJid
        ].filter(Boolean));

        for (const who of whoSet) {
            const response = await conn.profilePictureUrl(who, 'image');
            await conn.sendFile(m.chat, response, 'profile.jpg', `Profile: @${who.split('@')[0]}`, m, null, {
                mentions: [who]
            });
        }

        whoSet.clear();
    } catch (error) {
        console.error(error);
    }
};

handler.command = /^(get(pp|profile))$/i;
handler.help = ['getprofile [@users]'];
handler.tags = ['tools'];
handler.group = true;

export default handler;
