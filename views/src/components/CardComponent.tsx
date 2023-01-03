//Import Statements
import { Card, Col } from 'react-bootstrap'

//Card Component Component
const CardComponent = (props) => {
    return (
        <Col xs={12} sm={12} md={6} lg={6} xl={4} className='mb-4'>
            <Card>
                <Card.Header className='cardhead ps-5 pt-4'>
                    <p className='display-6 fw-bold'>{props.header}</p>
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

//Export Statement
export default CardComponent