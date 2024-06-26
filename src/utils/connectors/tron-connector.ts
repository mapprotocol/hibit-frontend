
import { InjectedConnector } from 'wagmi/connectors/injected';

import { ethers } from 'ethers';
import { RouteTxData } from '../api/types';
import { showError, showSuccess } from '../notifications';

class TronConnector extends InjectedConnector {
    readonly id = "tron";
    readonly name = 'Tron wallet';
    private walletConnection: any = null;
    constructor() { super(); }

    async connect() {
        if (!window?.tronLink) {
            window.open("https://chromewebstore.google.com/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec")
            return
        }
        let tronWeb;
        if (window.tronLink.ready) {
            tronWeb = window.tronLink.tronWeb;
        } else {
            const res = await window.tronLink.request({ method: 'tron_requestAccounts' });
            if (res.code === 200) {
                tronWeb = window.tronLink.tronWeb;
                this.walletConnection = tronWeb;
                window.location.reload();
            }
        }
        return tronWeb;
    }
    async disconnect(): Promise<void> {         // TronLink doesn't have a disconnect method. This is context-dependent.        
        this.walletConnection = null;
    }
    get isConnected() {
        return window?.tronLink?.tronWeb && window?.tronLink?.tronWeb.defaultAddress.base58;
    }
    get accountId() {
        return window?.tronLink?.tronWeb?.defaultAddress?.base58;
    }
    async getBalance({ token, decimals = 9, format = true }: {
        token: string, decimals?: number, format?: boolean
    }) {
        if (window?.tronLink?.ready) {
            if (token == "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb") {
                const balance = await window?.tronLink?.tronWeb?.trx?.getBalance(this.accountId);
                if (format) {
                    return ethers.utils.formatUnits(balance, 6);
                } return balance;
            }
            const contract = await window?.tronLink?.tronWeb?.contract().at(token);

            const balance = await contract.balanceOf(this.accountId).call();
            if (format) {
                return ethers.utils.formatUnits(balance, 6);
            }
            return balance;
        }
    }

    async approve(token: string, amount: string) {
        if (!this.isConnected) {

            throw new Error("Wallet not connected");
        }
        const contract = await window?.tronLink?.tronWeb?.contract().at(token);
        const result = await contract.approve("TSBDbe1TB8Ft3KZTdbDcZPLFTkL2BFBiZh", amount).send();
        console.log(result, 'result')
        return result;
    }

    async allowance(token: string) {
        if (!this.isConnected) {
            throw new Error("Wallet not connected");
        }
        const contract = await window?.tronLink?.tronWeb?.contract().at(token);
        const allowance = await contract.allowance(this.accountId, "TSBDbe1TB8Ft3KZTdbDcZPLFTkL2BFBiZh").call();
        console.log(allowance, 'allowance')

        return allowance;
    }

    async bridgeToken({ data }: any) {
        const transactions = data.map((item: any) => ({
            to: item.to,
            value: item.value,
            data: item.data,
            args: item.args,
            method: item.method
        }));
        console.log(data)
        for (const txn of transactions) {
            try {
                let functionSelector = txn.method + "("
                txn.args.map((item: any, index: number) => {
                    if (index !== 0)
                        functionSelector += ","
                    functionSelector += item.type

                })
                functionSelector += ")"
                console.log('txn args',txn)
                const preExecResult = await window.tronLink.tronWeb.transactionBuilder.triggerConstantContract(
                    txn.to,
                    functionSelector,
                    {
                        callValue: txn.value,

                    },
                    txn.args,
                    this.accountId // from address            
                );

                if (!preExecResult || !preExecResult.constant_result || preExecResult.constant_result.length === 0) {
                    throw new Error('pre-execute error');
                } console.log('pre-execute result:', preExecResult);

                const unsignedTxn = await window.tronLink.tronWeb.transactionBuilder.triggerSmartContract(
                    txn.to,
                    functionSelector,
                    {
                        callValue: txn.value,
                        feeLimit: 500000000
                    },
                    txn.args,
                    this.accountId // from address        
                );
                console.log("gaslimit:", preExecResult.energy_used ? Math.ceil(preExecResult.energy_used * 1.5) : undefined)
                console.log("unsignedTxn", unsignedTxn)
                const unsignedTxnData = unsignedTxn.transaction;
                if (!unsignedTxnData)
                    throw new Error('triggerSmartContract failed to create transaction');

                const signedTxn = await window.tronLink.tronWeb.trx.sign(unsignedTxnData);

                console.log('Signed Transaction:', signedTxn);

                const receipt = await window.tronLink.tronWeb.trx.sendRawTransaction(signedTxn);
                showSuccess("Success!")
                console.log('Transaction Receipt:', receipt);

            } catch (error) {
                showError("Error while processing transaction: " + error)
                console.error('Error while processing transaction:', error); throw error;
            }
        }
    }
}
export default new TronConnector();

// if (txn.data) {
//     unsignedTxnData.raw_data.contract[0].parameter.value.data = txn.data.startsWith('0x') ? txn.data.slice(2) : txn.data;
// }

// const pb = window.tronLink.tronWeb.utils.transaction.txJsonToPb(unsignedTxnData);

// const txID = window.tronLink.tronWeb.utils.transaction.txPbToTxID(pb);
// const raw_data_hex = window.tronLink.tronWeb.utils.bytes.byteArray2hexStr(pb.getRawData().serializeBinary()).toLowerCase();
// unsignedTxnData.raw_data.contract[0].parameter.value.energyLimit = 1500000000;
// console.log(unsignedTxnData)
// unsignedTxnData.raw_data_hex = raw_data_hex

// unsignedTxnData.txID = txID;