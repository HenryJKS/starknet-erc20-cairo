import {
    useAccount,
    useBalance,
    useContract,
    useContractWrite,
    useExplorer,
    useWaitForTransaction,
} from "@starknet-react/core";
import { useMemo, useState } from "react";
import contractAbi from "../abis/abi_erc20.json";

function Transfer() {
    const contractAddress = "0x062a08d750b38d5bef3db3f990ba521c814c56690b475d48754bf2a4e9f2cfe6";

    const { address: userAddress } = useAccount();

    const {
        isLoading: balanceIsLoading,
        isError: balanceIsError,
        error: balanceError,
        data: balanceData,
    } = useBalance({
        address: userAddress,
        watch: true,
    });

    const [amount, setAmount] = useState(0);
    const [to, setTo] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Form submitted with amount ", amount);
        writeAsync();
    };

    const { contract } = useContract({
        abi: contractAbi,
        address: contractAddress,
    });

    const calls = useMemo(() => {
        if (!userAddress || !contract || !to) return [];

        // Certifique-se de que o endereço 'to' está em um formato correto e converta para BigInt
        const toAddressBigInt = BigInt(to);

        return contract.populateTransaction["transfer"]!(
            toAddressBigInt, // Destinatário convertido para BigInt
            {
                low: amount ? amount : 0,
                high: 0,
            }
        );
    }, [contract, userAddress, to, amount]);

    const {
        writeAsync,
        data: writeData,
        isPending: writeIsPending,
    } = useContractWrite({
        calls,
    });

    const explorer = useExplorer();
    const {
        isLoading: waitIsLoading,
        isError: waitIsError,
        error: waitError,
        data: waitData,
    } = useWaitForTransaction({
        hash: writeData?.transaction_hash,
        watch: true,
    });

    const LoadingState = ({ message }: { message: string }) => (
        <div className="flex items-center space-x-2">
            <div className="animate-spin">
                <svg
                    className="h-5 w-5 text-gray-800"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                </svg>
            </div>
            <span>{message}</span>
        </div>
    );

    const buttonContent = () => {
        if (writeIsPending) {
            return <LoadingState message="Send..." />;
        }

        if (waitIsLoading) {
            return <LoadingState message="Waiting for confirmation..." />;
        }

        if (waitData && waitData.status === "REJECTED") {
            return <LoadingState message="Transaction rejected..." />;
        }

        if (waitData) {
            return "Transaction confirmed";
        }

        return "Send";
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    To:
                    <input
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />
                </label>
                <label>
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                    />
                </label>
                <button type="submit">{buttonContent()}</button>
            </form>
        </div>
    );
}

export default Transfer;
