process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

import {
    loadConfig
} from './config.js';
import Helper from './lib/helper.js';

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
global.__filename = Helper.__filename;
global.__dirname = Helper.__dirname;
global.__require = Helper.__require;

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
} = await(await import("@whiskeysockets/baileys")).default;

import readline from "readline";
import parsePhoneNumber from 'awesome-phonenumber';

import single2multi from './lib/single2multi.js';
import storeSystem from './lib/store-multi.js';

import { parentPort, isMainThread, Worker } from 'worker_threads';
import { writeHeapSnapshot } from 'v8';

const heapdumpOptions = { dirname: 'tmp', prefix: 'heapdump_' };

if (isMainThread) {
  const tmpDir = path.join(process.cwd(), heapdumpOptions.dirname);
  const worker = new Worker(path.join(process.cwd(), 'main.js'));
  const heapdumpPromises = [];

  worker.postMessage({ message: 'heapdump', options: heapdumpOptions });

  worker.on('message', filename => heapdumpPromises.push(filename));
  worker.on('exit', () => Promise.all(heapdumpPromises).then(heapdumpFiles => console.log('Heapdump files:', heapdumpFiles)).catch(error => console.error('Error generating heapdump:', error)));
  worker.on('error', error => console.error('Worker error:', error));
} else {
  parentPort.once('message', async ({ message, options }) => {
    if (message === 'heapdump') {
      try {
        const filename = await generateHeapDump(options);
        parentPort.postMessage(filename);
      } catch (error) {
        console.error('Error generating heapdump:', error);
      }
    }
  });

  parentPort.once('error', error => console.error('Parent port error:', error));
}

async function generateHeapDump(options) {
  const { dirname, prefix } = options;
  const filename = path.join(dirname, `${prefix}${Date.now()}.heapsnapshot`);
  await writeHeapSnapshot(filename);
  return filename;
}

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

protoType();
serialize();
   
global.API = Helper.API
global.timestamp = {
    start: new Date()
}

const directoryName = global.__dirname(import.meta.url)
global.opts = new Object(Helper.opts)

global.prefix = Helper.prefix;
const dbUrl = opts.db || opts.dbv2 || '';
const dbName = opts._[0] ? `${opts._[0]}_database.json` : 'database.json';

const dbInstance =
  !dbUrl ?
    new JSONFile(dbName) :
  /^https?:\/\//.test(dbUrl) ?
    new cloudDBAdapter(dbUrl) :
  /^mongodb(\+srv)?:\/\//i.test(dbUrl) && opts.db ?
    new mongoDB(dbUrl) :
  /^mongodb(\+srv)?:\/\//i.test(dbUrl) && opts.dbv2 ?
    new mongoDBV2(dbUrl) :
  new JSONFile(dbName);

global.db = new Low(dbInstance);
global.DATABASE = global.db;
global.loadDatabase = async function loadDatabase() {
    if (global.db.data !== null) return global.db.data;

    global.db.READ = true;
    try {
        await global.db.read();
        global.db.data = {
            users: {},
            chats: {},
            stats: {},
            msgs: {},
            sticker: {},
            settings: {},
            ...(global.db.data || {})
        };
        global.db.chain = chain(global.db.data);
    } catch (error) {
        console.error(error);
    } finally {
        global.db.READ = null;
    }

    return new Promise((resolve) => {
        const intervalId = setInterval(async () => {
            if (!global.db.READ) {
                clearInterval(intervalId);
                resolve(global.db.data);
            }
        }, 1000);
    });
};

const {
    version,
    isLatest
} = await fetchLatestWaWebVersion().catch(() => fetchLatestBaileysVersion());
console.log(`using WA v${version.join(".")}, isLatest: ${isLatest}`);

if (!opts && !pairingCode && !useMobile && !useQr && !singleToMulti) {
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
    console.log(chalk.bold.blue(`\n🚩 ${chalk.bold.blue('Example:')} ${chalk.bold.yellow('node . --pairing-code')}`));

    setImmediate(() => process.exit(1));
}

global.authFolder = storeSystem.fixFileName(`${Helper.opts._[0] || ''}TaylorSession`)
global.authFile = `${Helper.opts._[0] || 'session'}.data.json`

