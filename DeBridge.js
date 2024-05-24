	const { formatEther } = require("ethers/lib/utils");
 
async function quote(params) {
    const response = await fetch('https://api.dln.trade/v1.0/dln/quote?' + new URLSearchParams(params));
    const data = await response.json();
    if (data.errorCode) throw new Error(data.errorId)
    return data
}
 
async function main() {
    console.log("Trading 1 ETH from Ethereum to BNB...")
    const { estimation } = await quote({
        srcChainId: 1,
        srcChainTokenIn: '0x0000000000000000000000000000000000000000',
        srcChainTokenInAmount: '1000000000000000000',
        dstChainTokenOutAmount: '0',
        dstChainId: 56,
        dstChainTokenOut: '0x0000000000000000000000000000000000000000',
        prependOperatingExpenses: true
    });
    const minOutcome = estimation.dstChainTokenOut.amount;
    const minOutcomeWithoutDecimals = formatEther(minOutcome)
    console.log(`Expected outcome: ${minOutcomeWithoutDecimals} BNB`)
}
 
main().catch(err => console.error(err))
