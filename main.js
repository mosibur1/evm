import { ethers } from "ethers";
import fs from "fs/promises";
import readline from "readline";
import log from "./utils/logger.js";
import chalk from "chalk";

function createNewWallet() {
  const wallet = ethers.Wallet.createRandom();

  const walletDetails = {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase,
  };

  log.info("New Ethereum Wallet created Address:", walletDetails.address);

  return walletDetails;
}

// async function saveWalletToFile(walletDetails) {
//   let wallets = [];
//   try {
//     if (await fs.stat("wallets.json").catch(() => false)) {
//       const data = await fs.readFile("wallets.json", "utf8");
//       wallets = JSON.parse(data);
//     }
//   } catch (err) {
//     log.error("Error reading wallets.json:", err);
//   }

//   wallets.push(walletDetails);

//   try {
//     await fs.writeFile("wallets.json", JSON.stringify(wallets, null, 2));
//     log.info("Wallet saved to wallets.json");
//   } catch (err) {
//     log.error("Error writing to wallets.json:", err);
//   }
// }

// Function to ask a question
async function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function autoRegister() {
  console.log(`Tool được phát triển bởi https://t.me/airdrophuntersieutoc`);
  const numberOfWallets = await askQuestion("Số ví muốn tạo: ");
  if (isNaN(numberOfWallets) || numberOfWallets <= 0) {
    log.error("Invalid number of wallets.");
    process.exit(1);
  }
  for (let i = 0; i < numberOfWallets; i++) {
    try {
      log.info(`Create and Registering Wallets: ${i + 1}/${numberOfWallets}`);
      const walletDetails = createNewWallet();
      // saveWalletToFile(walletDetails);
      const data = `\n
Address: ${walletDetails.address}
Private Key: ${walletDetails.privateKey}
Mnemonic: ${walletDetails.mnemonic}
================================================================`;
      await fs.appendFile("wallets.txt", data);
    } catch (error) {
      log.error("Error creating wallet:", error.message);
      return;
    }
  }
  console.log(chalk.green(`Tạo thành công ${numberOfWallets} ví!`));
}

autoRegister();
