const { ethers } = require("hardhat");

async function main() {
  // Load contract
  const Contract = await ethers.getContractFactory("IssueCredential");
  const contractAddress = "0x52E12df5Be8Ec1C58aD2E38cC875aaA0f8fF2bdb"; 
  const contract = await Contract.attach(contractAddress);


  const credentialData = {
    issuerName: "issuerName",
    studentId: "studentId",
    ipfsHash: "ipfsHash",
  };

  // Measure execution time
  const startTime = Date.now();

  // Perform transaction to store credential
  const tx = await contract.storeCredential(
    credentialData.issuerName,
    credentialData.studentId,
    credentialData.ipfsHash
  );

  // Wait for transaction to be mined
  await tx.wait();

  const endTime = Date.now();
  const executionTime = endTime - startTime; 

  console.log(`Issuance Time: ${executionTime} milliseconds`);

  // Get gas price
  const gasPrice = (await ethers.provider.getFeeData()).gasPrice

  // Get gas used from transaction receipt
  const receipt = await tx.wait();
  const gasUsed = receipt.gasUsed;

  const totalGasCost = gasUsed * gasPrice;

  console.log(`Gas Cost: ${totalGasCost.toString()} Wei`);
  console.log(`Gas Cost (converted to Ether): ${ethers.formatEther(totalGasCost)} ETH`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
