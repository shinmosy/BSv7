process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
import {
    loadConfig
} from './config.js';

import {
    createRequire
} from "module";
import path from 'path';
import {
    fileURLToPath,
    pathToFileURL
} from 'url';
import {
    platform
} from 'process';
global.__filename = function filename(
    pathURL = import.meta.url,
    rmPrefix = platform !== "win32"
) {
    return rmPrefix ?
        /file:\/\/\//.test(pathURL) ?
        fileURLToPath(pathURL) :
        pathURL :
        pathToFileURL(pathURL).toString();
};
global.__dirname = function dirname(pathURL) {
    return path.dirname(global.__filename(pathURL, true));
};
global.__require = function require(dir = import.meta.url) {
    return createRequire(dir)
}

import * as glob from 'glob';

import {
    readdirSync,
    statSync,
    unlinkSync,
    existsSync,
    mkdirSync,
    readFileSync,
    rmSync,
    watch
} from 'fs';
import fs from 'fs/promises';
import yargs from 'yargs';
import {
    spawn
} from 'child_process';
import lodash from 'lodash';
import ora from 'ora';
import chalk from 'chalk';
import syntaxerror from 'syntax-error';
import {
    tmpdir
} from 'os';
import chokidar from 'chokidar';
import {
    format,
    promisify
} from 'util';
import {
    Boom
} from "@hapi/boom";
import Pino from 'pino';
import {
    makeWaSocket,
    protoType,
    serialize
} from './lib/simple.js';
import {
    Low,
    JSONFile
} from 'lowdb';
import {
    mongoDB,
    mongoDBV2
} from './lib/mongoDB.js';
import {
    cloudDBAdapter
} from './lib/cloudDBAdapter.js';

const {
    fetchLatestWaWebVersion,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    jidNormalizedUser,
    proto,
    PHONENUMBER_MCC,
    delay,
    DisconnectReason
} = await (await import("@whiskeysockets/baileys")).default;

import readline from "readline"
import {
    parsePhoneNumber
} from "libphonenumber-js"

import single2multi from './lib/single2multi.js';
import storeSystem from './lib/store-multi.js';
import Helper from './lib/helper.js';
import emojiRegex from 'emoji-regex';

const pairingCode = process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")
const useQr = process.argv.includes("--qr")
const singleToMulti = process.argv.includes("--singleauth")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
import NodeCache from "node-cache"
const msgRetryCounterCache = new NodeCache()

const {
    chain
} = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

protoType()
serialize()

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
    ...query,
    ...(apikeyqueryname ? {
        [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]
    } : {})
})) : '')
global.timestamp = {
    start: new Date
}

