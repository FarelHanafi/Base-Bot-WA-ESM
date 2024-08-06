// If You Copy, Don`t Delete This Credit!!!
// Don`t Sell This Script Or I Take Immediately
// Yang Jual Script Ini Report/Hangusin Aja Akunnya Atau Pukulin ae orangnya
// Don`t Change This Credit!!!

import "../library/Bot/listmenu.js";
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
import baileys from "@xyzendev/baileys";
import smsg, { appenTextMessage } from "../library/systems/serialize.js";
import * as Func from "../library/systems/functions.js";
import os from "os";
import util from "util";
import chalk from "chalk";
import { read, readFileSync, unwatchFile, watchFile, writeFileSync } from "fs";
import axios from "axios";
import { exec } from "child_process";
import speed from "performance-now";
import ytdl from "youtubedl-core";
import { performance } from "perf_hooks";
import { writeExif } from "../library/systems/sticker.js";
import { fileURLToPath } from "url";
import fs from "fs";
import { randomBytes } from "crypto";
import moment from "moment-timezone";
import * as System from "../library/Bot/libs/function.js";
import pino from "pino";

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

const premium = JSON.parse(readFileSync("storage/json/premium.json"));
const USERS = JSON.parse(readFileSync("storage/json/users.json"));
//Global
global.System = System;
//database
global.db.data = JSON.parse(fs.readFileSync("storage/database.json"));
if (global.db.data)
  global.db.data = {
    users: {},
    groups: {},
    settings: {},
    sticker: {},
    database: {},
    game: {},
    others: {},
    usage: {},
    ...(global.db.data || {}),
  };

