const argv = require('yargs').argv;
const config = require('dotenv').config;
const Safe = require('./safe').Safe;

config();

if (!argv.encrypt) {
  process.stderr.write('Action not set. Please set the Encrypt Flag to true or False');
  process.exit(9);
}

const encrypt = JSON.parse(argv.encrypt);
const action = encrypt ? 'encrypted' : 'decrypted';
const files = ['./apps/api/src/assets/projectmast.json'];
const invct = 16;
const pass = argv.password ? argv.password : process.env.ENCRYPT_PASS;

if (files.length < 1) {
  process.stderr.write(`Files List empty. No file were ${action}`);
  process.exit(1);
}

if (!pass) {
  process.stderr.write('Now encryptions Password was provided. Please set Password flag or ENCRYPT_PASS env var.');
  process.exit(9);
}

const safe = new Safe(pass, invct);

files.forEach(file => {
  if (encrypt) {
    safe.encrypt(file);
  } else {
    safe.decrypt(file);
  }

  process.stdout.write(`${file} was ${action}\n`);
});

process.stdout.write(`All Files have been ${action}. Process completed`);
process.exit(0);
