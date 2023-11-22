import useSWR from 'swr'
import Error from 'next/error'
import { Card, Button } from 'react-bootstrap'
import Link from 'next/link'

export default function ArtworkCard({ objectID }) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
    if (!data) {
        return null
    } else {
        if (error) {
            return <Error statusCode={404} />
        }
    }
    return (
        <Card>
            <Card.Img
                variant="top"
                src={data.primaryImageSmall ? data.primaryImageSmall : 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'}
            />
            <Card.Body>
                <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
                <Card.Text>
                    {data.objectDate && data.classification && data.medium
                        ? data.objectDate + ' ' + data.classification + ' ' + data.medium
                        : 'N/A'}
                </Card.Text>
                <Link href={`/artwork/${data.objectID}`} passHref legacyBehavior>
                    <Button variant="primary">{data.objectID}</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}
