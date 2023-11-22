import ArtworkCardDetail from '@/components/ArtworkCardDetail'
import { useRouter } from 'next/router'
import { Col, Row } from 'react-bootstrap'

export default function ArtworkById() {
    const router = useRouter()

    return (
        <Row>
            <Col>
                <ArtworkCardDetail objectID={router.query.objectID} />
            </Col>
        </Row>
    )
}
