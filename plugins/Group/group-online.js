let handler = async (m, { conn }) => {
  try {
    const c = conn.chats[m.chat];
    if (!c || !c.metadata || !c.metadata.participants) return m.reply('Gagal mendapatkan informasi grup.');
    const others = [conn.user.jid, ...conn.user.listbot.map(v => v.number)];
    const online = Object.entries(conn.chats).filter(([k, v]) => k.endsWith('@s.whatsapp.net') && v.presences && (c.metadata.participants.some(p => k.startsWith(p.id)) || others.includes(k))).sort((a, b) => a[0].localeCompare(b[0], 'id', { sensitivity: 'base' })).map(([k], i) => `*${i + 1}.* @${k.split('@')[0]}`).join('\n');
    await m.reply(`*🌐 List Pengguna Online:*\n${online || 'Tidak ada pengguna online saat ini.'}`);
  } catch (e) {
    console.error(e);
    m.reply('Terjadi kesalahan.');
  }
};
handler.help = ['here', 'online'];
handler.tags = ['group'];
handler.command = /^(here|(list)?online)$/i;
handler.group = true;

export default handler;