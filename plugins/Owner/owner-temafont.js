import {
    FontList,
    FontListV2
} from "../../lib/fancy-text.js";

let handler = async (m, {
    conn,
    command,
    text
}) => {
    conn.temafont = conn.temafont || null;
    if (text) {
        let themeIndex = parseInt(text);
        if (isNaN(themeIndex)) {
            let Lfont = await FontList("Example").catch(error => FontListV2().then(() => console.error(error)));
            await conn.reply(m.chat, 'Input tidak valid. Silakan pilih tema dari daftar berikut:\n' + Lfont.map((v, i) => `*${i + 1}.* ${v.text} - ${v.name}`).join('\n'), m);
            return;
        }
        conn.temafont = (themeIndex == 0) ? null : themeIndex;
        conn.reply(m.chat, 'Tema berhasil diatur\n' + themeIndex, m);
    } else {
        let Lfont = await FontList("Example").catch(error => FontListV2().then(() => console.error(error)));
        await conn.reply(m.chat, 'Input tidak valid. Silakan pilih tema dari daftar berikut:\n' + Lfont.map((v, i) => `*${i + 1}.* ${v.text} - ${v.name}`).join('\n'), m);
        return;
    }
};
handler.help = ['temafont']
handler.tags = ['owner']
handler.command = /^(temafont)$/i
handler.owner = true

export default handler;