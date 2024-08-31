import { useContractRead } from "@starknet-react/core";
import contractAbi from "../abis/abi_erc20.json";

const contractAddress = "0x062a08d750b38d5bef3db3f990ba521c814c56690b475d48754bf2a4e9f2cfe6";

function TotalSupply() {
    // Usando useContractRead para ler o total_supply
    const { data: totalSupplyData, refetch: refetchTotalSupply, isError: totalSupplyIsError, isLoading: totalSupplyIsLoading, error: totalSupplyError } = useContractRead({
        functionName: "total_supply",
        abi: contractAbi,
        address: contractAddress,
        watch: true,
    });

    if (totalSupplyIsLoading) return <div>Loading...</div>;
    if (totalSupplyIsError) return <div>Error: {totalSupplyError?.message}</div>;

    return (
        <div
            className={`p-4 w-full max-w-md m-4 bg-white border-black border`}
        >
            <h3 className="text-2xl font-bold mb-2">Total Supply</h3>
            <p>Balance: {totalSupplyData?.toString()}</p>
            <div className="flex justify-center pt-4">
                <button
                    onClick={() => refetchTotalSupply()}
                    className={`border border-black text-black font-regular py-2 px-4 bg-yellow-300 hover:bg-yellow-500`}
                >
                    Refresh
                </button>
            </div>
        </div>
    );
}

export default TotalSupply;
