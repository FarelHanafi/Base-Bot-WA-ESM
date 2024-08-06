// If You Copy, Don`t Delete This Credit!!!
// Don`t Sell This Script Or I Take Immediately
// Yang Jual Script Ini Report/Hangusin Aja Akunnya Atau Pukulin ae orangnya
// Don`t Change This Credit!!!

import "./core/settings.js";
import makeWASocket, {
  Browsers,
  delay,
  DisconnectReason,
  fetchLatestWaWebVersion,
  jidNormalizedUser,
  makeCacheableSignalKeyStore,
  getAggregateVotesInPollMessage,
  makeInMemoryStore,
  PHONENUMBER_MCC,
  jidDecode,
  useMultiFileAuthState,
} from "@xyzendev/baileys";
import pino from "pino";
import smsg, { Module } from "./core/library/systems/serialize.js";
import fs from "fs";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import CFonts from "cfonts";
import lodash from "lodash";
import yargs from "yargs";
const { chain } = lodash;
import { fileURLToPath } from "url";
import chalk from "chalk";
import readline from "readline"
import NodeCache from "node-cache"
import { Boom } from "@hapi/boom"
import path from "path";

const color = (text, color) => {
  return !color ? chalk.green(text) : (chalk[color] || chalk.hex(color))(text);
};

global.smsg = smsg

global.opts = new Object(
  yargs(process.argv.slice(2)).exitProcess(false).parse()
);
global.db = new Low(new JSONFile(`storage/database.json`));

global.DATABASE = global.db;
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ)
    return new Promise((resolve) =>
      setInterval(function () {
        !global.db.READ
          ? (clearInterval(this),
            resolve(
              global.db.data == null ? global.loadDatabase() : global.db.data
            ))
          : null;
      }, 1 * 1000)
    );
  if (global.db.data !== null) return;
  global.db.READ = true;
  await global.db.read();
  global.db.READ = false;
  global.db.data = {
    users: {},
    database: {},
    groups: {},
    game: {},
    settings: {},
    message: {},
    usage: {},
    ...(global.db.data || {}),
  };
  global.db.chain = chain(global.db.data);
};
loadDatabase();

if (global.db)
  setInterval(async () => {
    if (global.db.data) await global.db.write();
  }, 30 * 1000);

const logger = pino({
  timestamp: () => `,"time":"${new Date().toJSON()}"`,
}).child({ class: "masha" });
logger.level = "fatal";

const store = makeInMemoryStore({ logger });

if (global.store) store.readFromFile("./store.json");

let phoneNumber = "6282334226291";

const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code");
const useMobile = process.argv.includes("--mobile");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const trashDir = path.join(__dirname, 'temp');

const cleanTrash = async () => {
  try {
    const files = await readdir(trashDir);
    const deletePromises = files.map(async (file) => {
      if (file !== 'farel.js') {
        const filePath = path.join(trashDir, file);
        const fileStat = await stat(filePath);
        if (fileStat.isFile()) {
          await unlink(filePath);
        } else if (fileStat.isDirectory()) {
          await rm(filePath, { recursive: true, force: true });
        }
      }
    });
    await Promise.all(deletePromises);
  } catch (err) {
    console.error('Error cleaning trash directory:', err);
  }
};
setInterval(cleanTrash, 300000);

