import { FC } from 'react'
import { Card, Col } from 'react-bootstrap'
import { DatasetCardProps } from '@/types/Types'
import Link from 'next/link'

const DatasetCard: FC<DatasetCardProps> = ({ id, category, name, price }) => {
    return (
        <Col xs={6} sm={6} md={4} lg={3} xl={2} className='mb-4'>
            <Link href={`/viewdataset?id=${id}`}>
                <Card>
                    <Card.Header className='pt-3'>
                        <div className={`${category.toLowerCase()}Container pt-4`} />
                    </Card.Header>
                    <Card.Footer className={`pt-4 pb-2 ps-4 ${category.toLowerCase()}Color`}>
                        <div className='nameContainer'>
                            <p className="lead">{name}</p>
                        </div>
                        <p className='smalltext'>{category}</p>
                    </Card.Footer>
                </Card>
            </Link>
        </Col >
    )
}

export default DatasetCard