const __dirname = global.__dirname(import.meta.url)
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
const symbolRegex = /^[^\w\s\d]/u;
const emojiAndSymbolRegex = new RegExp(`(${symbolRegex.source}|${emojiRegex().source})`, 'u');
global.prefix = emojiAndSymbolRegex;
global.db = new Low(
    /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb(\+srv)?:\/\//i.test(opts['db']) ?
    (opts['mongodbv2'] ? new mongoDBV2(opts['db']) : new mongoDB(opts['db'])) :
    new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`)
)

global.DATABASE = global.db
global.loadDatabase = async function loadDatabase() {
    if (global.db.READ) return new Promise((resolve) => setInterval(async function() {
        if (!global.db.READ) {
            clearInterval(this)
            resolve(global.db.data == null ? global.loadDatabase() : global.db.data)
        }
    }, 1 * 1000))
    if (global.db.data !== null) return
    global.db.READ = true
    await global.db.read().catch(console.error)
    global.db.READ = null
    global.db.data = {
        users: {},
        chats: {},
        stats: {},
        msgs: {},
        sticker: {},
        settings: {},
        ...(global.db.data || {})
    }
    global.db.chain = chain(global.db.data)
}

global.authFile = "TaylorSession";

const {
    version,
    isLatest
} = await fetchLatestWaWebVersion().catch(() => fetchLatestBaileysVersion());
console.log(`using WA v${version.join(".")}, isLatest: ${isLatest}`);

if (!pairingCode && !useMobile && !useQr && !singleToMulti) {
    console.clear();
    const title = "OPTIONS";
    const message = ["--pairing-code", "--mobile", "--qr", "--singleauth"];
    const maxOptionWidth = 20;
    const tableData = message.map(option => ({
        'Option': option.slice(0, maxOptionWidth).padEnd(maxOptionWidth)
    }));
    const tableColumns = ['Option'];
    const boxWidth = 40;

    console.table(tableData, tableColumns, [`
    background-color: red;
    color: white;
    width: ${boxWidth}px;
    border-radius: 10px;
    text-align: left;
`]);
    console.log(chalk.blue.bold(`\n🚩 ${chalk.blue('Example:')} ${chalk.yellow('node . --pairing-code')}`));

    process.exit(1);
}

var authFolder = storeSystem.fixFileName(`${Helper.opts._[0] || ''}TaylorSession`)
var authFile = `${Helper.opts._[0] || 'session'}.data.json`

var [
    isCredsExist,
    isAuthSingleFileExist,
    authState
] = await Promise.all([
    Helper.checkFileExists(authFolder + '/creds.json'),
    Helper.checkFileExists(authFile),
    storeSystem.useMultiFileAuthState(authFolder)
])

const logger = Pino({
    level: "silent"
});
global.store = storeSystem.makeInMemoryStore({
    logger
})

// Convert single auth to multi auth
if (Helper.opts['singleauth'] || Helper.opts['singleauthstate']) {
    if (!isCredsExist && isAuthSingleFileExist) {
        console.debug(chalk.bold.blue('- singleauth -'), chalk.bold.yellow('creds.json not found'), chalk.bold.green('compiling singleauth to multiauth...'));
        await single2multi(authFile, authFolder, authState);
        console.debug(chalk.bold.blue('- singleauth -'), chalk.bold.green('compiled successfully'));
        authState = await storeSystem.useMultiFileAuthState(authFolder);
    } else if (!isAuthSingleFileExist) console.error(chalk.bold.blue('- singleauth -'), chalk.bold.red('singleauth file not found'));
}

var storeFile = `${Helper.opts._[0] || 'data'}.store.json`
global.store.readFromFile(storeFile)

const connectionOptions = {
    ...(!pairingCode && !useMobile && !useQr && {
        printQRInTerminal: false,
        mobile: !useMobile
    }),
    ...(pairingCode && {
        printQRInTerminal: !pairingCode
    }),
    ...(useMobile && {
        mobile: !useMobile
    }),
    ...(useQr && {
        printQRInTerminal: true
    }),
    patchMessageBeforeSending: (message) => {
        const requiresPatch = !!(message.buttonsMessage || message.templateMessage || message.listMessage);
        if (requiresPatch) {
            message = {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadataVersion: 2,
                            deviceListMetadata: {}
                        },
                        ...message
                    }
                }
            };
        }
        return message;
    },
    msgRetryCounterMap: {},
    logger,
    auth: {
        creds: authState.state.creds,
        keys: makeCacheableSignalKeyStore(authState.state.keys, logger),
    },
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    version,
    getMessage: async (key) => {
        if (global.store) {
            let jid = jidNormalizedUser(key.remoteJid)
            let msg = await global.store.loadMessage(jid, key.id)
            return msg?.message || ""
        }
        return proto.Message.fromObject({});
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    msgRetryCounterCache,
    defaultQueryTimeoutMs: undefined,
    fireInitQueries: false,
    shouldSyncHistoryMessage: false,
    downloadHistory: false,
    syncFullHistory: false
};

global.conn = makeWaSocket(connectionOptions);
global.store.bind(conn.ev)
conn.isInit = false

if (pairingCode && !conn.authState.creds.registered) {
    console.clear();
    if (useMobile) conn.logger.error('\nCannot use pairing code with mobile api')
    console.log(chalk.bold.cyan('╭──────────────────────────────────────···'));
    console.log(`📨 ${chalk.bold.redBright('Please type your WhatsApp number')}:`);
    console.log(chalk.bold.cyan('├──────────────────────────────────────···'));
    let phoneNumber = await question(`   ${chalk.bold.cyan('- Number')}: `);
    console.log(chalk.bold.cyan('╰──────────────────────────────────────···'));
    phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
    if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
        console.log(chalk.bold.cyan('╭─────────────────────────────────────────────────···'));
        console.log(`💬 ${chalk.bold.redBright("Start with your country's WhatsApp code, Example 62xxx")}:`);
        console.log(chalk.bold.cyan('╰─────────────────────────────────────────────────···'));
        console.log(chalk.bold.cyan('╭──────────────────────────────────────···'));
        console.log(`📨 ${chalk.bold.redBright('Please type your WhatsApp number')}:`);
        console.log(chalk.bold.cyan('├──────────────────────────────────────···'));
        phoneNumber = await question(`   ${chalk.bold.cyan('- Number')}: `);
        console.log(chalk.bold.cyan('╰──────────────────────────────────────···'));
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
    }
    await delay(3000)
    let code = await conn.requestPairingCode(phoneNumber)
    code = code?.match(/.{1,4}/g)?.join("-") || code
    global.codePairing = code
    console.log(chalk.bold.cyan('╭──────────────────────────────────────···'));
    console.log(` 💻 ${chalk.bold.redBright('Your Pairing Code')}:`);
    console.log(chalk.bold.cyan('├──────────────────────────────────────···'));
    console.log(`   ${chalk.bold.cyan('- Code')}: ${code}`);
    console.log(chalk.bold.cyan('╰──────────────────────────────────────···'));
    rl.close()
}

if (useMobile && !conn.authState.creds.registered) {
    console.clear();
    const {
        registration
    } = conn.authState.creds || {
        registration: {}
    }
    if (!registration.phoneNumber) {
        console.log(chalk.bold.cyan('╭──────────────────────────────────────···'));
        console.log(`📨 ${chalk.bold.redBright('Please type your WhatsApp number')}:`);
        console.log(chalk.bold.cyan('├──────────────────────────────────────···'));
        let phoneNumber = await question(`   ${chalk.bold.cyan('- Number')}: `);
        console.log(chalk.bold.cyan('╰──────────────────────────────────────···'));
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
        if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bold.cyan('╭─────────────────────────────────────────────────···'));
            console.log(`💬 ${chalk.bold.redBright("Start with your country's WhatsApp code, Example 62xxx")}:`);
            console.log(chalk.bold.cyan('╰─────────────────────────────────────────────────···'));
            console.log(chalk.bold.cyan('╭──────────────────────────────────────···'));
            console.log(`📨 ${chalk.bold.redBright('Please type your WhatsApp number')}:`);
            console.log(chalk.bold.cyan('├──────────────────────────────────────···'));
            phoneNumber = await question(`   ${chalk.bold.cyan('- Number')}: `);
            console.log(chalk.bold.cyan('╰──────────────────────────────────────···'));
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
        }
        registration.phoneNumber = "+" + phoneNumber
    }

    const phoneNumber = parsePhoneNumber(registration.phoneNumber)
    if (!phoneNumber.isValid()) conn.logger.error('\nInvalid phone number: ' + registration.phoneNumber)
    registration.phoneNumber = phoneNumber.format("E.164")
    registration.phoneNumberCountryCode = phoneNumber.countryCallingCode
    registration.phoneNumberNationalNumber = phoneNumber.nationalNumber
    const mcc = PHONENUMBER_MCC[phoneNumber.countryCallingCode]
    registration.phoneNumberMobileCountryCode = mcc
    async function enterCode() {
        try {
            console.log(chalk.bold.cyan('╭──────────────────────────────────────···'));
            console.log(`📨 ${chalk.bold.redBright('Please Enter Your OTP Code')}:`);
            console.log(chalk.bold.cyan('├──────────────────────────────────────···'));
            const code = await question(`   ${chalk.bold.cyan('- Code')}: `);
            console.log(chalk.bold.cyan('╰──────────────────────────────────────···'));
            const response = await conn.register(code.replace(/[^0-9]/g, '').trim().toLowerCase())
            console.log(chalk.bold.cyan('╭─────────────────────────────────────────────────···'));
            console.log(`💬 ${chalk.bold.redBright("Successfully registered your phone number.")}`);
            console.log(chalk.bold.cyan('╰─────────────────────────────────────────────────···'));
            console.log(response)
            rl.close()
        } catch (error) {
            conn.logger.error('\nFailed to register your phone number. Please try again.\n', error)
            await askOTP()
        }
    }

    async function askOTP() {
        console.clear();
        console.log(chalk.bold.cyan('╭──────────────────────────────────────···'));
        console.log(`📨 ${chalk.bold.redBright('What method do you want to use? "sms" or "voice"')}`);
        console.log(chalk.bold.cyan('├──────────────────────────────────────···'));
        let code = await question(`   ${chalk.bold.cyan('- Method')}: `);
        console.log(chalk.bold.cyan('╰──────────────────────────────────────···'));
        code = code.replace(/["']/g, '').trim().toLowerCase()
        if (code !== 'sms' && code !== 'voice') return await askOTP()
        registration.method = code
        try {
            await conn.requestRegistrationCode(registration)
            await enterCode()
        } catch (error) {
            conn.logger.error('\nFailed to request registration code. Please try again.\n', error)
            await askOTP()
        }
    }
    await askOTP()
}

conn.logger.info('\n🚩 W A I T I N G\n');

if (!opts['test']) {
    if (global.db) {
        setInterval(async () => {
            if (global.db.data) await global.db.write();
            if (opts['autocleartmp'] && (global.support || {}).find)(tmp = [os.tmpdir(), 'tmp', 'jadibot'], tmp.forEach((filename) => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])));
        }, 30 * 1000);
    }
}

if (opts['server'])(await import('./server.js')).default(global.conn, PORT);

global.connectionAttempts = 0
async function connectionUpdate(update) {
    const {
        connection,
        lastDisconnect,
        isNewLogin,
        qr,
        isOnline,
        receivedPendingNotifications
    } = update;
    if (isNewLogin) conn.isInit = true;
    const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
    if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
        conn.logger.info(await global.reloadHandler(true).catch(console.error));
    }
    if (global.db.data == null) loadDatabase();

    if (connection === 'connecting') {
        global.connectionAttempts++
        console.log(chalk.bold.redBright('⚡ Mengaktifkan Bot, Mohon tunggu sebentar...'));

        if (global.connectionAttempts >= 5) {
            console.clear();
            console.log(chalk.bold.redBright('Tidak bisa terhubung. Kemungkinan akun Anda di banned.'));
            process.exit(1);
        }
    }

    if (connection === 'open') {
        try {
            const {
                jid
            } = conn.user;
            const name = await conn.getName(jid);
            conn.user.name = name || 'Taylor-V2';

            const currentTime = new Date();
            const pingStart = new Date();
            const pingSpeed = pingStart - currentTime;
            const formattedPingSpeed = pingSpeed < 0 ? 'N/A' : `${pingSpeed}ms`;

            const infoMsg = `🤖 *Bot Info* 🤖
🕰️ *Current Time:* ${currentTime}
👤 *Name:* *${name || 'Taylor'}*
🏷️ *Tag:* *@${jid.split('@')[0]}*
⚡ *Ping Speed:* *${formattedPingSpeed}*
📅 *Date:* ${currentTime.toDateString()}
🕒 *Time:* ${currentTime.toLocaleTimeString()}
📆 *Day:* ${currentTime.toLocaleDateString('id-ID', { weekday: 'long' })}
📝 *Description:* Bot *${name || 'Taylor'}* is now active.`;

            await conn.reply(
                `${nomorown}@s.whatsapp.net`,
                infoMsg,
                null, {
                    contextInfo: {
                        mentionedJid: [nomorown + '@s.whatsapp.net', jid]
                    },
                }
            );
        } catch (e) {
            console.clear();
            console.log('Bot is now active.');
        }
        console.clear();
        conn.logger.info(chalk.bold.yellow('\n🚩 R E A D Y'));
    }
    if (isOnline == true) {
        console.clear();
        conn.logger.info(chalk.bold.green('Status Aktif'));
    }
    if (isOnline == false) {
        console.clear();
        conn.logger.error(chalk.bold.red('Status Mati'));
    }
    if (receivedPendingNotifications) {
        console.clear();
        conn.logger.warn(chalk.bold.yellow('Menunggu Pesan Baru'));
    }

    if (!pairingCode && !useMobile && qr !== 0 && qr !== undefined && connection === 'close') {
        console.clear();
        conn.logger.error(chalk.bold.yellow(`\n🚩 Koneksi ditutup, harap hapus folder ${global.authFile} dan pindai ulang kode QR`));
        process.exit(1);
    }

    if (!pairingCode && !useMobile && useQr && qr !== 0 && qr !== undefined && connection === 'close') {
        console.clear();
        conn.logger.info(chalk.bold.yellow(`\n🚩ㅤPindai kode QR ini, kode QR akan kedaluwarsa dalam 60 detik.`));
        process.exit(1);
    }

}

global.loggedErrors = global.loggedErrors || new Set();

process.on('uncaughtException', err => {
    if (!global.loggedErrors.has(err)) {
        console.clear();
        console.error(chalk.bold.red.bold('Uncaught Exception:'), err);
        global.loggedErrors.add(err);
    }
});

process.on('rejectionHandled', promise => {
    if (!global.loggedErrors.has(promise)) {
        console.clear();
        console.error(chalk.bold.red.bold('Rejection Handled:'), promise);
        global.loggedErrors.add(promise);
    }
});

process.on('warning', warning => console.warn(chalk.bold.yellow.bold('Warning:'), warning));

process.on('unhandledRejection', (reason, promise) => {
    if (!global.loggedErrors.has(reason)) {
        console.clear();
        console.error(chalk.bold.red.bold('Unhandled Rejection:'), reason);
        global.loggedErrors.add(reason);
    }
});

let isInit = true;
let handler = await import('./handler.js');
global.reloadHandler = async function(restatConn) {
    try {
        const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
        if (Object.keys(Handler || {}).length) handler = Handler;
    } catch (error) {
        console.error;
    }
    if (restatConn) {
        const oldChats = global.conn.chats;
        try {
            global.conn.ws.close();
        } catch {}
        conn.ev.removeAllListeners();
        global.conn = makeWaSocket(connectionOptions, {
            chats: oldChats
        });
        isInit = true;
    }
    if (!isInit) {
        conn.ev.off('messages.upsert', conn.handler);
        conn.ev.off('messages.update', conn.pollUpdate);
        conn.ev.off('group-participants.update', conn.participantsUpdate);
        conn.ev.off('groups.update', conn.groupsUpdate);
        conn.ev.off('message.delete', conn.onDelete);
        conn.ev.off('presence.update', conn.presenceUpdate);
        conn.ev.off('connection.update', conn.connectionUpdate);
        conn.ev.off('creds.update', conn.credsUpdate);
    }

    const emoji = {
        welcome: '👋',
        bye: '👋',
        promote: '👤👑',
        demote: '👤🙅‍♂️',
        desc: '📝',
        subject: '📌',
        icon: '🖼️',
        revoke: '🔗',
        announceOn: '🔒',
        announceOff: '🔓',
        restrictOn: '🚫',
        restrictOff: '✅',
    };

    conn.welcome = `${emoji.welcome} Hallo @user\n\n   *W E L C O M E*\n⫹⫺ Di grup @subject\n\n⫹⫺ Baca *DESKRIPSI*\n@desc`;
    conn.bye = `   *G O O D B Y E*\n${emoji.bye} Sampai jumpa @user`;
    conn.spromote = `*${emoji.promote} @user* sekarang menjadi admin!`;
    conn.sdemote = `*${emoji.demote} @user* tidak lagi menjadi admin!`;
    conn.sDesc = `${emoji.desc} Deskripsi telah diubah menjadi:\n@desc`;
    conn.sSubject = `${emoji.subject} Judul grup telah diubah menjadi:\n@subject`;
    conn.sIcon = `${emoji.icon} Icon grup telah diubah!`;
    conn.sRevoke = `${emoji.revoke} Link grup telah diubah ke:\n@revoke`;
    conn.sAnnounceOn = `${emoji.announceOn} Grup telah ditutup!\nSekarang hanya admin yang dapat mengirim pesan.`;
    conn.sAnnounceOff = `${emoji.announceOff} Grup telah dibuka!\nSekarang semua peserta dapat mengirim pesan.`;
    conn.sRestrictOn = `${emoji.restrictOn} Edit Info Grup diubah ke hanya admin!`;
    conn.sRestrictOff = `${emoji.restrictOff} Edit Info Grup diubah ke semua peserta!`;

    conn.handler = handler.handler.bind(global.conn);
    conn.pollUpdate = handler.pollUpdate.bind(global.conn);
    conn.participantsUpdate = handler.participantsUpdate.bind(global.conn);
    conn.groupsUpdate = handler.groupsUpdate.bind(global.conn);
    conn.onDelete = handler.deleteUpdate.bind(global.conn);
    conn.presenceUpdate = handler.presenceUpdate.bind(global.conn);
    conn.connectionUpdate = connectionUpdate.bind(global.conn);
    conn.credsUpdate = authState.saveCreds.bind(global.conn, true);

    const currentDateTime = new Date();
    const messageDateTime = new Date(conn.ev);
    if (currentDateTime >= messageDateTime) {
        const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0]);
    } else {
        const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0]);
    }

    conn.ev.on('messages.upsert', conn.handler);
    conn.ev.on('messages.update', conn.pollUpdate);
    conn.ev.on('group-participants.update', conn.participantsUpdate);
    conn.ev.on('groups.update', conn.groupsUpdate);
    conn.ev.on('message.delete', conn.onDelete);
    conn.ev.on('presence.update', conn.presenceUpdate);
    conn.ev.on('connection.update', conn.connectionUpdate);
    conn.ev.on('creds.update', conn.credsUpdate);

    isInit = false;
    return true;
};

const pluginFolder = path.resolve(__dirname, 'plugins');
const pluginFilter = (filename) => /\.js$/.test(filename);
global.plugins = new Object();

async function filesInit() {
    const CommandsFiles = glob.sync(path.resolve(pluginFolder, '**/*.js'), {
        ignore: ['**/node_modules/**']
    });

    const importPromises = CommandsFiles.map(async (file) => {
        const moduleName = path.join('/plugins', path.relative(pluginFolder, file));

        try {
            const module = await import(file);
            global.plugins[moduleName] = module.default || module;
            return moduleName;
        } catch (e) {
            conn.logger.error(e);
            delete global.plugins[moduleName];
            return {
                moduleName,
                filePath: file,
                message: e.message
            };
        }
    });

    const results = await Promise.all(importPromises);

    const successMessages = results
        .filter(result => typeof result === 'string')
        .sort((a, b) => a.localeCompare(b));

    const errorMessages = results
        .filter(result => typeof result === 'object')
        .sort((a, b) => a.moduleName.localeCompare(b.moduleName));

    global.plugins = Object.fromEntries(
        Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b))
    );

    conn.logger.warn(`Loaded ${CommandsFiles.length} JS Files total.`);
    conn.logger.info(`✅ Success Plugins:\n${successMessages.length} total.`);
    conn.logger.error(`❌ Error Plugins:\n${errorMessages.length} total`);

    try {
        await conn.reply(
            nomorown + '@s.whatsapp.net',
            `🤖 *Loaded Plugins Report* 🤖\n` +
            `🔧 *Total Plugins:* ${CommandsFiles.length}\n` +
            `✅ *Success:* ${successMessages.length}\n` +
            `❌ *Error:* ${errorMessages.length}\n` +
            (errorMessages.length > 0 ?
                `  ❗ *Errors:* ${errorMessages.map((error, index) => `\n    ${index + 1}. ${error.filePath}\n - ${error.message}`).join('')}\n` : ''),
            null
        );
    } catch (e) {
        console.clear();
        console.log('Bot loaded plugins.');
    }
}

global.reload = async (_ev, filename) => {
    if (pluginFilter(filename)) {
        let dir = path.join(pluginFolder, filename);
        if (global.plugins.hasOwnProperty(filename)) {
            if (existsSync(dir)) {
                conn.logger.info(`re-require plugin '${filename}'`);
            } else {
                conn.logger.warn(`deleted plugin '${filename}'`);
                delete global.plugins[filename];
                return;
            }
        } else {
            conn.logger.info(`requiring new plugin '${filename}'`);
        }

        try {
            const fileContent = await readFileSync(dir, 'utf-8');
            const err = syntaxerror(fileContent, filename, {
                sourceType: 'module',
                ecmaVersion: 2020,
                allowAwaitOutsideFunction: true,
                allowReturnOutsideFunction: true,
                allowImportExportEverywhere: true
            });
            if (err) {
                conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`);
            } else {
                const module = await import(`${global.__filename(dir)}?update=${Date.now()}`);
                global.plugins[filename] = module.default || module;
            }
        } catch (e) {
            conn.logger.error(`error require plugin '${filename}\n${format(e)}'`);
        } finally {
            global.plugins = Object.fromEntries(
                Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b))
            );
        }
    }
};

