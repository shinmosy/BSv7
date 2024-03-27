import axios from "axios"
import fetch from "node-fetch"
import cheerio from "cheerio"
import got from "got"
import {
    fetchVideo
} from "@prevter/tiktok-scraper"
import {
    Tiktok
} from "@xct007/tiktok-scraper"
import ora from 'ora';
import chalk from 'chalk';
import {
    TiktokJs
} from "../../lib/download/tiktok-js.js";
const tikTokDownloader = new TiktokJs();

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {

    let lister = Array.from({
        length: 15
    }, (_, index) => `v${index + 1}`);
    let spas = "                "
    let [inputs, feature, inputs_, inputs__, inputs___] = text.split(" ")
    feature = feature || lister.getRandom()
    let exam = "*Example:*\n" + usedPrefix + command + " link version\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v.toUpperCase()).join("\n")
    if (!lister.includes(feature.toLowerCase())) return m.reply(exam)

    if (lister.includes(feature)) {

        if (feature == "v1") {
            if (!inputs) return m.reply(`*Input tiktok link*\n\n${exam}`)
            m.reply(wait)
            try {
                const video = await tikTokDownloader.aweme(inputs);
                const caption = `${spas}*[ T I K T O K ]*\n` +
                    `🔗 ID: ${video.video_id || ''}\n` +
                    `👤 Author: ${video.author.name || ''}\n` +
                    `❤️ Views: ${video.stats.total_views || ''}\n` +
                    `💬 Comments: ${video.stats.total_comment || ''}\n` +
                    `🔁 Shares: ${video.stats.total_share || ''}\n` +
                    `▶️ Download: ${video.stats.total_download || ''}\n` +
                    `🎵 Music: ${video.music.title} - ${video.music.author || ''}\n` +
                    `🖼️ Thumbnail URL: ${video.thumbnail || ''}\n` +
                    `${spas}*[ aweme ]*`;

                await conn.sendFile(m.chat, video.videos[0] || video.videos[1] || video.videos[2] || giflogo, "", caption, m);
            } catch (e) {
                throw eror
            }
        }
        if (feature == "v2") {
            if (!inputs) return m.reply(`*Input tiktok link*\n\n${exam}`)
            m.reply(wait)
            try {
                const video = await tikTokDownloader.musicaldown(inputs);
                const caption = `${spas}*[ T I K T O K ]*\n` +
                    `🔗 ID: ${video.video_id || ''}\n` +
                    `👤 Author: ${video.author.name || ''}\n` +
                    `🎵 Music: ${video.music.title || ''}\n` +
                    `🖼️ Thumbnail URL: ${video.thumbnail || ''}\n` +
                    `${spas}*[ musicaldown ]*`;

                await conn.sendFile(m.chat, video.videos[0] || video.videos[1] || video.videos[2] || giflogo, "", caption, m);
            } catch (e) {
                throw eror
            }
        }
        if (feature == "v3") {
            if (!inputs) return m.reply(`*Input tiktok link*\n\n${exam}`)
            m.reply(wait)
            try {
                const video = await tikTokDownloader.savetik(inputs);
                const caption = `${spas}*[ T I K T O K ]*\n` +
                    `🔗 ID: ${video.video_id || ''}\n` +
                    `👤 Author: ${video.author.name || ''}\n` +
                    `🎵 Music: ${video.music.title || ''}\n` +
                    `🖼️ Thumbnail URL: ${video.thumbnail || ''}\n` +
                    `${spas}*[ savetik ]*`;

                await conn.sendFile(m.chat, video.videos[0] || video.videos[1] || video.videos[2] || giflogo, "", caption, m);
            } catch (e) {
                throw eror
            }
        }
        if (feature == "v4") {
            if (!inputs) return m.reply(`*Input tiktok link*\n\n${exam}`)
            m.reply(wait)
            try {
                const video = await tikTokDownloader.snaptik(inputs);
                const caption = `${spas}*[ T I K T O K ]*\n` +
                    `🔗 ID: ${video.video_id || ''}\n` +
                    `👤 Author: ${video.author.name || ''}\n` +
                    `❤️ Views: ${video.total_views || ''}\n` +
                    `💬 Comments: ${video.total_comment || ''}\n` +
                    `🎵 Music: ${video.music.title} - ${video.music.author || ''}\n` +
                    `🖼️ Thumbnail URL: ${video.thumbnail || ''}\n` +
                    `${spas}*[ snaptik ]*`;

                await conn.sendFile(m.chat, video.videos[0] || video.videos[1] || video.videos[2] || giflogo, "", caption, m);
            } catch (e) {
                throw eror
            }
        }
        if (feature == "v5") {
            if (!inputs) return m.reply(`*Input tiktok link*\n\n${exam}`)
            m.reply(wait)
            try {
                const video = await tikTokDownloader.snaptikpro(inputs);
                const caption = `${spas}*[ T I K T O K ]*\n` +
                    `🔗 ID: ${video.video_id || ''}\n` +
                    `👤 Author: ${video.author.name || ''}\n` +
                    `❤️ Views: ${video.total_views || ''}\n` +
                    `💬 Comments: ${video.total_comment || ''}\n` +
                    `🎵 Music: ${video.music.title} - ${video.music.author || ''}\n` +
                    `🖼️ Thumbnail URL: ${video.thumbnail || ''}\n` +
                    `${spas}*[ snaptikpro ]*`;

                await conn.sendFile(m.chat, video.videos || video.videos[0] || video.videos[1] || giflogo, "", caption, m);
            } catch (e) {
                throw eror
            }
        }
        if (feature == "v6") {
            if (!inputs) return m.reply(`*Input tiktok link*\n\n${exam}`)
            m.reply(wait)
            try {
                const video = await tikTokDownloader.ssstik(inputs);
                const caption = `${spas}*[ T I K T O K ]*\n` +
                    `🔗 ID: ${video.video_id || ''}\n` +
                    `👤 Author: ${video.author.name || ''}\n` +
                    `❤️ Views: ${video.total_views || ''}\n` +
                    `💬 Comments: ${video.total_comment || ''}\n` +
                    `🎵 Music: ${video.music.title} - ${video.music.author || ''}\n` +
                    `🖼️ Thumbnail URL: ${video.thumbnail || ''}\n` +
                    `${spas}*[ ssstik ]*`;

                await conn.sendFile(m.chat, video.videos || video.videos[0] || video.videos[1] || giflogo, "", caption, m);
            } catch (e) {
                throw eror
            }
        }
        if (feature == "v7") {
            if (!inputs) return m.reply(`*Input tiktok link*\n\n${exam}`)
            m.reply(wait)
            try {
                const video = await tikTokDownloader.tikcdn(inputs);
                const caption = `${spas}*[ T I K T O K ]*\n` +
                    `🔗 ID: ${video.video_id || ''}\n` +
                    `👤 Author: ${video.author.name || ''}\n` +
                    `❤️ Views: ${video.stats.total_views || ''}\n` +
                    `💬 Comments: ${video.stats.total_comment || ''}\n` +
                    `🔁 Shares: ${video.stats.total_share || ''}\n` +
                    `▶️ Download: ${video.stats.total_download || ''}\n` +
                    `🎵 Music: ${video.music.title} - ${video.music.author || ''}\n` +
                    `🖼️ Thumbnail URL: ${video.thumbnail || ''}\n` +
                    `${spas}*[ tikcdn ]*`;

                await conn.sendFile(m.chat, video.videos[0] || video.videos[1] || giflogo, "", caption, m);
            } catch (e) {
                throw eror
            }
        }
        if (feature == "v8") {
            if (!inputs) return m.reply(`*Input tiktok link*\n\n${exam}`)
            m.reply(wait)
            try {
                const video = await tikTokDownloader.tikmate(inputs);
                const caption = `${spas}*[ T I K T O K ]*\n` +
                    `🔗 ID: ${video.video_id || ''}\n` +
                    `👤 Author: ${video.author.name || ''}\n` +
                    `❤️ Views: ${video.total_views || ''}\n` +
                    `💬 Comments: ${video.total_comment || ''}\n` +
                    `🎵 Music: ${video.music.title} - ${video.music.author || ''}\n` +
                    `🖼️ Thumbnail URL: ${video.thumbnail || ''}\n` +
                    `${spas}*[ tikmate ]*`;

                await conn.sendFile(m.chat, video.videos || video.videos[0] || giflogo, "", caption, m);
            } catch (e) {
                throw eror
            }
        }
        if (feature == "v9") {
            if (!inputs) return m.reply(`*Input tiktok link*\n\n${exam}`)
            m.reply(wait)
            try {
                const video = await tikTokDownloader.tiktokdownloadr(inputs);
                const caption = `${spas}*[ T I K T O K ]*\n` +
                    `🔗 ID: ${video.video_id || ''}\n` +
                    `👤 Author: ${video.author.name || ''}\n` +
                    `❤️ Views: ${video.total_views || ''}\n` +
                    `💬 Comments: ${video.total_comment || ''}\n` +
                    `🎵 Music: ${video.music.title} - ${video.music.author || ''}\n` +
                    `🖼️ Thumbnail URL: ${video.thumbnail || ''}\n` +
                    `${spas}*[ tiktokdownloadr ]*`;

                await conn.sendFile(m.chat, video.videos[0] || video.videos[1] || video.videos[2] || giflogo, "", caption, m);
            } catch (e) {
                throw eror
            }
        }
        if (feature == "v10") {
            if (!inputs) return m.reply(`*Input tiktok link*\n\n${exam}`)
            m.reply(wait)
            try {
                const video = await tikTokDownloader.tikwm(inputs);
                const caption = `${spas}*[ T I K T O K ]*\n` +
                    `🔗 ID: ${video.video_id || ''}\n` +
                    `👤 Author: ${video.author.name || ''}\n` +
                    `❤️ Views: ${video.stats.total_views || ''}\n` +
                    `💬 Comments: ${video.stats.total_comment || ''}\n` +
                    `🔁 Shares: ${video.stats.total_share || ''}\n` +
                    `▶️ Download: ${video.stats.total_download || ''}\n` +
                    `🎵 Music: ${video.music.title} - ${video.music.author || ''}\n` +
                    `🖼️ Thumbnail URL: ${video.thumbnail || ''}\n` +
                    `${spas}*[ tikwm ]*`;

                await conn.sendFile(m.chat, video.videos || video.videos[0] || giflogo, "", caption, m);
            } catch (e) {
                throw eror
            }
        }
        if (feature == "v11") {
            if (!inputs) return m.reply(`*Input tiktok link*\n\n${exam}`)
            m.reply(wait)
            try {
                const video = await tikTokDownloader.ttdownloader(inputs);
                const caption = `${spas}*[ T I K T O K ]*\n` +
                    `🔗 ID: ${video.video_id || ''}\n` +
                    `👤 Author: ${video.author.name || ''}\n` +
                    `❤️ Views: ${video.total_views || ''}\n` +
                    `💬 Comments: ${video.total_comment || ''}\n` +
                    `🎵 Music: ${video.music.title} - ${video.music.author || ''}\n` +
                    `🖼️ Thumbnail URL: ${video.thumbnail || ''}\n` +
                    `${spas}*[ ttdownloader ]*`;

                await conn.sendFile(m.chat, video.videos || video.videos[0] || giflogo, "", caption, m);
            } catch (e) {
                throw eror
            }
        }

        if (feature == "v12") {
            if (!inputs) return m.reply(`*Input tiktok link*\n\n${exam}`)
            m.reply(wait)
            try {
                let Scrap = await Tiktokdl(inputs)
                let S = Scrap.result
                let ScrapCap = `${spas}*「 T I K T O K 」*

*📛 Author:* ${S.author.nickname}
*📒 Title:* ${S.desc}
\n${spas}*[ ${feature.toUpperCase()} ]*`
                await conn.sendFile(m.chat, S.download.nowm, "", ScrapCap, m)
            } catch (e) {
                throw eror
            }
        }
        if (feature == "v13") {
            if (!inputs) return m.reply(`*Input tiktok link*\n\n${exam}`)
            m.reply(wait)
            try {
                const god = await axios.get("https://godownloader.com/api/tiktok-no-watermark-free?url=" + inputs + "&key=godownloader.com")
                let GoCap = `${spas}*[ T I K T O K ]*

*Desc:* ${god.data.desc}
\n${spas}*[ ${feature.toUpperCase()} ]*`
                await conn.sendFile(m.chat, god.data.video_no_watermark, "", GoCap, m)
            } catch (e) {
                throw eror
            }
        }

        if (feature == "v14") {
            if (!inputs) return m.reply(`*Input tiktok link*\n\n${exam}`)
            m.reply(wait)
            const spinner = ora({
                text: 'Downloading...',
                spinner: 'moon',
            }).start();
            try {
                const video = await fetchVideo(inputs);
                const buffer = await video.download({
                    progress: (p) => {
                        const progressText = chalk.blue(`Downloaded ${p.progress}%`) +
                            ` (${chalk.green(p.downloaded)}/${chalk.green(p.total)} bytes)`;
                        spinner.text = progressText;
                    },
                });

                spinner.succeed(chalk.green('Download completed'));

                let PrevCap = `${spas}*[ T I K T O K ]*

${getVideoInfo(video)}
\n${spas}*[ ${feature.toUpperCase()} ]*`
                await conn.sendFile(m.chat, buffer || giflogo, "", PrevCap, m)
            } catch (e) {
                spinner.fail(chalk.red('Download failed'));
                console.error(e);
            }
        }
        if (feature == "v15") {
            if (!inputs) return m.reply(`*Input tiktok link*\n\n${exam}`)
            m.reply(wait)
            try {
                const videoX = await Tiktok(inputs);

                let XctCap = `${spas}*[ T I K T O K ]*

${getUserProfileInfo(videoX)}
\n${spas}*[ ${feature.toUpperCase()} ]*`
                await conn.sendFile(m.chat, videoX.download.nowm || giflogo, "", XctCap, m)
            } catch (e) {
                throw eror
            }
        }

    }
}
handler.help = ["tiktok"]
handler.tags = ["downloader"]
handler.command = /^t(iktok|t(dl)?)$/i
export default handler

