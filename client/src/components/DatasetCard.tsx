import { FC } from 'react'
import { Card, Col } from 'react-bootstrap'
import { DatasetCardProps } from '@/types/Types'
import Link from 'next/link'
import { Rating } from 'react-simple-star-rating'

const DatasetCard: FC<DatasetCardProps> = ({ id, category, name, rating }) => {
    return (
        <Col xs={6} sm={6} md={4} lg={4} xl={2} className='mb-4'>
            <Link href={`/viewdataset?id=${id}`}>
                <Card>
                    <Card.Header className='pt-3'>
                        <div className={`${category.toLowerCase()}Container pt-4`} />
                    </Card.Header>
                    <Card.Footer className={`pt-4 pb-2 ps-4 ${category.toLowerCase()}Color`}>
                        <div className='nameContainer'>
                            <p>{name}</p>
                        </div>
                        <p className='smalltext'>{category}</p>
                        <Rating className='card-rating' initialValue={rating} allowHover={false} allowFraction size={25} readonly /><br />
                    </Card.Footer>
                </Card>
            </Link>
        </Col >
    )
}

export default DatasetCard