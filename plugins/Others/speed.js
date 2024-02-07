import {
    cpus as _cpus,
    totalmem,
    freemem
} from 'os'
import util from 'util'
import os from 'os'
import osu from 'node-os-utils'
import fetch from 'node-fetch'
import {
    performance
} from 'perf_hooks'
import {
    sizeFormatter
} from 'human-readable'
const format = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    standard: 'KMGTPEZY'
});

const handler = async (m, {
    conn,
    isRowner
}) => {
    try {
        let _muptime
        if (process.send) {
            process.send('uptime')
            _muptime = await new Promise(resolve => {
                process.once('message', resolve)
                setTimeout(resolve, 1000)
            }) * 1000
        }
        let muptime = clockString(_muptime)
        const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
        const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'))
        const used = process.memoryUsage()
        const cpus = _cpus().map(cpu => {
            cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
            return cpu
        })
        const cpu = cpus.reduce((last, cpu, _, {
            length
        }) => {
            last.total += cpu.total
            last.speed += cpu.speed / length
            last.times.user += cpu.times.user
            last.times.nice += cpu.times.nice
            last.times.sys += cpu.times.sys
            last.times.idle += cpu.times.idle
            last.times.irq += cpu.times.irq
            return last
        }, {
            speed: 0,
            total: 0,
            times: {
                user: 0,
                nice: 0,
                sys: 0,
                idle: 0,
                irq: 0
            }
        })
        let NotDetect = 'ɴᴏᴛ ᴅᴇᴛᴇᴄᴛ'
        let cpux = osu.cpu
        let cpuCore = cpux.count()
        let drive = osu.drive
        let mem = osu.mem
        let netstat = osu.netstat
        let HostN = osu.os.hostname()
        let OS = osu.os.platform()
        let ipx = osu.os.ip()
        let cpuModel = cpux.model()
        let cpuPer
        let p1 = cpux.usage().then(cpuPercentage => {
            cpuPer = cpuPercentage
        }).catch(() => {
            cpuPer = NotDetect
        })
        let driveTotal, driveUsed, drivePer
        let p2 = drive.info().then(info => {
            driveTotal = (info.totalGb + ' GB'),
                driveUsed = info.usedGb,
                drivePer = (info.usedPercentage + '%')
        }).catch(() => {
            driveTotal = NotDetect,
                driveUsed = NotDetect,
                drivePer = NotDetect
        })
        let ramTotal, ramUsed
        let p3 = mem.info().then(info => {
            ramTotal = info.totalMemMb,
                ramUsed = info.usedMemMb
        }).catch(() => {
            ramTotal = NotDetect,
                ramUsed = NotDetect
        })
        let netsIn, netsOut
        let p4 = netstat.inOut().then(info => {
            netsIn = (info.total.inputMb + ' MB'),
                netsOut = (info.total.outputMb + ' MB')
        }).catch(() => {
            netsIn = NotDetect,
                netsOut = NotDetect
        })
        await Promise.all([p1, p2, p3, p4])
        let _ramTotal = (ramTotal + ' MB')
        let cek = await (await fetch("https://api.myip.com")).json().catch(_ => 'error')

        let ip = (cek == 'error' ? NotDetect : cek.ip)
        let cr = (cek == 'error' ? NotDetect : cek.country)
        let cc = (cek == 'error' ? NotDetect : cek.cc)

        let d = new Date(new Date + 3600000)
        let locale = 'id'
        let weeks = d.toLocaleDateString(locale, {
            weekday: 'long'
        })
        let dates = d.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
        let times = d.toLocaleTimeString(locale, {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        })

        let old = performance.now()
        let neww = performance.now()
        let speed = neww - old
        let str = `- *ᴘ ɪ ɴ ɢ* -
${Math.round(neww - old)}ms
${speed}ms

- *ʀ ᴜ ɴ ᴛ ɪ ᴍ ᴇ* -
${muptime}
${readMore}
- *ᴄ ʜ ᴀ ᴛ s* -
• *${groupsIn.length}* Group Chats
• *${groupsIn.length}* Groups Joined
• *${groupsIn.length - groupsIn.length}* Groups Left
• *${chats.length - groupsIn.length}* Personal Chats
• *${chats.length}* Total Chats

- *s ᴇ ʀ ᴠ ᴇ ʀ* -
*🛑 Rᴀᴍ:* ${ramUsed} / ${_ramTotal}(${/[0-9.+/]/g.test(ramUsed) &&  /[0-9.+/]/g.test(ramTotal) ? Math.round(100 * (ramUsed / ramTotal)) + '%' : NotDetect})
*🔵 FʀᴇᴇRᴀᴍ:* ${format(freemem())}

*🔭 ᴘʟᴀᴛғᴏʀᴍ:* ${os.platform()}
*🧿 sᴇʀᴠᴇʀ:* ${os.hostname()}
*💻 ᴏs:* ${OS}
*📍 ɪᴘ:* ${ip}
*🌎 ᴄᴏᴜɴᴛʀʏ:* ${cr}
*💬 ᴄᴏᴜɴᴛʀʏ ᴄᴏᴅᴇ:* ${cc}
*📡 ᴄᴘᴜ ᴍᴏᴅᴇʟ:* ${cpuModel}
*🔮 ᴄᴘᴜ ᴄᴏʀᴇ:* ${cpuCore} Core
*🎛️ ᴄᴘᴜ:* ${cpuPer}%
*⏰ ᴛɪᴍᴇ sᴇʀᴠᴇʀ:* ${times}

- *ᴏ ᴛ ʜ ᴇ ʀ* -
*📅 Wᴇᴇᴋꜱ:* ${weeks}
*📆 Dᴀᴛᴇꜱ:* ${dates}
*🔁 NᴇᴛꜱIɴ:* ${netsIn}
*🔁 NᴇᴛꜱOᴜᴛ:* ${netsOut}
*💿 DʀɪᴠᴇTᴏᴛᴀʟ:* ${driveTotal}
*💿 DʀɪᴠᴇUꜱᴇᴅ:* ${driveUsed}
*⚙️ DʀɪᴠᴇPᴇʀ:* ${drivePer}

${readMore}
*${htjava} ɴᴏᴅᴇJS ᴍᴇᴍᴏʀʏ ᴜsᴀɢᴇ*
${'```' + Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${format(used[key])}`).join('\n') + '```'
}
`
const thumbnail = await conn.getFile("https://cdn-icons-png.flaticon.com/128/9320/9320767.png");
        await conn.sendMessage(m.chat, {
            text: str,
            contextInfo: {
                externalAdReply: {
                    title: "🤖 Bot Speed",
                    thumbnail: thumbnail.data,
                },
                mentionedJid: [m.sender],
            },
        }, { quoted: m });
    } catch (error) {
        console.error(error);
    }
};

handler.help = ['ping', 'speed'];
handler.tags = ['info', 'tools'];
handler.command = /^(ping|speed|info)$/i;

export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
    try {
        let [d, h, m, s] = isNaN(ms) ? ['--', '--', '--', '--'] : [Math.floor(ms / 86400000), Math.floor(ms / 3600000) % 24, Math.floor(ms / 60000) % 60, Math.floor(ms / 1000) % 60];
        return `☀️ *${d}* Days\n🕐 *${h}* Hours\n⏰ *${m}* Minutes\n⏱️ *${s}* Seconds`;
    } catch (error) {
        console.error(error);
        return 'Error in clockString function';
    }
}