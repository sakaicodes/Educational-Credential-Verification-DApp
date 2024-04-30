const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VerifyModule", (m) => {

  const VerifyContract = m.contract("VerifyCredential", ["0x5fbdb2315678afecb367f032d93f642f64180aa3"], {
  });

  return { VerifyContract };
});
