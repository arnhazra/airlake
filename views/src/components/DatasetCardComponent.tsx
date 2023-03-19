import { FC } from 'react'
import { Card, Col } from 'react-bootstrap'
import { DatasetCardProps } from '@/types/Props'
import { useRouter } from 'next/router'

const DatasetCard: FC<DatasetCardProps> = ({ id, category, name, price }) => {
    const router = useRouter()

    const routeToDataset = () => {
        localStorage.removeItem('currentDataset')
        localStorage.setItem('currentDataset', id)
        router.push('/viewdataset')
    }

    return (
        <Col xs={12} sm={12} md={6} lg={4} xl={3} className='mb-4'>
            <Card onClick={routeToDataset}>
                <Card.Header className='pt-3'>
                    <div className={`${category.toLowerCase()}Container pt-4`}>
                    </div>
                </Card.Header>
                <Card.Footer className='pt-4 pb-2 ps-4'>
                    <p className="lead">{name}</p>
                    <p className='smalltext'>{category}</p>
                    <button className='chip'>{price === 0 ? 'FREE' : price + ' FLG'}</button><br />
                </Card.Footer>
            </Card>
        </Col >
    )
}

export default DatasetCard