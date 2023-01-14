import { Card, Col } from 'react-bootstrap'

const CardComponent = (props: any) => {
    return (
        <Col xs={12} sm={12} md={6} lg={6} xl={4} className='mb-4'>
            <Card>
                <Card.Header className='cardhead ps-5 pt-4'>
                    {props.header}
                </Card.Header>
                <Card.Body className='ps-5 pe-5 cardtext'>
                    {props.body}
                </Card.Body>
                <Card.Footer className='pt-4'>
                    {props.footer}
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default CardComponent