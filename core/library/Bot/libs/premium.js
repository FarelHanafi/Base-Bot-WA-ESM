import fs from "fs";
import toMs from "ms";

/**
 * Add premium user.
 * @param {String} userId
 * @param {String} expired
 * @param {Object} _dir
 */
export const addPremiumUser = (userId, expired, _dir) => {
  const cekUser = _dir.find((user) => user.id == userId);
  if (cekUser) {
    cekUser.expired = cekUser.expired + toMs(expired);
  } else {
    const obj = { id: userId, expired: Date.now() + toMs(expired) };
    _dir.push(obj);
  }
  fs.writeFileSync(
    "../../../../storage/json/premium.json",
    JSON.stringify(_dir)
  );
};

/**
 * Get premium user position.
 * @param {String} userId
 * @param {Object} _dir
 * @returns {Number}
 */
export const getPremiumPosition = (userId, _dir) => {
  let position = null;
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === userId) {
      position = i;
    }
  });
  if (position !== null) {
    return position;
  }
};

/**
 * Get premium user expire.
 * @param {String} userId
 * @param {Object} _dir
 * @returns {Number}
 */
export const getPremiumExpired = (userId, _dir) => {
  let position = null;
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === userId) {
      position = i;
    }
  });
  if (position !== null) {
    return _dir[position].expired;
  }
};

/**
 * Check user is premium.
 * @param {String} userId
 * @param {Object} _dir
 * @returns {Boolean}
 */
export const checkPremiumUser = (userId, _dir) => {
  let status = false;
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === userId) {
      status = true;
    }
  });
  return status;
};

/**
 * Constantly checking premium.
 * @param {Object} _dir
 */
export const expiredCheck = (conn, _dir) => {
  setInterval(() => {
    let position = null;
    Object.keys(_dir).forEach((i) => {
      if (Date.now() >= _dir[i].expired) {
        position = i;
      }
    });
    if (position !== null) {
      const idny = _dir[position].id;
      console.log(`Premium expired: ${_dir[position].id}`);
      _dir.splice(position, 1);
      fs.writeFileSync(
        "../../../../storage/json/premium.json",
        JSON.stringify(_dir)
      );
      idny
        ? conn.sendMessage(idny, {
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
          })
        : "";
    }
  }, 1000);
};

/**
 * Get all premium user ID.
 * @param {Object} _dir
 * @returns {String[]}
 */
export const getAllPremiumUser = (_dir) => {
  const array = [];
  Object.keys(_dir).forEach((i) => {
    array.push(_dir[i].id);
  });
  return array;
};