async function FileEv(type, file) {
    try {
        switch (type) {
            case 'delete':
                delete global.plugins[path.resolve(global.__filename(file))];
                break;
            case 'change':
            case 'add':
                const module = await import(
                    `${global.__filename(file)}?update=${Date.now()}`
                );
                global.plugins[path.resolve(global.__filename(file))] = module.default || module;
                break;
        }
    } catch (e) {
        conn.logger.error(`Error processing file event '${type}' for '${file}': ${e.message}`);
    } finally {
        global.plugins = Object.fromEntries(
            Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b))
        );
    }
}

async function watchFiles() {
    const watcher = chokidar.watch(['./**/*.js', '!./node_modules/**/*.js'], {
    ignored: /(^|[/\\])\../,
    ignoreInitial: true,
    persistent: true,
    usePolling: true,
    cwd: __dirname
});

    watcher
        .on('add', async (path) => {
            try {
                conn.logger.info(`New plugin - '${path}'`);
                await FileEv('add', `./${path}`);
            } catch (e) {
                conn.logger.error(`Error handling 'add' event for '${path}': ${e.message}`);
            }
        })
        .on('change', async (path) => {
            try {
                conn.logger.info(`Updated plugin - '${path}'`);
                await FileEv('change', `./${path}`);
            } catch (e) {
                conn.logger.error(`Error handling 'change' event for '${path}': ${e.message}`);
            }
        })
        .on('unlink', async (path) => {
            try {
                conn.logger.warn(`Deleted plugin - '${path}'`);
                await FileEv('delete', `./${path}`);
            } catch (e) {
                conn.logger.error(`Error handling 'unlink' event for '${path}': ${e.message}`);
            }
        })
        .on('error', (error) => {
            conn.logger.error(`Watcher error: ${error.message}`);
        })
        .on('ready', () => {
            conn.logger.info('Initial scan complete. Ready for changes.');
        });
};

