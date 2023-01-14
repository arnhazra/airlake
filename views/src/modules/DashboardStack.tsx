import { Col, Row, Table } from 'react-bootstrap'
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
                        <Table responsive hover variant='light'>
                            <thead>
                                <tr>
                                    <th>Crypto</th>
                                    <th>INR</th>
                                    <th>USD</th>
                                    <th>EUR</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ETH</td>
                                    <td>{liveprice.inr}</td>
                                    <td>{liveprice.usd}</td>
                                    <td>{liveprice.eur}</td>
                                </tr>
                                <tr>
                                    <td>FLG</td>
                                    < td > {(liveprice.inr / 100000).toFixed(3)}</td>
                                    <td>{(liveprice.usd / 100000).toFixed(3)}</td>
                                    <td>{(liveprice.eur / 100000).toFixed(3)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                }
                footer={<Link key={'userinfo'} to='/wallet/buy' className='btn'>Buy FLG<i className='fa-solid fa-circle-arrow-right'></i></Link>}
            />
            <CardComponent
                key={'info'}
                header={<p className='display-6 fw-bold'>Info <i className='fa-solid fa-triangle-exclamation'></i></p>}
                body={[<div key={'info'}><p>{Constants.Info}</p> <p>{Constants.Warning}</p></div>]}
                footer={[<Link key={'info'} to='/wallet/sell' className='btn'>Sell FLG<i className='fa-solid fa-circle-arrow-right'></i></Link>]}
            />
        </Row>
    )
}
