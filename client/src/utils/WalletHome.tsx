import React, { FC, Fragment, useContext, useEffect, useState } from 'react'
import endPoints from '@/constants/Endpoints'
import Link from 'next/link'
import { GlobalContext } from '@/context/globalStateProvider'
import Web3 from 'web3'
import { tokenABI } from '@/contracts/LFTABI'
import { toast } from 'react-hot-toast'
import Constants from '@/constants/Constants'
import contractAddress from '@/constants/Address'
import Show from '@/components/Show'
import Loading from '@/components/Loading'

interface WalletHomeProps {
    onButtonClick: () => void
}

const WalletHome: FC<WalletHomeProps> = ({ onButtonClick }) => {
    const web3Provider = new Web3(endPoints.infuraEndpoint)
    const [{ userState }] = useContext(GlobalContext)
    const [etherBalance, setEther] = useState('0')
    const [lftBalance, setLft] = useState('0')
    const [loading, setLoading] = useState(true)
    const [accountAddress, setAccountAddress] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const { privateKey } = userState
                const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
                setAccountAddress(walletAddress)
                const ethBalanceInWei = await web3Provider.eth.getBalance(walletAddress)
                const ethBalance = web3Provider.utils.fromWei(ethBalanceInWei, 'ether')
                setEther(ethBalance)
                const lftContract = new web3Provider.eth.Contract(tokenABI as any, contractAddress.tokenContractAddress)
                let lftBalance = '0'
                lftContract.methods.balanceOf(walletAddress).call((error: any, balance: any) => {
                    if (error) {
                        toast.error(Constants.ErrorMessage)
                    } else {
                        lftBalance = web3Provider.utils.fromWei(balance, 'ether')
                        setLft(lftBalance)
                    }
                })
                setLoading(false)
            } catch (error) {
                setLoading(false)
                toast.error(Constants.ErrorMessage)
            }
        })()
    }, [userState])

    return (
        <Fragment>
            <Show when={!loading}>
                <div className='box'>
                    <p className='branding'>Wallet</p>
                    <div className='text-center'>
                        <p className='lead'><i className='fa-solid fa-circle-check' title='Live'></i>Sepolia Testnet</p>
                        <p className='lead'>Wallet Address</p>
                        <p className='lead'>{accountAddress}</p>
                        <h4><i className='fa-brands fa-ethereum'></i>{Number(etherBalance).toFixed(2)} ETH</h4>
                        <h4><i className='fa-solid fa-certificate'></i>{Number(lftBalance).toFixed(0)} LFT</h4>
                        <button className='btn btn-block' onClick={onButtonClick}>Open LFT Swap <i className='fa-solid fa-circle-arrow-right'></i></button>
                        <Link href={'/transactions'}>Transactions</Link><br />
                        <Link href={'https://sepoliafaucet.com/'} passHref target='_blank'>Click Here to Get Some Test ETH</Link>
                    </div>
                </div>
            </Show>
            <Show when={loading}>
                <Loading />
            </Show>
        </Fragment >
    )
}

export default WalletHome