const createSpinner = (text, spinnerType) => {
    const spinner = ora({
        text,
        spinner: spinnerType,
        discardStdin: false,
    });

    return {
        start: () => spinner.start(),
        succeed: (successText) => {
            spinner.succeed(chalk.bold.green(`${successText}\n`));
            spinner.stopAndPersist({
                symbol: chalk.green.bold('✔')
            });
        },
        fail: (errorText) => spinner.fail(chalk.bold.red(`${errorText}\n`)),
        stop: () => spinner.stop(),
        render: () => spinner.render(),
    };
};

let connectionCheckSpinner = createSpinner(chalk.bold.yellow('Menunggu disambungkan...\n'), 'moon').start();

do {
    connectionCheckSpinner.text = chalk.bold.yellow('Menunggu disambungkan...\n');
    connectionCheckSpinner.render();
    await delay(1000);
} while (!conn);

connectionCheckSpinner.succeed(chalk.bold.green('Terhubung!\n'));
connectionCheckSpinner.stop();

const steps = [
    loadDatabase,
    loadConfig,
    _quickTest,
    filesInit,
    watchFiles,
    reloadHandlerStep,
    watchPluginStep
];

const delayBetweenSteps = 3000;
const mainSpinner = ora({
    text: chalk.bold.yellow('Proses sedang berlangsung...'),
    spinner: 'moon'
}).start();

