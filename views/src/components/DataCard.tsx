import { FC } from 'react'
import { Card, Col } from 'react-bootstrap'
import { CardProps } from '../types/Props'

const DataCard: FC<CardProps> = ({ header, body, footer }) => {
    return (
        <Col xs={12} sm={12} md={6} lg={4} xl={3} className='mb-4'>
            <Card>
                <Card.Header className='cardhead pt-4'>
                    {header}
                </Card.Header>
                <Card.Body className='ps-5 pe-5 cardtext'>
                    {body}
                </Card.Body>
                <Card.Footer className='pt-4'>
                    {footer}
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default DataCard