import { useState, useEffect } from 'react'
import Web3 from 'web3'
import contractAddress from '../constants/Address'
import { tokenABI } from '../contracts/TokenABI'
const web3 = new Web3(Web3.givenProvider)

function App() {
    const [fromAccount, setFromAccount] = useState('')
    const [toAccount, setToAccount] = useState('')
    const [amount, setAmount] = useState('')
    const [status, setStatus] = useState('')

    useEffect(() => {
        async function loadAccounts() {
            const accounts = await web3.eth.getAccounts()
            setFromAccount(accounts[0])
        }
        loadAccounts()
    }, [])

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        const contract = new web3.eth.Contract(tokenABI as any, contractAddress.tokenContractAddress)
        const result = await contract.methods.transfer(toAccount, web3.utils.toWei(amount, 'ether'))
            .send({ from: fromAccount })
        setStatus(`Transaction Hash: ${result.transactionHash}`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fromAccount">From Account:</label>
                    <input type="text" id="fromAccount" value={fromAccount} readOnly />
                </div>
                <div>
                    <label htmlFor="toAccount">To Account:</label>
                    <input type="text" id="toAccount" value={toAccount} onChange={e => setToAccount(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input type="text" id="amount" value={amount} onChange={e => setAmount(e.target.value)} />
                </div>
                <button type="submit">Transfer</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    )
}

export default App
