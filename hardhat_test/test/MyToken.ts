import hre from "hardhat";
import { expect } from "chai";
import { MyToken } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";


describe("myToken deploy", () => {
    let myTokenC: MyToken;
    let signer: HardhatEthersSigner;
    before("should deploy", async () => {
        myTokenC = await hre.ethers.deployContract("MyToken", [
            "MyToken",
            "MT",
            18, 
        ]);
    });
    it("should return name", async () => {
        expect(await myTokenC.name()).to.equal("MyToken");
    });
    it("should return symbol", async () => {
        expect(await myTokenC.symbol()).to.equal("MT");
    }); 
    it("should return decimals", async () => {
        expect(await myTokenC.decimals()).to.equal(18);
    });
    it("should return 0 totalSupply", async () => {
        expect(await myTokenC.totalSupply()).to.equal(0);
    });
    it("should return 0 balanceOf for signer 0", async () => {
        const [signer0] = await hre.ethers.getSigners();
        expect(await myTokenC.balanceOf(signer0)).to.equal(0);
    });
})  