const executeStep = async (step, index) => {
    mainSpinner.text = chalk.bold.yellow(`Proses langkah ${index + 1} sedang berlangsung...`);
    await delay(index * delayBetweenSteps);

    try {
        const result = await step();
        mainSpinner.succeed(chalk.bold.green(`Langkah ${index + 1} berhasil diselesaikan!`));
        return result;
    } catch (error) {
        mainSpinner.fail(chalk.bold.red(`Error in step ${index + 1}: ${error}`));
        console.error(chalk.bold.red(`Error in step ${index + 1}: ${error}`));
        return `Error in step ${index + 1}: ${error}`;
    }
};

Promise.all(steps.map(executeStep))
    .then(results => {
        results.forEach(result => {
            if (typeof result === 'string') {
                console.error(chalk.bold.red(result));
            }
        });
        mainSpinner.succeed(chalk.bold.green('Semua langkah berhasil diselesaikan!'));
    })
    .catch(error => {
        mainSpinner.fail(chalk.bold.red(`${error}`));
    })
    .finally(() => {
        mainSpinner.stop();
    });

async function reloadHandlerStep() {
    try {
        await global.reloadHandler();
        console.log(chalk.bold.green('reloadHandlerStep selesai.'));
    } catch (error) {
        throw new Error(chalk.bold.red(`Error in reload handler step: ${error}`));
    }
}

