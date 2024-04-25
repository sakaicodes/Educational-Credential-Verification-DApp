const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VerifyModule", (m) => {

  const VerifyContract = m.contract("VerifyCredential", ["0x5FbDB2315678afecb367f032d93F642f64180aa3"], {
  });

  return { VerifyContract };
});
