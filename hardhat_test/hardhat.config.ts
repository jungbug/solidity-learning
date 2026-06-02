import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-vyper";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  vyper: {
    version: "0.4.0",
  },
  networks: {
    kairos: {
      url: "https://public-en-kairos.node.kaia.io",
      accounts: ["0x82628c3eb1f3fc245986fa976863f4f501045c3fcca57ef571656911d3220469"],
    }
  },
  sourcify: {
    enabled: true,
  },
  etherscan: {
      apiKey: {
        kairos: "unnecessary",
      },
      customChains: [
        {
          network: "kairos",
          chainId: 1001,
          urls: {
            apiURL: "https://compiler-api-v2.kaiascan.io/kairos/hardhat-verify",
            browserURL: "https://kairos.kaiascan.io",
          }
        },
      ]
    }
};

export default config;
