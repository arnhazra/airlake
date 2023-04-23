import { AccordionProps } from '@/types/Types'
import { FC } from 'react'
import { Accordion } from 'react-bootstrap'

const DataAccordion: FC<AccordionProps> = ({ header, body, eventKey }) => {
    return (
        <Accordion defaultActiveKey={'0'}>
            <Accordion.Item eventKey={eventKey}>
                <Accordion.Header>{header}</Accordion.Header>
                <Accordion.Body>
                    {body}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default DataAccordion