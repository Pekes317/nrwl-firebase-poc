const FileSystem = require('fs');
const Crypto = require('crypto');

/**
 * This is a Class.
 *
 * @param {string} password - A string param
 * @param {number} initVect - A number param
 *
 * @example
 *
 *     new Safe('funpass', 16);
 */
class Safe {
  algorithm = 'aes-256-ctr';
  initVect = 16;
  password = '';

  /**
   * @param {string} password - A string param
   * @param {number} initVect - A Number param
   */
  constructor(password, initVect) {
    this.initVect = initVect;
    this.password = password;
  }

  /**
   * @param {string} filePath - A string param
   */
  decrypt(filePath) {
    const encrypted = FileSystem.readFileSync(filePath);
    const iv = encrypted.slice(0, this.initVect);
    const data = encrypted.slice(this.initVect);
    const decipher = Crypto.createDecipheriv(this.algorithm, this.getCipherKey(), iv);
    const result = Buffer.concat([decipher.update(data), decipher.final()]);
    FileSystem.writeFileSync(filePath, result);
  }

  /**
   * @param {string} filePath - A string param
   */
  encrypt(filePath) {
    const iv = Crypto.randomBytes(this.initVect);
    const data = FileSystem.readFileSync(filePath);
    const cipher = Crypto.createCipheriv(this.algorithm, this.getCipherKey(), iv);
    const result = Buffer.concat([iv, cipher.update(data), cipher.final()]);
    FileSystem.writeFileSync(filePath, result);
  }

  getCipherKey() {
    return Crypto.createHash('sha256')
      .update(String(this.password))
      .digest('base64')
      .substr(0, 32);
  }
}

exports.Safe = Safe;
