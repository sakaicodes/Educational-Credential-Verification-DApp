const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VerifyModule", (m) => {

  const VerifyContract = m.contract("VerifyCredential", ["0x52E12df5Be8Ec1C58aD2E38cC875aaA0f8fF2bdb"], {
  });

  return { VerifyContract };
});
