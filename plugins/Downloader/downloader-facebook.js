import fetch from "node-fetch"
import {
    facebook
} from "@xct007/frieren-scraper"
import {
    facebookdl
} from '@bochilteam/scraper';
import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
    let imgr = flaaa.getRandom()

    let ends = [
        "v1",
        "v2",
        "v3"
    ]

    let [links, version, quality] = text.split(" ")
    const msgg = `Input query!\n*Example:*\n*- ${usedPrefix + command}* link v1 sd/hd\n*- ${usedPrefix + command}* link v2 sd/hd\n*- ${usedPrefix + command}* link v3 sd/hd`
    if (!(links && version && quality)) return conn.reply(m.chat, msgg, m)

    if (ends.includes(version)) {
        if (version.toLowerCase() === "v1") {
            try {
                let results = await facebook.v1(links)
                if (!(quality)) return conn.reply(m.chat, msgg, m)
                let caption = `*[ F A C E B O O K ]*

*Title:* ${results.title}
*HD:* ${results.isHdAvailable}
	`
                let out
                if (quality == "hd") {
                    out = results.urls[0].hd ? results.urls[0].hd : (results.urls[1].sd ? results.urls[1].sd : giflogo)
                }
                if (quality == "sd") {
                    out = results.urls[1].sd ? results.urls[1].sd : (results.urls[0].hd ? results.urls[0].hd : giflogo)
                }
                await m.reply(wait)
                await conn.sendFile(m.chat, out, "", caption, m)
            } catch (e) {
                await m.reply(eror)
            }
        }
        if (version.toLowerCase() === "v2") {
            try {
                let results = await FbDownload(links)
                if (!(quality)) return conn.reply(m.chat, msgg, m)
                let caption = `*[ F A C E B O O K ]*

*Title:* ${results.title}`

                let out
                if (quality == "hd") {
                    out = results.links['Download High Quality'] ? results.links['Download High Quality'] : (results.links['Download Low Quality'] ? results.links['Download Low Quality'] : giflogo)
                }
                if (quality == "sd") {
                    out = results.links['Download Low Quality'] ? results.links['Download Low Quality'] : (results.links['Download High Quality'] ? results.links['Download High Quality'] : giflogo)
                }

                await m.reply(wait)
                await conn.sendFile(m.chat, out, "", caption, m)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (version.toLowerCase() === "v3") {
            try {
                if (!(quality)) return conn.reply(m.chat, msgg, m)
                const {
                    result
                } = await facebookdl(links);
                const results = result;
                let caption = `*[ F A C E B O O K ]*

*Title:* ${results.title}`

                let out
                if (quality.toLowerCase() === "hd") {
                    out = results.find(video => video.quality === "hd") ? results.find(video => video.quality === "hd") : (results.find(video => video.quality === "sd") ? results.find(video => video.quality === "sd") : giflogo)
                }
                if (quality.toLowerCase() == "sd") {
                    out = results.find(video => video.quality === "sd") ? results.find(video => video.quality === "sd") : (results.find(video => video.quality === "hd") ? results.find(video => video.quality === "hd") : giflogo)
                }

                await m.reply(wait)
                await conn.sendFile(m.chat, out, "", caption, m)
            } catch (e) {
                await m.reply(eror)
            }
        }

    }
}
handler.help = ["facebook"]
handler.tags = ["downloader"]
handler.alias = ["fb", "fbdl", "facebook", "facebookdl"]
handler.command = /^((facebook|fb)(dl)?)$/i
export default handler

async function FbDownload(vid_url) {
    try {
        const data = {
            url: vid_url
        };
        const searchParams = new URLSearchParams();
        searchParams.append('url', data.url);
        const response = await fetch('https://facebook-video-downloader.fly.dev/app/main.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: searchParams.toString(),
        });
        const responseData = await response.json();
        return responseData;
    } catch (e) {
        return null;
    }
}

const baseURL = "https://fdownloader.net/id";
const apiURL = "https://v3.fdownloader.net/api/ajaxSearch?lang=en";

const facebookVideo = async (url) => {
  try {
    const { data } = await axios.post(baseURL, new URLSearchParams({
      recaptchaToken: "",
      q: url,
      t: "media",
      lang: "en",
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0",
      },
    });
    const $ = cheerio.load(data);
    const script = $("body").find("script").text().trim();
    const k_token = script.split("k_token = ")[1].split(";")[0];
    const k_exp = script.split("k_exp = ")[1].split(";")[0];
    const { data: responseData } = await axios.post(apiURL, new URLSearchParams({
      k_exp,
      k_token,
      q: url,
      lang: "en",
      web: "fdownloader.net",
      v: "v2",
      w: "",
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0",
      },
    });
    const $2 = cheerio.load(responseData.data);
    const result = [];
    const duration = $("div.clearfix > p").text().trim();
    $("div.tab__content tbody > tr").each((index, element) => {
      const quality = $(element).find("td.video-quality").text();
      const videoUrl = $(element).find("td > a").attr("href");
      quality && videoUrl && result.push({ quality, url: videoUrl });
    });
    return { duration, result };
  } catch (error) {
    console.log(error);
    return null;
  }
};

