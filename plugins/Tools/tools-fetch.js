import { fetch as fetchUndici } from 'undici';
import got from 'got';
import fetch from 'node-fetch';
import axios from 'axios';
import { format } from 'util';
import userAgent from 'fake-useragent';
import { sizeFormatter } from 'human-readable';
import { URL } from 'url';

const resultsMap = new Map();
let successCounter = 0;
let errorCounter = 0;

const clearCounters = () => (successCounter = 0) | (errorCounter = 0);
const clearResultsMap = () => resultsMap.clear();

const formatSize = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  standard: 'KMGTPEZY'
});

const MAX_CONTENT_SIZE = 1 * 1024 * 1024 * 1024;
const MAX_LINKS = 10;

const isTextContent = (contentType) =>
  /^(text\/(plain|html|xml)|application\/(json|.*\+xml)|.*\/(javascript|xml|x-www-form-urlencoded))/.test(
    contentType
  );

const handler = async (m, { conn, args }) => {
  clearCounters();
  clearResultsMap();

  const inputText = args?.length >= 1 ? args.join(' ') : m.quoted?.text || '';
  const totalLinks = inputText.match(/(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*|[\d.]+(?:\/\S*)?/g).slice(0, MAX_LINKS);

  if (!totalLinks.length) return m.reply('Tidak ada link atau alamat IP yang ditemukan.');

  const sendCompletionMessage = () => {
    console.log('Results Map:', resultsMap);

    const completionMessage =
      successCounter === totalLinks.length
        ? `Fetching completed. Successfully fetched *${successCounter}* out of *${totalLinks.length}* links.`
        : `Fetching completed. Successfully fetched *${successCounter}* out of *${totalLinks.length}* links. Failed to fetch *${errorCounter}* link(s).`;

    m.reply(completionMessage);
  };

  for (const url of totalLinks) {
    let link, origin, response, contentType, contentLength, txt;

    try {
      ({ href: link, origin } = new URL(url));
      response = await fetchUndici(link, { redirect: 'follow', headers: { Referer: origin, 'User-Agent': userAgent() } });
      contentType = response.headers.get('content-type');
      contentLength = response.headers.get('content-length');
      txt = await response.text();
    } catch (undiciError) {
      try {
        response = await got(url, { followRedirect: true, maxRedirects: 5, headers: { 'User-Agent': userAgent() } });
        contentType = response.headers['content-type'];
        contentLength = response.headers['content-length'];
        txt = response.body;
      } catch (gotError) {
        try {
          response = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': userAgent() } });
          contentType = response.headers.get('content-type');
          contentLength = response.headers.get('content-length');
          txt = await response.text();
        } catch (fetchError) {
          try {
            response = await axios.get(url, { maxRedirects: 5, validateStatus: null, headers: { 'User-Agent': userAgent() } });
            contentType = response.headers['content-type'];
            contentLength = response.headers['content-length'];
            txt = response.data;
          } catch (axiosError) {
            errorCounter++;
            console.log(`Error fetching link: ${url}`);
            continue;
          }
        }
      }
    }

    if (!txt || !txt.trim()) {
      console.log(`Empty result for link: ${url}`);
      return m.reply(`Empty result for link: ${url}`);
    }

    resultsMap.set(url, { contentType, contentLength, txt });

    const maxContentLength = Math.max(contentLength ?? (txt && txt.length) ?? 0);

    if (maxContentLength > MAX_CONTENT_SIZE) {
      console.log(`File too large for link: ${url}`);
      return m.reply(`File terlalu besar. Ukuran maksimum adalah ${formatSize(MAX_CONTENT_SIZE)}`);
    }

    successCounter++;
  }

  let resultMapSize = resultsMap.size;
  for (const [url, { contentType, contentLength, txt }] of resultsMap) {
    let finalContentLength = contentLength ?? (txt.length !== null && txt.length !== undefined ? txt.length : 0);
    let finalContentType = contentType ?? null;

    if (isTextContent(contentType)) {
      let parsedTxt;
      try {
        parsedTxt = format(JSON.parse(txt + ''));
      } catch (jsonError) {
        parsedTxt = txt + '';
      } finally {
        setTimeout(() => {
          m.reply(parsedTxt.slice(0, 65536) + '');

          if (--resultMapSize === 0) {
            sendCompletionMessage();
          }
        }, 3000);
      }
    } else {
      const caption = `🔢 *Count:* ${successCounter}/${totalLinks.length}\n📄 *Type:* ${contentType}\n📊 *Size:* ${formatSize(finalContentLength)}`;
      setTimeout(async () => {
        await conn.sendFile(m.chat, url, finalContentType || 'Tidak diketahui', caption, m);

        if (--resultMapSize === 0) {
          sendCompletionMessage();
        }
      }, 3000);
    }
  }

  clearCounters();
  clearResultsMap();
};

handler.help = ['get', 'fetch'];
handler.tags = ['tools'];
handler.alias = ['get', 'fetch'];
handler.command = ['get', 'fetch'];

export default handler;