async function watchPluginStep() {
    try {
        await watch(pluginFolder, global.reload);
        console.log(chalk.bold.green('watchPluginStep selesai.'));
    } catch (error) {
        throw new Error(chalk.bold.red(`Error in watch plugin step: ${error}`));
    }
}

async function _quickTest() {
    const binaries = [
        'ffmpeg',
        'ffprobe',
        ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-'],
        'convert',
        'magick',
        'gm',
        ['find', '--version'],
    ];

    try {
        const testResults = await Promise.all(binaries.map(async binary => {
            const [command, ...args] = Array.isArray(binary) ? binary : [binary];
            const process = spawn(command, args);

            try {
                const closePromise = new Promise(resolve => process.on('close', code => resolve(code !== 127)));
                const errorPromise = new Promise(resolve => process.on('error', _ => resolve(false)));

                return await Promise.race([closePromise, errorPromise]);
            } finally {
                process.kill();
            }
        }));

        const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = testResults;
        const support = {
            ffmpeg,
            ffprobe,
            ffmpegWebp,
            convert,
            magick,
            gm,
            find,
        };

        Object.freeze(global.support = support);
    } catch (error) {
        console.error(`Error in _quickTest: ${error.message}`);
    }
}

async function clearTmp() {
    try {
        const tmp = [tmpdir(), path.join(__dirname, './tmp')];
        const filenames = await Promise.all(tmp.map(async (dirname) => {
            try {
                const files = await readdirSync(dirname);
                return Promise.all(files.map(async (file) => {
                    try {
                        const filePath = path.join(dirname, file);
                        const stats = await statSync(filePath);
                        if (stats.isFile() && Date.now() - stats.mtimeMs >= 1000 * 60 * 3) {
                            await unlinkSync(filePath);
                            console.log('Successfully cleared tmp:', filePath);
                            return filePath;
                        }
                    } catch (err) {
                        console.error(`Error processing ${file}: ${err.message}`);

                    }
                }));
            } catch (err) {
                console.error(`Error reading directory ${dirname}: ${err.message}`);
                return [];
            }
        }));
        return filenames.flat().filter((file) => file !== null);
    } catch (err) {
        console.error(`Error in clearTmp: ${err.message}`);
        return [];
    }
}

