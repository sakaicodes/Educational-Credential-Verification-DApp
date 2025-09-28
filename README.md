# EduTrust

EduTrust is a decentralized educational credential verification portal that allows educational institutions to securely store credentials using decentralized storage (IPFS) and store credential references on the blockchain. EduTrust also supports verification for employers and academic institutions through this secure, immutable platform. This project includes a React.js frontend client and a backend utilizing Solidity smart contracts and the Hardhat framework.

## Project Setup

1. The project requires you to have a blockchain wallet (preferably MetaMask) set up and installed on a Chrome-like browser: https://metamask.io/

2. The project requires you to have a decentralized storage account (Recommended: Pinata):
   https://pinata.cloud/

3. The project requires a smart contract development framework. This project utilizes Hardhat but can be modified to use Ganache and Truffle.

## Running the Project

### Step 1: Configure Environment
Modify the `.env` file to include decentralized storage API configuration details.

### Step 2: Start the Frontend
```bash
cd client
npm run start
```

### Step 3: Start Hardhat Local Network
From the root directory in a separate terminal:
```bash
cd server
npx hardhat node
```
Note: After starting the Hardhat node, you will see a list of generated accounts with their addresses and private keys. Copy one of these account addresses and import it into MetaMask to have test ETH available for transactions on the local network.

### Step 4: Clean and Compile
In another terminal:
```bash
npx hardhat clean
npx hardhat compile
```

### Step 5: Deploy Smart Contracts
The order of deployment is important. Deployment of the smart contract returns an address of the deployed contract. It is important to record these addresses and store them in the `.env.local` file. This .env.local file should be in the src folder.

#### Deploy Issuing Smart Contract
```bash
npx hardhat ignition deploy ./ignition/modules/Issue.js --network localhost --reset
```

#### Deploy Verification Smart Contract
```bash
npx hardhat ignition deploy ./ignition/modules/Verify.js --network localhost --reset
```
Note: Include the issue crdential smart contract address in the Verify module before deployment.

### Step 6: Copy Artifacts
Copy the `artifacts` folder from the `server` directory into the `client/src` folder. This is the current workaround for integrating the frontend and backend, as APIs have not been implemented and are currently in development.


## User Access Control (RBAC)

EduTrust implements Role-Based Access Control (RBAC) to ensure proper permissions and security. The system defines three user types with specific access permissions (App.js):

``` javascript
export const USER_TYPES = {
  ISSUER: 'Issuer',
  VERIFIER: 'Verifier',
  ADMIN: "Admin"
}

export const CURRENT_USER = USER_TYPES.ADMIN

```

User Roles and Permissions

* Issuer: Educational institutions with permission to issue credentials only. They can create and store new educational credentials on the blockchain.
* Verifier: Employers and academic institutions with permission to verify credentials only. They can authenticate and validate existing credentials but cannot issue new ones.
* Admin: System administrators with full access to both issue and verify credentials. They have complete control over the platform's functionality.

Configuring User Type
To change the current user type, modify the CURRENT_USER constant in your configuration file. Set it to one of the available USER_TYPES based on your role in the system.

## Issuing a Credential

Navigate to the Issuer portal.
1. Upload the credential that you want to issue. This stores the image in decentralized storage (Pinata). It returns an IPFS hash which is a reference to the image. This allows you to access the image from an IPFS node given this hash.

2. Copy this hash and paste it into the issuer form which is located directly next to the upload card. Write the institution name (e.g., Newcastle University) as well as the student ID for the given credential.

3. You can view a log of this uploaded credential on the dashboard page.

## Verifying a Credential

1. Navigate to the Verifier portal.
2. Enter a credential ID.
3. If a credential ID can be found (i.e., is valid), the credential will be returned to you as well as verification details on the issuer and candidate.