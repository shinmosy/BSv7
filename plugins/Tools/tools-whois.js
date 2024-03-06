const { v4: isIPv4, v6: isIPv6 } = await(await import('ip-regex')).default;
import fetch from 'node-fetch';

const handler = async (m, {
    text
}) => {
    if (!text) return m.reply('Input IP address format.');
    let IP = text;
    if (!isValidIP(IP)) return m.reply('Invalid IP address format.');
    let ipUrls = [
        `http://ip-api.com/json/${IP}?lang=id-ID`,
        `http://ipwho.is/${IP}?lang=id-ID`,
        `https://api.ipdata.co/${IP}?api-key=c6d4d04d5f11f2cd0839ee03c47c58621d74e361c945b5c1b4f668f3`,
        `https://ipinfo.io/${IP}/json?token=41c48b54f6d78f`,
        `https://api.ipgeolocation.io/ipgeo?apiKey=105fc2c7e8864ec08b98e1ad4e8cbc6d&ip=${IP}`,
        `https://ipapi.co/${IP}/json`,
        `https://sp1.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query=${IP}&resource_id=5809`
    ];
    const result = await getData(ipUrls);
    m.reply(JSON.stringify(result, null, 4));
};

handler.help = ['whois'];
handler.tags = ['tools'];
handler.command = /^(whois)$/i;
export default handler;

const isValidIP = (ip) => {
    return isIPv4(ip) || isIPv6(ip);
};

const Lanang = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok.');
        return await response.json();
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error.message);
        return null;
    }
};

const getData = async (urls) => {
    try {
        const promises = urls.map(url => Lanang(url));
        const results = await Promise.allSettled(promises);
        const data = results.filter(result => result.status === "fulfilled").map(result => result.value);
        const combinedData = data.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        return combinedData;
    } catch (error) {
        console.error('There was a problem combining data:', error.message);
        return null;
    }
};