var [
    isCredsExist,
    isAuthSingleFileExist,
    authState
] = await Promise.all([
    Helper.checkFilesExist(authFolder + '/creds.json'),
    Helper.checkFilesExist(authFile),
    storeSystem.useMultiFileAuthState(authFolder)
])

const logger = Pino({
    level: "silent"
});
global.store = storeSystem.makeInMemoryStore({
    logger
});

if (Helper.opts['singleauth'] || Helper.opts['singleauthstate']) {
    if (!isCredsExist && isAuthSingleFileExist) {
        console.debug(chalk.bold.blue('- singleauth -'), chalk.bold.yellow('creds.json not found'), chalk.bold.green('compiling singleauth to multiauth...'));
        await single2multi(authFile, authFolder, authState);
        console.debug(chalk.bold.blue('- singleauth -'), chalk.bold.green('compiled successfully'));
        authState = await storeSystem.useMultiFileAuthState(authFolder);
    } else if (!isAuthSingleFileExist) console.error(chalk.bold.blue('- singleauth -'), chalk.bold.red('singleauth file not found'));
}

var storeFile = `${Helper.opts._[0] || 'data'}.store.json`
store.readFromFile(storeFile)

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
        if (store) {
            let jid = jidNormalizedUser(key.remoteJid)
            let msg = await store.loadMessage(jid, key.id)
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
store.bind(conn.ev)
conn.isInit = false

if (pairingCode && !conn.authState.creds.registered) {
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
    console.log(chalk.bold.cyan('╭──────────────────────────────────────···'));
    console.log(` 💻 ${chalk.bold.redBright('Your Pairing Code')}:`);
    console.log(chalk.bold.cyan('├──────────────────────────────────────···'));
    console.log(`   ${chalk.bold.cyan('- Code')}: ${code}`);
    console.log(chalk.bold.cyan('╰──────────────────────────────────────···'));
    rl.close()
}

if (useMobile && !conn.authState.creds.registered) {
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

if (!opts['test'] && global.db) {
    setInterval(async () => {
        if (global.db.data) await global.db.write(global.db.data);
        if (opts['autocleartmp'] && (global.support || {}).find) {
            ['tmp', 'jadibot'].forEach((filename) => cp.spawn('find', [os.tmpdir(), filename, '-amin', '3', '-type', 'f', '-delete']));
        }
    }, 5 * 60 * 1000);
}

if (opts['server']) {
    (await import('./server.js')).default(global.conn, PORT);
}

let timeout = 0;

async function connectionUpdate(update) {
    const {
        connection,
        lastDisconnect,
        isNewLogin,
        qr,
        isOnline,
        receivedPendingNotifications
    } = update;

    if (connection) {
        console.info("Taylor-V2".main, ">>", `Connection Status : ${connection}`.info);
    }

    if (isNewLogin) {
        conn.isInit = true;
    }

    const code = (lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode);

    if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
        try {
            conn.logger.info(await global.reloadHandler(true).catch(console.error));
        } catch (err) {
            console.error(err);
        }
    }

    if (!global.db.data) {
        await loadDatabase();
    }

    if (connection === 'connecting') {
        timeout++;
        console.log(chalk.bold.redBright('⚡ Mengaktifkan Bot, Mohon tunggu sebentar...'));
        if (timeout > 30) {
            console.log("Taylor-V2".main, ">>", `Session logout after 30 times reconnecting, This action will save your number from banned!`.warn);
            setImmediate(() => process.exit(1));
        }
    }

    if (connection === 'open') {
        try {
            const { jid } = conn.user;
            const name = await conn.getName(jid);
            conn.user.name = name || 'Taylor-V2';

            const currentTime = new Date();
            const pingSpeed = new Date() - currentTime;
            const formattedPingSpeed = pingSpeed < 0 ? 'N/A' : `${pingSpeed}ms`;

            console.log("Taylor-V2".main, ">>", `Client connected on: ${conn?.user?.id.split(":")[0] || global.namebot}`.info);
            const infoMsg = `🤖 *Bot Info* 🤖
🕰️ *Current Time:* ${currentTime}
👤 *Name:* *${name || 'Taylor'}*
🏷️ *Tag:* *@${jid.split('@')[0]}*
⚡ *Ping Speed:* *${formattedPingSpeed}*
📅 *Date:* ${currentTime.toDateString()}
🕒 *Time:* ${currentTime.toLocaleTimeString()}
📆 *Day:* ${currentTime.toLocaleDateString('id-ID', { weekday: 'long' })}
📝 *Description:* Bot *${name || 'Taylor'}* is now active.`;

            const messg = await conn.sendMessage(
                `${nomorown}@s.whatsapp.net`,
                { text: infoMsg, mentions: [nomorown + '@s.whatsapp.net', jid] },
                { quoted: null }
            );
            if (!messg) {
                conn.logger.error(`Error Connection'\n${format(e)}'`);
            }
        } catch (e) {
            conn.logger.error(`Error Connection'\n${format(e)}'`);
        }
        conn.logger.info(chalk.bold.yellow('\n🚩 R E A D Y'));
    }

    if (isOnline === true) {
        conn.logger.info(chalk.bold.green('Status Aktif'));
    } else if (isOnline === false) {
        conn.logger.error(chalk.bold.red('Status Mati'));
    }

    if (receivedPendingNotifications) {
        conn.logger.warn(chalk.bold.yellow('Menunggu Pesan Baru'));
    }

    if ((!pairingCode && !useMobile || useQr) && qr !== 0 && qr !== undefined && connection === 'close') {
        if (!useMobile) {
            conn.logger.error(chalk.bold.yellow(`\n🚩 Koneksi ditutup, harap hapus folder ${authFolder} dan pindai ulang kode QR`));
        } else {
            conn.logger.info(chalk.bold.yellow(`\n🚩 Pindai kode QR ini, kode QR akan kedaluwarsa dalam 60 detik.`));
        }
        setImmediate(() => process.exit(1));
    }
}

const handleExit = (message, code = 1) => {
  console.log((" Taylor-V2\n").main, ">>\n  ".info, (message.yellow));
  setImmediate(() => process.exit(code));
};

const handleError = (eventName, message) => {
  process.on(eventName, () => handleExit(`${eventName} Error: ${message}`));
};

process.on('exit', (code) => handleExit(`Exit Error: Exited with code ${chalk.yellow(code)}`));
handleError('SIGINT', 'Received SIGINT. Stopping the execution.');
handleError('SIGTERM', 'Received SIGTERM. Exiting gracefully.');

process.on('uncaughtException', (err) => {
  console.log((" Taylor-V2\n").main, ">>\n  ".info, (" Uncaught Exception: ").yellow, (err.message).yellow, (" Stack: ").yellow, err.stack.yellow);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log((" Taylor-V2\n").main, ">>\n  ".info, (" Unhandled Rejection: ").yellow, (reason).yellow, (" Promise: ").yellow, format(promise).yellow);
});

process.on('warning', (warning) => {
  console.warn((" Taylor-V2\n").main, ">>\n  ".info, (" Warning: ").yellow, (warning.message).yellow, (" Stack: ").yellow, warning.stack.yellow);
});

process.on('rejectionHandled', (promise) => {
  console.log((" Taylor-V2\n").main, ">>\n  ".info, (" Rejection Handled: ").yellow, format(promise).yellow);
});

process.on('uncaughtExceptionMonitor', (reason, promise) => {
  console.log((" Taylor-V2\n").main, ">>\n  ".info, (" Uncaught Exception Monitor: ").yellow, (reason).yellow, (" Promise: ").yellow, format(promise).yellow);
});

process.on('multipleResolves', () => {
  null;
});

let isInit = true;
let handler = await(await import('./handler.js'));
global.reloadHandler = async function(restatConn) {
    try {
        const Handler = await(await import(`./handler.js?update=${Date.now()}`)).catch(console.error);
        if (Object.keys(Handler || {}).length) handler = Handler;
    } catch (error) {
        console.error;
    }
    if (restatConn) {
        const oldChats = global.conn.chats;
        try {
            global.conn.ws.close();
        } catch (e) { console.error(e) }
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

const pluginFolder = path.resolve(directoryName, 'plugins');
const pluginFilter = (filename) => /\.js$/.test(filename);
global.plugins = {};

async function filesInit() {
    const CommandsFiles = glob.sync(path.resolve(pluginFolder, '**/*.js'), {
        ignore: ['**/node_modules/**']
    });

    const importPromises = CommandsFiles.map(async (file) => {
        const moduleName = path.join('/plugins', path.relative(pluginFolder, file));

        try {
            const module = await(await import(file));
            global.plugins[moduleName] = module.default || module;
            return { moduleName, success: true };
        } catch (e) {
            conn.logger.error(e);
            delete global.plugins[moduleName];
            return { moduleName, filePath: file, message: e.message, success: false };
        }
    });

    try {
        const results = await Promise.all(importPromises);

        const successMessages = results.filter((result) => result.success).map((result) => result.moduleName);
        const errorMessages = results.filter((result) => !result.success);

        global.plugins = Object.fromEntries(
            Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b))
        );

        const loadedPluginsMsg = `Loaded ${CommandsFiles.length} JS Files total.`;
        const successPluginsMsg = `✅ Success Plugins:\n${successMessages.length} total.`;
        const errorPluginsMsg = `❌ Error Plugins:\n${errorMessages.length} total`;

        conn.logger.warn(loadedPluginsMsg);
        conn.logger.info(successPluginsMsg);
        conn.logger.error(errorPluginsMsg);

        const errorMessagesText = errorMessages.map((error, index) =>
            `  ❗ *Error ${index + 1}:* ${error.filePath}\n - ${error.message}`
        ).join('');

        const messageText = `- 🤖 *Loaded Plugins Report* 🤖\n` +
            `🔧 *Total Plugins:* ${CommandsFiles.length}\n` +
            `✅ *Success:* ${successMessages.length}\n` +
            `❌ *Error:* ${errorMessages.length}\n` +
            (errorMessages.length > 0 ? errorMessagesText : '');

        const messg = await conn.sendMessage(
            nomorown + '@s.whatsapp.net',
            { text: messageText },
            { quoted: null }
        );

        if (!messg) {
            conn.logger.error(`Error sending message`);
        }
    } catch (e) {
        conn.logger.error(`Error sending message: ${e}`);
    }
}

global.reload = async (_ev, filename) => {
    if (!pluginFilter(filename)) return;

    const dir = path.join(pluginFolder, filename);

    try {
        if (existsSync(dir)) {
            conn.logger.info(`Requiring plugin '${filename}'`);
            const fileContent = await readFileSync(dir, 'utf-8');
            const err = syntaxerror(fileContent, filename, {
                sourceType: 'module',
                ecmaVersion: 2020,
                allowAwaitOutsideFunction: true,
                allowReturnOutsideFunction: true,
                allowImportExportEverywhere: true
            });
            if (err) {
                conn.logger.error(`Syntax error while loading '${filename}'\n${format(err)}`);
            } else {
                const module = await(await import(`${global.__filename(dir)}?update=${Date.now()}`));
                global.plugins[filename] = module.default || module;
            }
        } else {
            conn.logger.warn(`Deleted plugin '${filename}'`);
            delete global.plugins[filename];
        }
    } catch (e) {
        conn.logger.error(`Error requiring plugin '${filename}'\n${format(e)}`);
    } finally {
        global.plugins = Object.fromEntries(
            Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b))
        );
    }
};

