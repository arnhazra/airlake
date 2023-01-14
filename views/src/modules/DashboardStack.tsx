import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CardComponent from '../components/CardComponent'
import Constants from '../constants/Constants'

export const DashboardStack = ({ auth, liveprice }: any) => {
    return (
        <Row className='mt-4 mb-4'>
            <CardComponent
                key={'userinfo'}
                header={
                    <Row>
                        <Col>
                            <p className='display-6 fw-bold'>Hi, {auth.name.split(' ')[0]}</p>
                        </Col>
                        <Col style={{ textAlign: 'end' }}>
                            <button className='btn livebutton'>LIVE</button>
                        </Col>
                    </Row>
                }
                body={
                    <div key={'liveprice'}>
                        <p>1 <i className="fa-brands fa-ethereum"></i> = ₹ {liveprice.inr}, 1 FLG = ₹ {(liveprice.inr / 100000).toFixed(3)}</p>
                        <p>1 <i className="fa-brands fa-ethereum"></i> = $ {liveprice.usd}, 1 FLG = $ {(liveprice.usd / 100000).toFixed(3)}</p>
                        <p>1 <i className="fa-brands fa-ethereum"></i> = € {liveprice.eur}, 1 FLG = € {(liveprice.eur / 100000).toFixed(3)}</p>
                    </div>
                }
                footer={<Link key={'userinfo'} to='/wallet/buy' className='btn'>Buy FLG<i className='fa-solid fa-circle-arrow-right'></i></Link>}
            />
            <CardComponent
                key={'info'}
                header={<p className='display-6 fw-bold'>Info</p>}
                body={[<div key={'info'}><p>{Constants.Info}</p></div>]}
                footer={[<Link key={'info'} to='/wallet/sell' className='btn'>Sell FLG<i className='fa-solid fa-circle-arrow-right'></i></Link>]}
            />
            <CardComponent
                key={'warning'}
                header={<p className='display-6 fw-bold'>Warning<i className='fa-solid fa-triangle-exclamation'></i></p>}
                body={[<div key={'warning'} className='warning'><p>{Constants.Warning}</p></div>]}
                footer={[<a key={'warning'} target='_blank' rel='noopener noreferrer' href='https://goerli-faucet.pk910.de/' className='btn'>Mine ETH<i className='fa-solid fa-circle-arrow-right'></i></a>]}
            />
        </Row>
    )
}