//@xct007/tiktok-scraper
async function Tiktokdl(url) {
    //async function tiktokdl(url) {
    try {
        function API_URL(aweme) {
            return `https://api16-core-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${aweme}&version_name=1.0.4&version_code=104&build_number=1.0.4&manifest_version_code=104&update_version_code=104&openudid=4dsoq34x808ocz3m&uuid=6320652962800978&_rticket=1671193816600&ts=1671193816&device_brand=POCO&device_type=surya&device_platform=android&resolution=1080*2179&dpi=440&os_version=12&os_api=31&carrier_region=US&sys_region=US%C2%AEion=US&app_name=TikMate%20Downloader&app_language=en&language=en&timezone_name=Western%20Indonesia%20Time&timezone_offset=25200&channel=googleplay&ac=wifi&mcc_mnc=&is_my_cn=0&aid=1180&ssmix=a&as=a1qwert123&cp=cbfhckdckkde1`
        }
        async function getAwemeId(url) {
            // any :/
            let result
            const Konto1 = /video\/([\d|\+]+)?\/?/
            const valid = url.match(Konto1)
            if (valid) {
                return valid[1]
            } else {
                try {
                    const data = await got
                        .get(url, {
                            headers: {
                                "Accept-Encoding": "deflate",
                            },
                            maxRedirects: 0,
                        })
                        .catch((e) => e.response.headers.location)
                    const _url = data
                    const _valid = _url.match(Konto1)
                    if (_valid) {
                        result = _valid[1]
                    }
                } catch (e) {
                    // console.log(e)
                    result = false
                }
            }
            return result
        }
        const valid = await getAwemeId(url)
        //if (!valid) return false // result = false
        const data = await got
            .get(API_URL(valid), {
                headers: {
                    "Accept-Encoding": "deflate",
                    "User-Agent": "okhttp/3.14.9",
                },
            })
            .catch((e) => e.response)
        //if (!data) return false // result = false
        const body = JSON.parse(data.body)
        const obj = body.aweme_list.find((o) => o.aweme_id === valid)
        const results = {
            aweme_id: obj.aweme_id,
            region: obj.region,
            desc: obj.desc,
            create_time: obj.create_time,
            author: {
                uid: obj.author.uid,
                unique_id: obj.author.unique_id,
                nickname: obj.author.nickname,
                birthday: obj.author.birthday,
            },
            duration: obj.music.duration,
            download: {
                nowm: obj.video.play_addr.url_list[0],
                wm: obj.video.download_addr.url_list[0],
                music: obj.music.play_url.url_list[0],
                music_info: {
                    id: obj.music.id,
                    title: obj.music.title,
                    author: obj.music.author,
                    is_original: obj.music.is_original,
                    cover_hd: obj.music.cover_hd.url_list[0],
                    cover_large: obj.music.cover_large.url_list[0],
                    cover_medium: obj.music.cover_medium.url_list[0],
                },
            },
        }
        return {
            status: true,
            result: results //data.body //valid
        }
    } catch (e) {
        return {
            status: false,
            result: e
        }
    }
}

