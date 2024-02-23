import moment from "moment-timezone"
import Jimp from 'jimp';
import fetch from 'node-fetch';
import axios from 'axios';
import { fetch as undiciFetch } from 'undici';
import got from 'got';

export async function all(m) {
let Sarapan = "📍 " + Sapa() + ' ' + (m.name || await this.getName(m.sender))+ ' ' + Pagi()

    let resizeThumb = (await resize(pickRandom(["https://minimalistic-wallpaper.demolab.com/?random", "https://picsum.photos/2560/1600", global.imagebot, global.thumbdoc]), 300, 250) || await this.resize(pickRandom(["https://minimalistic-wallpaper.demolab.com/?random", "https://picsum.photos/2560/1600", global.imagebot, global.thumbdoc]), 300, 250))

    global.Thumbnails = resizeThumb
    
global.botdate = `${htjava} Date :  ${moment.tz("Asia/Makassar").format("DD/MM/YY")}`
    global.bottime = `𝗧 𝗜 𝗠 𝗘 : ${moment.tz("Asia/Makassar").format("HH:mm:ss")}`
    global.titlebot = `${htjava} Time Sever : ${moment.tz("Asia/Makassar").format("HH:mm:ss")}\n⫹⫺ Date Server :  ${moment.tz("Asia/Makassar").format("DD/MM/YY")}`

/* Fake adReplyS*/
    global.adReplyS = {
        fileLength: SizeDoc(),
        seconds: SizeDoc(),
        contextInfo: {
            mentionedJid: [m.sender],
            groupMentions: [],
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363144038483540@newsletter',
                newsletterName: author + ' ' + titlebot,
                serverMessageId: -1
            },
            businessMessageForwardInfo: {
                businessOwnerJid: businessOwnerJid()
            },
            forwardingScore: 257,
            externalAdReply: {
                title: Sarapan,
                body: author,
                mediaUrl: '',
                description: "𝑾𝒖𝒅𝒚𝒔𝒐𝒇𝒕",
                thumbnail: Thumbnails,
                sourceUrl: sgc
            }
        }
    }
    /* Fake adReply */
    global.adReply = {
        fileLength: SizeDoc(),
        seconds: SizeDoc(),
        contextInfo: {
            mentionedJid: [m.sender],
            groupMentions: [],
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363144038483540@newsletter',
                newsletterName: author + ' ' + titlebot,
                serverMessageId: -1
            },
            businessMessageForwardInfo: {
                businessOwnerJid: businessOwnerJid()
            },
            forwardingScore: 257,
            externalAdReply: {
                body: author,
                containsAutoReply: true,
                mediaType: 1,
                mediaUrl: '',
                renderLargerThumbnail: true,
                sourceUrl: sgc,
                thumbnail: Thumbnails,
                title: Sarapan
            }
        }
    }
    /* Fake IG */
    global.fakeig = {
        contextInfo: {
            mentionedJid: [m.sender],
            groupMentions: [],
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363144038483540@newsletter',
                newsletterName: author + ' ' + titlebot,
                serverMessageId: -1
            },
            businessMessageForwardInfo: {
                businessOwnerJid: businessOwnerJid()
            },
            forwardingScore: 257,
            externalAdReply: {
                mediaUrl: sig,
                mediaType: 2,
                description: "Follow: " + sig,
                title: Sarapan,
                body: author,
                thumbnail: Thumbnails,
                sourceUrl: sig
            }
        }
    }
    /* Fake FB */
    global.fakefb = {
        contextInfo: {
            mentionedJid: [m.sender],
            groupMentions: [],
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363144038483540@newsletter',
                newsletterName: author + ' ' + titlebot,
                serverMessageId: -1
            },
            businessMessageForwardInfo: {
                businessOwnerJid: businessOwnerJid()
            },
            forwardingScore: 257,
            externalAdReply: {
                mediaUrl: sfb,
                mediaType: 2,
                description: "Follow: " + sig,
                title: Sarapan,
                body: author,
                thumbnail: Thumbnails,
                sourceUrl: sfb
            }
        }
    }
    /* Fake TT */
    global.faketik = {
        contextInfo: {
            mentionedJid: [m.sender],
            groupMentions: [],
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363144038483540@newsletter',
                newsletterName: author + ' ' + titlebot,
                serverMessageId: -1
            },
            businessMessageForwardInfo: {
                businessOwnerJid: businessOwnerJid()
            },
            forwardingScore: 257,
            externalAdReply: {
                mediaUrl: snh,
                mediaType: 2,
                description: "Follow: " + sig,
                title: Sarapan,
                body: author,
                thumbnail: Thumbnails,
                sourceUrl: snh
            }
        }
    }
    /* Fake YT */
    global.fakeyt = {
        contextInfo: {
            mentionedJid: [m.sender],
            groupMentions: [],
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363144038483540@newsletter',
                newsletterName: author + ' ' + titlebot,
                serverMessageId: -1
            },
            businessMessageForwardInfo: {
                businessOwnerJid: businessOwnerJid()
            },
            forwardingScore: 257,
            externalAdReply: {
                mediaUrl: syt,
                mediaType: 2,
                description: "Follow: " + sig,
                title: Sarapan,
                body: author,
                thumbnail: Thumbnails,
                sourceUrl: syt
            }
        }
    }

    let Org = pickRandom(["0", "628561122343", "6288906250517", "6282195322106", "6281119568305", "6281282722861", "6282112790446"])
    let Parti = pickRandom([Org + "@s.whatsapp.net", Org + "@c.us"])
    let Remot = pickRandom(["status@broadcast", "120363047752200594@g.us"])
    
    let fpayment = {
        key: {
            participant: Parti,
            remoteJid: Remot
        },
        message: {
            requestPaymentMessage: {
                currencyCodeIso4217: "USD",
                amount1000: SizeDoc(),
                requestFrom: Parti,
                noteMessage: {
                    extendedTextMessage: {
                        text: Sarapan
                    }
                },
                expiryTimestamp: SizeDoc(),
                amount: {
                    value: SizeDoc(),
                    offset: SizeDoc(),
                    currencyCode: "USD"
                }
            }
        }
    }
    let fpoll = {
        key: {
            participant: Parti,
            remoteJid: Remot
        },
        message: {
            pollCreationMessage: {
                name: Sarapan
            }
        }
    }
    let ftroli = {
        key: {
            participant: Parti,
            remoteJid: Remot
        },
        message: {
            orderMessage: {
                itemCount: SizeDoc(),
                status: 1,
                surface: 1,
                message: bottime,
                orderTitle: Sarapan,
                sellerJid: Parti
            }
        }
    }
    let fkontak = {
        key: {
            participant: Parti,
            remoteJid: Remot
        },
        message: {
            contactMessage: {
                displayName: Sarapan,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${Sarapan},;;;\nFN:${Sarapan},\nitem1.TEL;waid=${nomorown.split("@")[0]}:${nomorown.split("@")[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`,
                jpegThumbnail: Thumbnails,
                thumbnail: Thumbnails,
                sendEphemeral: true
            }
        }
    }
    let fvn = {
        key: {
            participant: Parti,
            remoteJid: Remot
        },
        message: {
            audioMessage: {
                mimetype: "audio/ogg; codecs=opus",
                seconds: SizeDoc(),
                ptt: true
            }
        }
    }
    let fvid = {
        key: {
            participant: Parti,
            remoteJid: Remot
        },
        message: {
            videoMessage: {
                title: Sarapan,
                h: Sarapan,
                seconds: SizeDoc(),
                caption: Sarapan,
                jpegThumbnail: Thumbnails
            }
        }
    }
    let ftextt = {
        key: {
            participant: Parti,
            remoteJid: Remot
        },
        message: {
            extendedTextMessage: {
                text: Sarapan,
                title: bottime,
                jpegThumbnail: Thumbnails
            }
        }
    }
    let fliveLoc = {
        key: {
            participant: Parti,
            remoteJid: Remot
        },
        message: {
            liveLocationMessage: {
                caption: Sarapan,
                h: bottime,
                jpegThumbnail: Thumbnails
            }
        }
    }
    let ftoko = {
        key: {
            participant: Parti,
            remoteJid: Remot
        },
        message: {
            productMessage: {
                product: {
                    productImage: {
                        mimetype: "image/jpeg",
                        jpegThumbnail: Thumbnails
                    },
                    title: Sarapan,
                    description: bottime,
                    currencyCode: "USD",
                    priceAmount1000: SizeDoc(),
                    retailerId: "Ghost",
                    productImageCount: 1
                },
                businessOwnerJid: Parti
            }
        }
    }
    let fdocs = {
        key: {
            participant: Parti,
            remoteJid: Remot
        },
        message: {
            documentMessage: {
                title: Sarapan,
                jpegThumbnail: Thumbnails
            }
        }
    }
    let fgif = {
        key: {
            participant: Parti,
            remoteJid: Remot
        },
        message: {
            videoMessage: {
                title: Sarapan,
                h: Sarapan,
                seconds: SizeDoc(),
                gifPlayback: true,
                caption: bottime,
                jpegThumbnail: Thumbnails
            }
        }
    }
    const Fakes = pickRandom([fdocs, fgif, fkontak, fliveLoc, fpayment, fpoll, ftextt, ftoko, ftroli, fvid, fvn])

    global.fakes = Fakes
}

/* Randomizer */
function pickRandom(list) {
    const shuffledList = list.slice().sort(() => Math.random() - 0.5);
    return shuffledList[Math.floor(Math.random() * shuffledList.length)];
}

/* Apa Kabar */
function Sapa() {
    let Apa = pickRandom(["Apa kabar ", "Halo ", "Hai "])
    return Apa
}

function SizeDoc() {
    return Math.pow(10, 15)
}

function PageDoc() {
    return Math.pow(10, 10)
}
/* Selamat Pagi */
function Pagi() {
    let waktunya = moment.tz("Asia/Makassar").format("HH");
    return waktunya >= 24 ? "Selamat Begadang 🗿" :
        waktunya >= 18 ? "Selamat malam 🌙" :
        waktunya >= 15 ? "Selamat sore 🌅" :
        waktunya > 10 ? "Selamat siang ☀️" :
        waktunya >= 4 ? "Selamat pagi 🌄" :
        "Selamat Pagi 🗿";
}

function businessOwnerJid() {
    let Org = pickRandom([nomorown, "0", "628561122343", "6288906250517", "6282195322106", "6281119568305", "6281282722861", "6282112790446"])
    let Parti = pickRandom([Org + "@s.whatsapp.net"])
    return Parti;
}

async function resize(url, width, height, referer = null) {
        try {
            const arrayBuffer = await getDataBuffer(url, null);
            return await Jimp.read(Buffer.from(arrayBuffer)).then(image => image.resize(width, height).getBufferAsync(Jimp.MIME_JPEG));
        } catch (retryError) {
            console.error('Retry Error:', retryError.message);
            return Buffer.from([]);
        }
    }

async function getDataBuffer(url, referer = null) {
    try {
        const fetchOptions = {
            redirect: 'follow',
            headers: referer ? {
                'Referer': referer
            } : {}
        };

        // Try using node-fetch
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.arrayBuffer() || await response.text();

        return Buffer.from(responseData);
    } catch (fetchError) {
        console.error('Fetch Error:', fetchError.message);

        try {
            // Try using got
            const gotResponse = await got(url, { headers: referer ? { 'Referer': referer } : {} });
            return Buffer.from(gotResponse.body);
        } catch (gotError) {
            console.error('Got Error:', gotError.message);

            try {
                const undiciFetchOptions = {
                    redirect: 'follow',
                    headers: referer ? {
                        'Referer': referer
                    } : {}
                };

                // Try using undici
                const undiciResponse = await undiciFetch(url, undiciFetchOptions);

                if (!undiciResponse.ok) {
                    throw new Error(`HTTP error! Status: ${undiciResponse.statusCode}`);
                }

                const undiciResponseBody = await undiciResponse.arrayBuffer() || await undiciResponse.text();

                return Buffer.from(undiciResponseBody);
            } catch (undiciError) {
                console.error('Undici Error:', undiciError.message);

                try {
                    const axiosConfig = {
                        headers: referer ? {
                            'Referer': referer
                        } : {}
                    };

                    // Try using axios
                    const axiosResponse = await axios.get(url, axiosConfig);

                    return Buffer.from(axiosResponse.data);
                } catch (axiosError) {
                    console.error('Axios Error:', axiosError.message);
                    return Buffer.from([]);
                }
            }
        }
    }
}