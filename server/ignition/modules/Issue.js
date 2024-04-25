const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("IssueModule", (m) => {

  const IssueCredential = m.contract("IssueCredential", [], {
  });

  return { IssueCredential };
});
