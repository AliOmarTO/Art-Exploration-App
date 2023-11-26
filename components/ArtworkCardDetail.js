import useSWR from 'swr'
import Error from 'next/error'
import { Card, Button } from 'react-bootstrap'
import { useAtom } from 'jotai'
import { favouritesAtom } from '@/store'
import { useState } from 'react'
import { addToFavourites, removeFromFavourites } from '@/lib/userData'

export default function ArtworkCardDetail({ objectID }) {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
    const [showAdded, setShowAdded] = useState(false)

    useEffect(() => {
        setShowAdded(favouritesList?.includes(objectID))
    }, [favouritesList])

    async function favouritesClicked() {
        if (showAdded) {
            setFavouritesList(await removeFromFavourites(objectID))
            setShowAdded(false)
        } else {
            setFavouritesList(await addToFavourites(objectID))
            setShowAdded(true)
        }
        console.log(favouritesList)
    }

    const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null)
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
                src={data.primaryImage ? data.primaryImage : 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'}
            />
            <Card.Body>
                <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
                <Card.Text>
                    <strong>Date: </strong>
                    {data.objectDate || 'N/A'}
                    <br />
                    <strong>Classification: </strong>
                    {data.classification || 'N/A'}
                    <br />
                    <strong>Medium: </strong>
                    {data.medium || 'N/A'}
                    <br />
                    <strong>Artist</strong> {data.artistDisplayName || 'N/A'}
                    <br />
                    <br />
                    <strong>credit Line: </strong>
                    {data.creditLine || 'N/A'}
                    <br />
                    <strong>Dimensions: </strong>
                    {data.dimensions || 'N/A'}
                    <br />
                    <Button variant={showAdded ? 'primary' : 'outline-primary'} onClick={favouritesClicked}>
                        {showAdded ? '+ Favourite (added)' : '+ Favourite'}
                    </Button>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