async function FileEv(type, file) {
    try {
        const resolvedFile = path.resolve(global.__filename(file));
        switch (type) {
            case 'delete':
                delete global.plugins[resolvedFile];
                break;
            case 'change':
            case 'add':
                const module = await(await import(`${resolvedFile}?update=${Date.now()}`));
                global.plugins[resolvedFile] = module.default || module;
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
        cwd: directoryName
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
}

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

const steps = [
    loadDatabase,
    loadConfig,
    clearTmp,
    clearSessions,
    filesInit,
    libFiles,
    watchFiles,
    watchPluginStep,
    reloadHandler,
    _quickTest
];

async function executeSteps() {
    return new Promise(async (resolve, reject) => {
        const spinner = createSpinner('Executing steps...\n', 'moon');
        spinner.start();

        try {
            for (const step of steps) {
                spinner.render();
                await step();
                spinner.succeed(`${step.name.replace(/([A-Z])/g, ' $1').trim()} executed successfully\n`);
            }
            resolve();
        } catch (error) {
            spinner.fail(`Execution failed with error: ${error.message}\n`);
            reject(error);
        } finally {
            spinner.stop();
        }
    });
}

executeSteps()
    .then(() => {
        console.log('All steps executed successfully');
    })
    .catch((error) => {
        console.error('Error executing steps:', error);
    });

async function watchPluginStep() {
    try {
        await watch(pluginFolder, global.reload);
        console.log(chalk.bold.green('Watch Plugin Step selesai.'));
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
        console.error(`Error in Quick Test: ${error.message}`);
    }
}

async function clearTmp() {
    try {
        const tmp = [tmpdir(), path.join(directoryName, './tmp')];
        const filenames = await Promise.all(tmp.map(async (dirname) => {
            try {
                const files = await readdirSync(dirname);
                return await Promise.all(files.map(async (file) => {
                    try {
                        const filePath = path.join(dirname, file);
                        const stats = await statSync(filePath);
                        if (stats.isFile()) {
                            await unlinkSync(filePath);
                            console.log('Successfully cleared tmp:'.main, filePath.info);
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
        const flattenedFilenames = filenames.flat().filter((file) => file !== null);
        return flattenedFilenames;
    } catch (err) {
        console.error(`Error in clearTmp: ${err.message}`);
        return [];
    } finally {
        setTimeout(clearTmp, 45 * 60 * 1000);
    }
}

async function clearSessions(folder) {
    folder = folder || './' + authFolder;
    try {
        const filenames = await readdirSync(folder);
        const deletedFiles = await Promise.all(filenames.map(async (file) => {
            try {
                const filePath = path.join(folder, file);
                const stats = await statSync(filePath);
                if (stats.isFile() && file !== 'creds.json') {
                    await unlinkSync(filePath);
                    console.log('Deleted session:'.main, filePath.info);
                    return filePath;
                }
            } catch (err) {
                console.error(`Error processing ${file}: ${err.message}`);
            }
        }));
        return deletedFiles.filter((file) => file !== null);
    } catch (err) {
        console.error(`Error in Clear Sessions: ${err.message}`);
        return [];
    } finally {
        setTimeout(() => clearSessions(folder), 60 * 60 * 1000);
    }
}

const libFolder = path.resolve(directoryName, 'lib');
const libFilter = (filename) => /\.js$/.test(filename);
global.lib = {};

async function libFiles() {
    const CommandsFiles = glob.sync(path.resolve(libFolder, '**/*.js'), {
        ignore: ['**/node_modules/**']
    });

    await Promise.all(CommandsFiles.map(async (file) => {
        const moduleName = path.join('/lib', path.relative(libFolder, file));

        try {
            const module = await(await import(file));
            setNestedObject(global.lib, moduleName.slice(0, -3), module.default || module);
        } catch (e) {
            conn.logger.error(e);
            delete global.lib[moduleName.slice(0, -3)];
        }
    }));
    global.lib = Object.fromEntries(
            Object.entries(global.lib[''].lib).sort(([a], [b]) => a.localeCompare(b))
        );
}

const setNestedObject = (obj, path, value) =>
  path.split('/').reduce((acc, key, index, keys) => {
    return index === keys.length - 1 ? (acc[key] = value) : (acc[key] = acc[key] || {});
  }, obj);

function clockString(ms) {
    if (isNaN(ms)) return '-- Hari -- Jam -- Menit -- Detik';
    const units = ['Hari', 'Jam', 'Menit', 'Detik'].map((label, i) => ({
        label,
        value: Math.floor(i < 2 ? ms / (86400000 / [1, 24][i]) : ms / [60000, 1000][i - 2]) % ([1, 60][i < 2 ? 0 : 1])
    }));
    return units.map(unit => `${unit.value.toString().padStart(2, '0')} ${unit.label}`).join(' ');
}