async function startmasha() {
  const { state, saveCreds } = await useMultiFileAuthState(`./storage/session`);
  const msgRetryCounterCache = new NodeCache();
  const masha = makeWASocket.default({
    logger: pino({ level: "silent" }),
    printQRInTerminal: !pairingCode,
    browser: ["Mac OS", "chrome", "121.0.6167.159"],
    patchMessageBeforeSending: (message) => {
      const requiresPatch = !!(
        message.buttonsMessage ||
        message.templateMessage ||
        message.listMessage
      );
      if (requiresPatch) {
        message = {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadataVersion: 2,
                deviceListMetadata: {},
              },
              ...message,
            },
          },
        };
      }
      return message;
    },
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(
        state.keys,
        pino({ level: "fatal" }).child({ level: "fatal" })
      ),
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    getMessage: async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id);
        return msg.message || undefined;
      }
      return {
        conversation: "Masha Bot Here!",
      };
    },
    msgRetryCounterCache,
    defaultQueryTimeoutMs: undefined,
  });

  store.bind(masha.ev);
  await Module({ masha, store });

  if (pairingCode && !masha.authState.creds.registered) {
    if (useMobile) throw new Error("Cannot use pairing code with mobile api");

    let phoneNumber;
    if (!!phoneNumber) {
      phoneNumber = phoneNumber.replace(/[^0-9]/g, "");

      if (
        !Object.keys(PHONENUMBER_MCC).some((v) => phoneNumber.startsWith(v))
      ) {
        console.log(
          chalk.bgBlack(
            chalk.greenBright(
              "Start with country code of your WhatsApp Number, Example : +6282334226291"
            )
          )
        );
        process.exit(0);
      }
    } else {
      phoneNumber = await question(
        chalk.bgBlack(
          chalk.greenBright(
            `Please type your WhatsApp number 😍\nFor example: +6282334226291 : `
          )
        )
      );
      phoneNumber = phoneNumber.replace(/[^0-9]/g, "");

      // Ask again when entering the wrong number
      if (
        !Object.keys(PHONENUMBER_MCC).some((v) => phoneNumber.startsWith(v))
      ) {
        console.log(
          chalk.bgBlack(
            chalk.greenBright(
              "Start with country code of your WhatsApp Number, Example : +6282334226291"
            )
          )
        );

        phoneNumber = await question(
          chalk.bgBlack(
            chalk.greenBright(
              `Please type your WhatsApp number 😍\nFor example: +6282334226291 : `
            )
          )
        );
        phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
        rl.close();
      }
    }

    setTimeout(async () => {
      let code = await masha.requestPairingCode(phoneNumber);
      code = code?.match(/.{1,4}/g)?.join("-") || code;
      console.log(
        chalk.black(chalk.bgBlack(`Your Pairing Code : `)),
        chalk.greenBright(code)
      );
    }, 3000);
  }

  masha.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    try {
      if (connection === "close") {
        let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
        if (reason === DisconnectReason.badSession) {
          console.log(`Bad Session File, Please Delete Session and Scan Again`);
          startmasha();
        } else if (reason === DisconnectReason.connectionClosed) {
          console.log("Connection closed, reconnecting....");
          startmasha();
        } else if (reason === DisconnectReason.connectionLost) {
          console.log("Connection Lost from Server, reconnecting...");
          startmasha();
        } else if (reason === DisconnectReason.connectionReplaced) {
          console.log(
            "Connection Replaced, Another New Session Opened, Please Close Current Session First"
          );
          startmasha();
        } else if (reason === DisconnectReason.loggedOut) {
          console.log(
            `Device Logged Out, Please Delete Session and Scan Again.`
          );
          startmasha();
        } else if (reason === DisconnectReason.restartRequired) {
          console.log("Restart Required, Restarting...");
          startmasha();
        } else if (reason === DisconnectReason.timedOut) {
          console.log("Connection TimedOut, Reconnecting...");
          startmasha();
        } else masha.end(`Unknown DisconnectReason: ${reason}|${connection}`);
      }
      if (
        update.connection == "connecting" ||
        update.receivedPendingNotifications == "false"
      ) {
        console.log(color(`\n🌿Connecting...`, "yellow"));
      }
      if (
        update.connection == "open" ||
        update.receivedPendingNotifications == "true"
      ) {
        console.log(color(`\n✅ Bot Berhasil Tersambung`, "green"));
        console.log("\n\n");
        CFonts.say("MashaMD", {
          font: "block",
          align: "center",
          colors: ["red", "magenta", "green", "yellow", "blue"],
        });
        CFonts.say("https://youtube.com/@Rein998", {
          font: "console",
          align: "center",
          gradient: ["blue", "yellow"],
        });
      }
    } catch (err) {
      console.log("Error in Connection.update " + err);
      startmasha();
    }
  });
  masha.ev.on("creds.update", saveCreds);
  masha.ev.on("messages.upsert", () => {});
  //------------------------------------------------------
  //farewell/welcome
  masha.ev.on("group-participants.update", async (anu) => {
    if (global.db.data.chats[m.chat].welcome) {
      console.log(`${anu.action} => ${anu.participants} to ${anu.id}`);
      try {
        let participants = anu.participants;
        for (let num of participants) {
          if (anu.action == "add") {
            let MashaName = num;
            Mashabody = `Welcome @${MashaName.split("@")[0]}👋`;
            masha.sendMessage(anu.id, {
              text: Mashabody,
            });
          } else if (anu.action == "remove") {
            let MashaName = num;
            Mashabody = `Goodbye @${MashaName.split("@")[0]}👋`;
            masha.sendMessage(anu.id, {
              text: Mashabody,
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  });
  // Anti Call
  masha.ev.on("call", async (mashaPapa) => {
    const botNumber = await masha.decodeJid(masha.user.id);
    if (global.db.data.settings[botNumber].welcome) {
      for (let mashaFucks of mashaPapa) {
        if (mashaFucks.isGroup == false) {
          if (mashaFucks.status == "offer") {
            masha.rejectCall(mashaFucks.id, mashaFucks.from);
            console.log("call from: " + mashaFucks.from);
          }
        }
      }
    }
  });
  masha.ev.on("call", async (mashaPapa) => {
    const botNumber = await masha.decodeJid(masha.user.id);
    if (global.db.data.settings[botNumber].welcome) {
      for (let mashaFucks of mashaPapa) {
        if (mashaFucks.isGroup == true) {
          if (mashaFucks.status == "offer") {
            masha.rejectCall(mashaFucks.id, mashaFucks.from);
            console.log("call from: " + mashaFucks.from);
          }
        }
      }
    }
  });
  //autostatus view
  masha.ev.on("messages.upsert", async (chatUpdate) => {
    const botNumber = await masha.decodeJid(masha.user.id);
    if (global.db.data.settings[botNumber].autoswview) {
      mek = chatUpdate.messages[0];
      if (mek.key && mek.key.remoteJid === "status@broadcast") {
        await masha.readMessages([mek.key]);
      }
    }
  });

  masha.ev.on("messages.upsert", async ({ messages }) => {
    if (!messages[0].message) return;
    let m = await smsg(masha, messages[0], store);
    if (store.groupMetadata && Object.keys(store.groupMetadata).length === 0)
      store.groupMetadata = await masha.groupFetchAllParticipating();
  
      const handlerModule = await import(`./core/systems/handler.js?v=${new Date().getTime()}`);
      await handlerModule.default(masha, store, m, messages[0]);
  });
  

  global.masha = masha;
  return masha;
}

startmasha();

process.on("uncaughtException", function (err) {
  let e = String(err);
  if (e.includes("conflict")) return;
  if (e.includes("Cannot derive from empty media key")) return;
  if (e.includes("Socket connection timeout")) return;
  if (e.includes("not-authorized")) return;
  if (e.includes("already-exists")) return;
  if (e.includes("rate-overlimit")) return;
  if (e.includes("Connection Closed")) return;
  if (e.includes("Timed Out")) return;
  if (e.includes("Value not found")) return;
  console.log("Caught exception: ", err);
});

let fileP = fileURLToPath(import.meta.url);
fs.watchFile(fileP, () => {
  fs.unwatchFile(fileP);
  console.log(`Successfully To Update File ${fileP}`);
});