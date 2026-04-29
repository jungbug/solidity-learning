import hre from "hardhat";
import { expect } from "chai";
import { DECIMALS, MINTING_AMOUNT } from "./constant";
import { MyToken, TinyBank } from "../ignition/modules/MyToken";
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
            DECIMALS,
            MINTING_AMOUNT,
        ]);
        tinyBankC = await hre.ethers.deployContract("TinyBank", [
            await myTokenC.getAddress()
        ]);
    })

    describe("Initialized state check", () => {
        it("should return 0 totalStaked", async () => {
            expect(await tinyBankC.totalstaked()).equal(0)
        });
        it("should return staked 0 amount of signer 0", async () => {
            const signer0 = signers[0];
            expect(await tinyBankC.stakedAmount(signer0.address)).equal(0);
        });
    })

    describe("Staking", () => {
        it("should return staked amount", async () => {
            const signer0 = signers[0];
            const stakingAmount = hre.ethers.parseUnits("50", DECIMALS);
            await myTokenC.approve(tinyBankC, stakingAmount);
            await tinyBankC.stake(stakingAmount);
            expect(await tinyBankC.staked(signer0.address)).equal(stakingAmount);
            expect(await myTokenC.balanceOf(tinyBankC)).equal(await tinyBankC.totalStaked());
            expect(await myTokenC.balanceOf(tinyBankC)).equal(await tinyBankC.totalStaked());
        });
    });

    describe("Withdraw", () => {
        it("should return 0 staked after withdrawing total token", async () => {
            const signer0 = signers[0];
            const stakingAmount = hre.ethers.parseUnits("50", DECIMALS);
            await myTokenC.approve(tinyBankC, stakingAmount);
            await tinyBankC.stake(stakingAmount);
            await tinyBankC.withdraw(stakingAmount);
            expect(await tinyBankC.staked(signer0.address)).equal(0);
        }
        );
    })

});
