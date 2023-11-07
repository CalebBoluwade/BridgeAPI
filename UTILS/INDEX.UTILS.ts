import { v4 as uuidv4, validate } from "uuid";
import crpyto from "crypto";
import pino from "pino";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import { Env } from "../CONFIG/ENV.CONFIG";

const signAccessJWT = (id: string, payload: any) => {
  return jwt.sign(
    { userID: id, data: payload },
    String(process.env.publicKey),
    {
      expiresIn: process.env.JWT_TTL,
    }
  );
};

const signRefreshJWT = (id: string, payload: any) => {
  return jwt.sign(
    { userID: id, data: payload },
    String(process.env.privateKey),
    {
      expiresIn: process.env.JWT_TTL,
    }
  );
};

const verifyJWT = (token: string, type: "access" | "refresh") => {
  try {
    const decoded = jwt.verify(
      token,
      String(type === "access" ? process.env.publicKey : process.env.privateKey)
    );
    return {
      valid: true,
      expired: false,
      decoded: decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
};

// const secretKey = crpyto.randomBytes(32);
// const iv = crpyto.randomBytes(16);

// console.log("sc", secretKey);
// console.log("iv", iv);

const secretKey = Buffer.from(Env("secretKey"));
const iv = Buffer.from(Env("IV"));

function customSerializer(obj: any): string {
  const level = obj.level;
  const message = obj.msg;
  const logObject = obj.object;

  return `${level} \t${message} \t${JSON.stringify(logObject)}\n`;
}

const Timestamp = () => {
  const timestamp = new Date().toUTCString();
  return `,\t. "time":[${timestamp}]\t`;
};

// const networkPath = "\\\\server\\share\\logs.log"; // Replace with your network path

// Create a writable stream to the network path

// // const logDirectory = `${__dirname}/LOGS`;

// fs.existsSync(logDirectory) ?? fs.mkdirSync(logDirectory);

const Logger = pino(
  {
    name: "NITRO LOGGER",
    stringify: false,
    timestamp: Timestamp,

    // msgPrefix: ">>> ",
    messageKey: "MESSAGE",
    errorKey: "ERROR",
    // hooks: { logMethod: customSerializer },
    serializers: {
      customSerializer,
      custom: customSerializer,
      pinoPretty: customSerializer,
    },
    redact: {
      paths: ["data.password", "data.tpin", "data.AuthPIN", "APIKEY", "JWT"],
      censor: "********",
    },
  },
  pino.destination({
    dest: path.join(__dirname, `../LOGS/SERVER.log`), // omit for stdout
    // minLength: 2048, // Buffer before writing
    sync: true, // Asynchronous logging
    mkdir: true,
    fsync: true,
    maxWrite: 100000,
  })
);

// const logStream = fs.createWriteStream(networkPath, { flags: "a" });

// Logger.on('data', (log) => {})
// console.log(secretKey, iv);
const Encrpytor = (data: any) => {
  try {
    const encryptCipher = crpyto.createCipheriv("AES256", secretKey, iv);
    // encryptCipher.setAutoPadding(false);
    let encrypted = encryptCipher.update(
      typeof data === "string" ? data : JSON.stringify(data),
      "utf8",
      "hex"
    );
    encrypted += encryptCipher.final("hex");
    // console.log(typeof data, data);
    return encrypted;
  } catch (error) {
    console.error(error);
    return "";
  }
};

const Decryptor = (data: any): string => {
  // Create a new decipher using the secret key and IV
  try {
    const decipher = crpyto.createDecipheriv("AES256", secretKey, iv);

    // Decrypt the data
    let decryptedData = decipher.update(data, "hex", "utf8");
    decryptedData += decipher.final("utf8");

    // console.log(decryptedData);
    return decryptedData;
  } catch (error) {
    console.error(error);
    return "";
  }
};

const GenerateOTP = () => {
  // Generate a 6-digit random number
  const OTP = String(Math.floor(100000 + Math.random() * 900000));
  // Set the expiration time for the OTP to 5 minutes from now
  const expiresIn = 60 * 60 * 1000; //  1 Hour in milliseconds
  const expirationTime = Date.now() + expiresIn;

  // Return the OTP and expiration time
  return { OTP: OTP, expiresIn: expiresIn, expirationTime: expirationTime };
};

export default GenerateOTP;

const GenerateFTRef = (): string => {
  const prefix = "NT";
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().slice(-2);
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");

  const uniquePart = `${year}${month}${day}`;
  const randomString = Math.random().toString(36).substring(2, 6);
  const transactionReference = prefix + uniquePart + randomString.toUpperCase();

  return transactionReference;
};

export const UTILS = {
  GetUUID: uuidv4,
  ValidateUUID: validate,
  Encrypt: Encrpytor,
  Decrypt: Decryptor,
  GenerateOTP,
  GenerateFTRef,
  Logger,
  signAccessJWT,
  signRefreshJWT,
  verifyJWT,
};