function getVideoInfo(video) {
    return `Video description: ${video.description || ''}\n` +
        `🔗 URL: ${video.url || ''}\n` +
        `👤 Author: ${video.author || ''}\n` +
        `❤️ Likes: ${video.likes || ''}\n` +
        `💬 Comments: ${video.comments || ''}\n` +
        `🔁 Shares: ${video.shares || ''}\n` +
        `▶️ Plays: ${video.playCount || ''}\n` +
        `🎵 Music: ${video.music.name} - ${video.music.author || ''}\n` +
        `🖼️ Thumbnail URL: ${video.previewImageUrl}`;
}

function getEmojiCount(count) {
    const emojis = ['👍', '❤️', '🔁', '💬', '🔥'];
    return emojis[Math.floor(Math.random() * emojis.length)] + count.toLocaleString();
}

function getUserProfileInfo(tiktokData) {
    const user = tiktokData.author;
    const stats = tiktokData.statistics;

    return `User Profile:
🆔 Unique ID: ${user.uid}
👤 Nickname: ${user.nickname}
💬 Description: ${tiktokData.desc}
👥 Comments: ${getEmojiCount(stats.comment_count)}
👍 Likes: ${getEmojiCount(stats.digg_count)}
🎵 Music: ${tiktokData.download.music_info.title}`;
}