export default async function message(masha, store, m, chatUpdate) {
  try {
    const { type, quotedMsg, mentioned, now, fromMe } = m;
    global.body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype === "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype === "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype === "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype === "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype === "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype === "InteractiveResponseMessage"
        ? JSON.parse(
            m.message.interactiveResponseMessage.nativeFlowResponseMessage
              .paramsJson
          )?.id
        : m.mtype === "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId ||
          m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
          m.message.InteractiveResponseMessage.NativeFlowResponseMessage ||
          m.text
        : "";
    global.budy = typeof m.text == "string" ? m.text : "";
    global.prefix = [".", "/", "#", ",", "!"]
      ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body)
        ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0]
        : ""
      : mprefix;
    global.isCmd = body.startsWith(prefix);
    global.prefix2 = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body)
      ? body.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi)
      : ".";
    global.isCmd2 = body.startsWith(prefix2);
    global.command = body
      .replace(prefix, "")
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();
    global.Downloaded = async (fileName) =>
      await masha.downloadMediaMessage(quoted, fileName);
    global.isCreator =
      global.ownernum.includes(m.sender.replace(/\D+/g, "")) || false;
    global.isOwner =
      global.ownernum.includes(m.sender.replace(/\D+/g, "")) || false;
    global.isPremium =
      JSON.parse(readFileSync("./storage/json/premium.json"))
        .map((v) => v.replace(/[^0-9]/g, ""))
        .includes(m.sender.replace(/\D+/g, "")) || isOwner;
    global.isUsers = USERS.includes(m.sender);
    global.args = body.trim().split(/ +/).slice(1);
    global.groupMetadata = m.isGroup
      ? await masha.groupMetadata(from).catch((e) => {})
      : "";
    global.q = args.join(" ");
    global.text = q;
    global.full_args = body.replace(command, "").slice(1).trim();
    global.rellzymisc = m.quoted || m;
    global.quoted =
      rellzymisc.mtype == "buttonsMessage"
        ? rellzymisc[Object.keys(rellzymisc)[1]]
        : rellzymisc.mtype == "templateMessage"
        ? rellzymisc.hydratedTemplate[
            Object.keys(rellzymisc.hydratedTemplate)[1]
          ]
        : rellzymisc.mtype == "product"
        ? rellzymisc[Object.keys(rellzymisc)[0]]
        : m.quoted
        ? m.quoted
        : m;
    global.mime = (quoted.msg || quoted).mimetype || "";
    global.qmsg = quoted.msg || quoted;
    global.pushname = m.pushName || "";
    global.botNumber = await masha.decodeJid(masha.user.id);
    global.sender = m.sender;
    global.from = m.key.remoteJid;
    global.pric = /^#.¦|\\^/.test(body) ? body.match(/^#.¦|\\^/gi) : mprefix;
    global.budy = typeof m.text == "string" ? m.text : "";
    global.rellzybody = body.startsWith(pric);
    global.isCommand = (m.prefix && m.body.startsWith(m.prefix)) || false;
    global.participants = m.isGroup ? await groupMetadata.participants : "";
    global.groupAdmins = m.isGroup ? await getGroupAdmins(participants) : "";
    global.isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
    global.isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
    global.groupName = m.isGroup ? groupMetadata.subject : pushname;
    global.isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
    global.groupOwner = m.isGroup ? groupMetadata.owner : "";
    global.isGroupOwner = m.isGroup
      ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender)
      : false;

    //database
    try {
      let isNumber = (x) => typeof x === "number" && !isNaN(x);
      let user = global.db.data.users[m.sender];
      let serial = randomBytes(5).toString("hex");
      if (typeof user !== "object") global.db.data.users[m.sender] = {};
      if (user) {
        if (!isNumber(user.afkTime)) user.afkTime = -1;
        if (!("title" in user)) user.title = "";
        if (!("serialNumber" in user)) user.serialNumber = serial;
        if (!("afkReason" in user)) user.afkReason = "";
        if (!("nick" in user)) user.nick = masha.getName(m.sender);
        if (!isPremium) user.premium = false;
        if (!("autoai" in user)) user.autoai = true;
        if (!("role" in user)) user.role = "user";
        if (!("banned" in user)) user.banned = "user";
      } else
        global.db.data.users[m.sender] = {
          serialNumber: serial,
          role: "user",
          title: `${isPremium ? "Premium" : "User"}`,
          afkTime: -1,
          afkReason: "",
          nick: masha.getName(m.sender),
          premium: isPremium ? true : false,
          autoai: true,
          banned: false,
        };

      let chats = global.db.data.groups[from];
      if (typeof chats !== "object") global.db.data.groups[from] = {};
      if (chats) {
        if (!("antibot" in chats)) chats.antibot = false;
        if (!("antiviewonce" in chats)) chats.antiviewonce = false;
        if (!("antilink" in chats)) chats.antilink = false;
        if (!("antilinkgc" in chats)) chats.antilinkgc = false;
        if (!("antipromotion" in chats)) chats.antipromotion = false;
        if (!("welcome" in chats)) chats.welcome = true;
        if (!("autoai" in chats)) chats.autoai = false;
        if (!("banned" in chats)) chats.banned = false;
      } else
        global.db.data.groups[from] = {
          antibot: false,
          antiviewonce: false,
          antilink: false,
          antilinkgc: false,
          antipromotion: false,
          welcome: true,
          autoai: false,
          banned: false,
        };

      let setting = global.db.data.settings[botNumber];
      if (typeof setting !== "object") global.db.data.settings[botNumber] = {};
      if (setting) {
        if (!("online" in setting)) setting.online = false;
        if (!("autosticker" in setting)) setting.autosticker = false;
        if (!("autodownload" in setting)) setting.autodownload = false;
        if (!("autobio" in setting)) setting.autobio = false;
        if (!("autoread" in setting)) setting.autoread = false;
        if (!("autotype" in setting)) setting.autotype = false;
        if (!("onlygrub" in setting)) setting.onlygrub = false;
        if (!("anticall" in setting)) setting.anticall = false;
        if (!("onlypc" in setting)) setting.onlypc = false;
        if (!("autoswview" in setting)) setting.autoswview = false;
        if (!("public" in setting)) setting.public = true;
      } else
        global.db.data.settings[botNumber] = {
          online: false,
          autosticker: false,
          autodownload: false,
          autobio: true,
          autoread: true,
          onlygrub: false,
          onlypc: false,
          autotype: false,
          anticall: false,
          autoswview: false,
          public: true,
          watermark: {
            packname: global.titlebot,
            author: global.wm,
          },
        };
    } catch (err) {
      console.log(err);
    }
    // Auto BIO
    /*setInterval(async () => {
      const botNumber = await masha.decodeJid(masha.user.id);
      if (db.data.settings[botNumber].autobio) {
        const totalreg = Object.keys(global.db.data.users).length;
        const corejs = await fs.readFile('masha.js', 'utf-8');
        const corejscase = (corejs.match(/case "/g) || []).length;
        const truthjson = [
          `${global.namebot}🌸 || ${totalreg} Users`,
          `${global.namebot}🌸 || ${runtime(process.uptime())}`,
          `${global.namebot}🌸 || ${corejscase} Features`,
          `${global.namebot}🌸 || Mode: ${global.db.data.settings[botNumber].public === false ? "Private" : "Public"}`,
        ];
        const truth = truthjson[Math.floor(Math.random() * truthjson.length)];
        try {
          await masha.updateProfileStatus(truth);
        } catch (_) {
          console.error(_);
        }
      }
    }, 15 * 1000);*/
    // Auto Read
    if (db.data.settings[botNumber].autoread) {
      masha.readMessages([m.key]);
    }
    // SELF
    if (!global.db.data.settings[botNumber].public && !isCreator) {
      return
    }
    // Ban Chat System
    if (db.data.groups[from].banned && !isCreator) {
      return;
    }
    if (db.data.users[sender].banned && !isCreator) {
      return;
    }

    //console log
    if (m.message) {
      let konsolll = "";
      if (m.text.length < 50) {
        konsolll = m.body;
      } else if (!m.text.length < 50) {
        konsolll = `${prefix}${command}`;
      }
      console.log(`▣──────···
│👤 => ${chalk.redBright(pushname + " " + sender)}
│⏰ => ${chalk.greenBright(global.waktuwib)}
│📑 => ${chalk.black(chalk.bgGreen(m.type))}
│📤 => ${chalk.green(from)}
│💬 => ${chalk.white(konsolll)}
▣──────···`);
    }

    if (m.message && !m.isBot) {
      if (!isUsers) {
        USERS.push(m.sender);
        writeFileSync(
          "./storage/json/users.json",
          JSON.stringify(USERS, null, 2)
        );
      }
    }

    // Auto Typing
    if (db.data.settings[botNumber].autotype) {
      if (isCommand) {
        let mashahh = ["composing"];
        masha.sendPresenceUpdate(mashahh, from);
      }
    }
    // Antilink Wa
    if (global.db.data.groups[from].antilinkgc) {
      if (
        m.body.includes("whatsapp.com") ||
        m.body.includes("wa.me") ||
        m.body.includes("chat.whatsapp")
      ) {
        if (m.isAdmin) {
        } else if (m.isCreator) {
        } else {
          await masha.sendMessage(from, { delete: quoted.key });
        }
      }
    }
    // Anti Link
    if (global.db.data.groups[from].antilink) {
      if (m.body.includes("https://") || m.body.includes("http://")) {
        if (m.isAdmin) {
        } else if (m.isCreator) {
        } else {
          await masha.sendMessage(from, { delete: quoted.key });
        }
      }
    }
    // Grup Only
    if (!m.isGroup && !isOwner && db.data.settings[botNumber].onlygrub) {
      if (isCommand) {
        return reply(
          `Halo! Karena Kami Ingin Mengurangi Spam, Silakan Gunakan Bot di Grup Chat !\n\nJika Anda mengalami masalah silakan chat pemilik wa.me/${ownernum}`
        );
      }
    }
    // Private Only
    if (!isOwner && db.data.settings[botNumber].onlypc && m.isGroup) {
      if (isCommand) {
        return reply(
          "Halo! jika anda ingin menggunakan bot ini silahkan chat bot di private chat"
        );
      }
    }
    //total features
    const totalfitur = () => {
      var mytext = fs.readFileSync("masha.js").toString();
      var mytext2 = fs.readFileSync("./core/systems/handler.js").toString();
      var numUpper = (mytext.match(/case "/g) || []).length;
      var numUpper2 = (mytext2.match(/case "/g) || []).length;
      var totalfiturss = numUpper + numUpper2;
      return totalfiturss;
    };
    global.totalfitur = totalfitur();
    // afk system
    let mentionUser = [
      ...new Set([
        ...(m.mentionedJid || []),
        ...(m.quoted ? [m.quoted.sender] : []),
      ]),
    ];
    for (let jid of mentionUser) {
      let user = db.data.users[jid];
      if (!user) continue;
      let afkTime = user.afkTime;
      if (!afkTime || afkTime < 0) continue;
      let reason = user.afkReason || "";
      if (m.sender === botNumber) return;
      reply(`Dia Sedang AFK Dari ${clockString(new Date() - afkTime)}`.trim());
    }
    if (db.data.users[m.sender].afkTime > -1) {
      let user = global.db.data.users[m.sender];
      reply(
        `Kamu Telah kembali dari afk\nDurasi Afk: ${clockString(
          new Date() - user.afkTime
        )}`.trim()
      );
      user.afkTime = -1;
      user.afkReason = "";
    }

    //fake quoted
    const fkontak = {
      key: {
        participants: "0@s.whatsapp.net",
        remoteJid: "status@broadcast",
        fromMe: false,
        id: "Halo",
      },
      message: {
        conversation: "Verified By WhatsApp",
      },
      participant: "0@s.whatsapp.net",
    };
    global.fkontak = fkontak;
    //reply
    async function reply(teks) {
      m.reply(teks);
    }
    async function reply2(teks) {
      masha.sendMessage(
        from,
        {
          document: {
            url: "https://i.ibb.co/2W0H9Jq/avatar-contact.png",
          },
          caption: teks,
          mimetype: global.doctyper,
          fileName: "𝐌𝐚𝐬𝐡𝐚𝐌𝐃 - 𝐀𝐬𝐬𝐢𝐬𝐭𝐚𝐧𝐭",
          fileLength: "99999999999",
          contextInfo: {
            externalAdReply: {
              showAdAttribution: true,
              title: `${global.ucapanwaktu} ${pushname}🌸`,
              body: `${global.nameown}`,
              thumbnailUrl: "https://telegra.ph/file/8e7740a0f262be0979320.jpg",
              mediaType: 1,
              renderLargerThumbnail: false,
            },
          },
        },
        {
          quoted: fkontak,
        }
      );
    }
    global.reply = (teks) => {
      return reply(teks);
    };
    global.reply2 = (teks) => {
      return reply2(teks);
    };
    async function getImageMessage(url) {
      const { imageMessage } = await generateWAMessageContent(
        {
          image: {
            url,
          },
        },
        {
          upload: masha.waUploadToServer,
        }
      );
      return imageMessage;
    }
    global.getImageMessage = (url) => {
      return getImageMessage(url);
    };
    function pickRandom(list) {
      return list[Math.floor(list.length * Math.random())];
    }
    global.pickRandom = (list) => {
      return pickRandom(list);
    };
    function formatBytes(bytes) {
      if (bytes === 0) return "0 Bytes";

      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    }
    global.formatBytes = (bytes) => {
      return formatBytes(bytes);
    };

    //============= [LIST RESPONCE CHECKING START ]================
    if (m.type === "interactiveResponseMessage") {
      let msg = m.message[m.type] || m.msg;
      if (msg.nativeFlowResponseMessage && !m.isBot) {
        let { id } = JSON.parse(msg.nativeFlowResponseMessage.paramsJson) || {};
        if (id) {
          let emit_msg = {
            key: { ...m.key },
            message: { extendedTextMessage: { text: id } },
            pushName: m.pushName,
            messageTimestamp: m.messageTimestamp || 754785898978,
          };
          return masha.ev.emit("messages.upsert", {
            messages: [emit_msg],
            type: "notify",
          });
        }
      }
    }
    // Handler
    const logger = pino({
      timestamp: () => `,"time":"${new Date().toJSON()}"`,
    }).child({ class: "masha" });
    logger.level = "fatal";
    const store = makeInMemoryStore({ logger });

    async function handlerMeesage() {
      if (!chatUpdate) return;
      let m = await smsg(masha, chatUpdate, store);
      const mashaModule = await import(
        `../../masha.js?v=${new Date().getTime()}`
      );
      await mashaModule.default(masha, store, m, chatUpdate);
    }
    handlerMeesage();
    //============= [LIST RESPONCE CHECKING END ]================
    switch (isCommand ? m.command.toLowerCase() : false) {
      case "owner":
      case "creator":
      case "author":
        {
          let ownernumberss = [global.ownernum];
          await masha.sendContact(m.from, ownernumberss, m);
        }
        break;
      case "menu":
      case "allmenu":
        {
          let menu = `Hi *${
            m.pushname
          }*🍁\nI am an automated system (WhatsApp Bot) that can help to do something, search and get data / information.\n\nTime : ${moment
            .tz("Asia/Jakarta")
            .format("LT")} *WIB*\nDate : ${moment
            .tz("Asia/Jakarta")
            .format("LL")}\n`;
          menu += `${allmenu()}`;
          masha.sendMessage(
            from,
            {
              document: {
                url: "https://i.ibb.co/2W0H9Jq/avatar-contact.png",
              },
              caption: menu,
              mimetype: global.doctyper,
              fileName: "𝐌𝐚𝐬𝐡𝐚𝐌𝐃 - 𝐀𝐬𝐬𝐢𝐬𝐭𝐚𝐧𝐭",
              fileLength: "99999999999",
              contextInfo: {
                externalAdReply: {
                  showAdAttribution: true,
                  title: `𝐌𝐚𝐬𝐡𝐚𝐌𝐃 - 𝐅𝐞𝐚𝐭𝐮𝐫𝐞𝐬`,
                  body: `${nameown}`,
                  thumbnailUrl:
                    "https://telegra.ph/file/8e7740a0f262be0979320.jpg",
                  mediaType: 1,
                  renderLargerThumbnail: false,
                },
              },
            },
            {
              quoted: m,
            }
          );
        }
        break;
      case "addprem":
      case "addpremium":
        {
          if (!isOwner) return masha.reply(m.from, "Only Owner", m);
          if (!m.text)
            return masha.reply(m.from, "Please enter the number.", m);
          if (premium.includes(m.args[0]))
            return masha.reply(m.from, "User already premium", m);
          await premium.push(m.args[0]);
          await writeFileSync(
            "./storage/json/premium.json",
            JSON.stringify(premium)
          );
          masha.reply(m.from, "Success add premium", m);
        }
        break;
      case "delprem":
      case "delpremium":
      case "removeprem":
        {
          if (!isOwner) return masha.reply(m.from, "Only Owner", m);
          if (!m.text)
            return masha.reply(m.from, "Please enter the number.", m);
          if (!premium.includes(m.args[0]))
            return masha.reply(m.from, "User not premium", m);
          await premium.splice(premium.indexOf(m.args[0]), 1);
          await writeFileSync(
            "./storage/json/premium.json",
            JSON.stringify(premium)
          );
          masha.reply(m.from, "Success delete premium", m);
        }
        break;
      case "listprem":
      case "listpremium":
        {
          if (!isOwner) return masha.reply(m.from, "Only Owner", m);
          let list = 1;
          let txt = `*List Premium Members*\n\n`;
          for (let user of premium) {
            txt += `${list++}. ${user.replace(/@.+/, "")}\n`;
          }
          await masha.reply(m.from, txt, m);
        }
        break;
      case "ping":
      case "speed":
        {
          const startTimestamp = performance.now();

          const latency = performance.now() - startTimestamp;
          const platform = `${os.platform()} ${os.arch()}`;
          const uptime = (os.uptime() / 3600).toFixed(2);
          const cpuUsage = os
            .loadavg()
            .map((avg) => avg.toFixed(2))
            .join(", ");
          const totalMemory = formatBytes(os.totalmem());
          const usedMemory = formatBytes(os.totalmem() - os.freemem());
          const freeMemory = formatBytes(os.freemem());

          const response = `
*𝐋𝐢𝐛𝐫𝐚𝐫𝐲*: @FarelHanafi/Baileys
*𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦*: ${platform}
*𝐔𝐩𝐭𝐢𝐦𝐞*: ${uptime} hours
*𝐂𝐏𝐔 𝐔𝐬𝐚𝐠𝐞*: ${cpuUsage}
*𝐑𝐀𝐌*: ${usedMemory}/${totalMemory} (Free: ${freeMemory})
*𝐋𝐚𝐭𝐞𝐧𝐜𝐲*: _${latency.toFixed(2)}_ ms`;
          reply2(response);
        }
        break;
      default:
        if (['>', 'eval', '=>'].some(a => m.command.toLowerCase().startsWith(a)) && isOwner) {
        let evalCmd = '';
        try {
            evalCmd = /await/i.test(m.text) ? eval('(async() => { ' + m.text + ' })()') : eval(m.text);
        } catch (e) {
            evalCmd = e;
        }
        new Promise((resolve, reject) => {
            try {
                resolve(evalCmd);
            } catch (err) {
                reject(err);
            }
        })
            ?.then(res => reply(util.format(res)))
            ?.catch(err => reply(util.format(err)));
    }
    if (['$', 'exec'].some(a => m.command.toLowerCase().startsWith(a)) && isOwner) {
        try {
            exec(m.text, async (err, stdout) => {
                if (err) return reply(util.format(err));
                if (stdout) return reply(util.format(stdout));
            });
        } catch (e) {
            await m.reply(util.format(e));
        }
    }
    }
  } catch (e) {
    console.log(e);
  }
}

let fileP = fileURLToPath(import.meta.url);
watchFile(fileP, () => {
  unwatchFile(fileP);
  console.log(`Successfully To Update File ${fileP}`);
});