async function clearSessions(folder = './TaylorSession') {
    try {
        const filenames = await readdirSync(folder);
        const deletedFiles = await Promise.all(filenames.map(async (file) => {
            try {
                const filePath = path.join(folder, file);
                const stats = await statSync(filePath);
                if (stats.isFile() && Date.now() - stats.mtimeMs >= 1000 * 60 * 120 && file !== 'creds.json') {
                    await unlinkSync(filePath);
                    console.log('Deleted session:', filePath);
                    return filePath;
                }

            } catch (err) {
                console.error(`Error processing ${file}: ${err.message}`);

            }
        }));
        return deletedFiles.filter((file) => file !== null);
    } catch (err) {
        console.error(`Error in clearSessions: ${err.message}`);
        return [];
    }
}

const actions = [{
        func: clearTmp,
        message: 'Penyegaran Tempat Penyimpanan Berhasil ✅',
        color: 'green'
    },
    {
        func: clearSessions,
        message: 'Clear Sessions Berhasil ✅',
        color: 'green'
    },
    {
        func: loadConfig,
        message: 'Sukses Re-load config. ✅',
        color: 'green'
    },
];

async function executeActions() {
    do {
        for (const {
                func,
                message,
                color
            }
            of actions) {
            try {
                await func();
                await delay(3000);
                console.log(chalk.bold[color](message));
            } catch (error) {
                console.error(chalk.bold.red(`Error executing action: ${error.message}`));
                throw error;
            }
        }
        await new Promise(resolve => setTimeout(resolve, 3600000));
    } while (true);
}
executeActions()
    .then(() => console.log("Execution completed."))
    .catch(error => console.error("Error in executeActions:", error))
    .finally(() => console.log("Finally block executed."));
    
