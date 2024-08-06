import fs from "fs";
import chalk from "chalk";
import moment from "moment-timezone";
import { sleep } from "./myfunc.js";

const path = "../../../../storage/json/sewa.json";

let _dir = [];
if (fs.existsSync(path)) {
  try {
    _dir = JSON.parse(fs.readFileSync(path, "utf-8"));
  } catch (error) {
    console.error("Failed to read sewa.json:", error);
  }
}

const toMs = (duration) => {
  const days = parseInt(duration);
  return days * 24 * 60 * 60 * 1000;
};

const addSewa = (groupid, exp) => {
  const cekUser = _dir.find((user) => user.id == groupid);
  if (cekUser) {
    cekUser.expired = Date.now() + toMs(exp);
  } else {
    const obj = { id: groupid, expired: Date.now() + toMs(exp) };
    _dir.push(obj);
  }
  fs.writeFileSync(path, JSON.stringify(_dir, null, 2));
};

const getSewaPosition = (groupid) => {
  let position = null;
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === groupid) {
      position = i;
    }
  });
  if (position !== null) {
    return position;
  }
};

const getSewaExpired = (groupid) => {
  let position = null;
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === groupid) {
      position = i;
    }
  });
  if (position !== null) {
    return _dir[position].expired;
  }
};

const checkSewa = (groupid) => {
  let status = false;
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === groupid) {
      status = true;
    }
  });
  return status;
};

const expiredSewaCheck = (rell, msg) => {
  setInterval(() => {
    let position = null;
    Object.keys(_dir).forEach((i) => {
      if (Date.now() >= new Date(_dir[i].expired).getTime()) {
        position = i;
      }
    });
    if (position !== null) {
      const idny = _dir[position].id;
      console.log(`Premium expired: ${idny}`);
      _dir.splice(position, 1);
      fs.writeFileSync(
        "../../../../storage/json/sewa.json",
        JSON.stringify(_dir)
      );
      if (idny) {
        async function out() {
          rell.sendMessage(idny, {
            document: {
              url: "https://i.ibb.co/2W0H9Jq/avatar-contact.png",
            },
            caption: "Your premium has run out, please buy again.",
            mimetype: global.doctyper,
            fileName: "𝐌𝐚𝐬𝐡𝐚𝐌𝐃 - 𝐀𝐬𝐬𝐢𝐬𝐭𝐚𝐧𝐭",
            fileLength: "99999999999",
            contextInfo: {
              externalAdReply: {
                showAdAttribution: true,
                title: `𝐌𝐚𝐬𝐡𝐚𝐌𝐃 - 𝐏𝐫𝐞𝐦𝐢𝐮𝐦`,
                body: `${global.nameown}`,
                thumbnailUrl:
                  "https://telegra.ph/file/8e7740a0f262be0979320.jpg",
                mediaType: 1,
                renderLargerThumbnail: false,
              },
            },
          });
          await sleep(5000);
          await rell.groupLeave(idny);
        }
        out();
      }
    }
  }, 1000);
};

const getAllSewa = () => {
  const array = [];
  Object.keys(_dir).forEach((i) => {
    array.push(_dir[i].id);
  });
  return array;
};

export {
  addSewa,
  getSewaExpired,
  getSewaPosition,
  expiredSewaCheck,
  checkSewa,
  getAllSewa,
};

const file = import.meta.url;
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.green(`FILE UPDATED ${file}`));
  import(file).then((module) => module);
});
