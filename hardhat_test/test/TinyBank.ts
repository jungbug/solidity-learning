import hre from "hardhat";
import { expect } from "chai";
import {MyToken, TinyBank} from "../ignition/modules/MyToken";
import { HardhatEtherSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("TinyBank", () => {
    let signers: HardhatEtherSigner[];
    let myTokenC: MyToken;
    let tinyBankC: TinyBank;
    beforeEach(async () => {
        signers = await hre.ethers.getSigners();
        myTokenC = await hre.ethers.deployContract("MyToken", [
            "MyToken",
            "MT",
            decimals,
            mintingAmount,
        ]);
        tinyBankC = await hre.ethers.deployContract("TinyBank", [
            await myTokenC.getAddress()
        ]);
    })  

    describe("Initialized state check", () => {
        it ("should return 0 totalStacked", async () => {
            expect(await tinyBankC.totalStacked()).equal(0)
        });
        it ("should return stacked 0 amount of signer 0", async () => {
            // const [signer0] = await hre.ethers.getSigners();
            const signer0 = signers[0];
            expect(await tinyBankC.stackedAmount(signer0.address)).equal(0);
        });
    })

    describe("Staking", () => {
        it("should return staked amount", async () => {
            const signer0 = signers[0];
            const stakingAmount = hre.ethers.parseUnits("50", decimals);
            await myTokenC.approve(tinyBankC, stakingAmount);
            await tinyBankC.stake(stakingAmount);
            expect(await tinyBankC.staked(signer0.address)).equal(stakingAmount);
            expect(await myTokenC.balanceOf(tinyBankC)).equal(await tinyBankC.totalStacked());
            expect(await myTokenC.balanceOf(tinyBankC)).equal(await tinyBankC.totalStacked());
        });
    });
});