global.Libs = {};

const libFiles = async (dir) => {
  try {
    const files = readdirSync(dir, { withFileTypes: true });

    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(dir, file.name);

        const isJsFile = /\.js$/i.test(file.name);

        if (file.isFile() && isJsFile) {
          try {
            const { default: module } = await import(filePath);
            global.Libs[file.name] = module || (await import(filePath));
          } catch (importErr) {
            console.error(`Error importing ${filePath}:`, importErr);
          }
        } else if (file.isDirectory()) {
          await libFiles(filePath);
        }
      })
    );
  } catch (readDirErr) {
    console.error('Error reading directory:', readDirErr);
    throw readDirErr;
  }
};

libFiles(path.join(process.cwd(), 'lib'))
  .then(() => {
    console.log(chalk.green('JS files listed and imported successfully!'));
  })
  .catch((err) => {
    console.error(chalk.red('Unhandled error:'), err);
  });

function clockString(ms) {
    if (isNaN(ms)) return '-- Hari -- Jam -- Menit -- Detik';
    const units = ['Hari', 'Jam', 'Menit', 'Detik'].map((label, i) => ({
        label,
        value: Math.floor(i < 2 ? ms / (86400000 / [1, 24][i]) : ms / [60000, 1000][i - 2]) % ([1, 60][i < 2 ? 0 : 1])
    }));
    return units.map(unit => `${unit.value.toString().padStart(2, '0')} ${unit.label}`).join(' ');
}