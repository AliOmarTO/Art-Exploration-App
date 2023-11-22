import { useRouter } from 'next/router'
import { Card, ListGroup, Button } from 'react-bootstrap'
import { useAtom } from 'jotai'
import { searchHistoryAtom } from '@/store'
import styles from '@/styles/History.module.css'
import { setLazyProp } from 'next/dist/server/api-utils'

export default function History() {
    const router = useRouter()
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    let parsedHistory = []
    console.log(searchHistory)

    searchHistory.forEach((h) => {
        let params = new URLSearchParams(h)
        let entries = params.entries()
        parsedHistory.push(Object.fromEntries(entries))
    })

    function historyClicked(e, index) {
        router.push(`/artwork?${searchHistory[index]}`)
    }

    function removeHistoryClicked(e, index) {
        e.stopPropagation()
        setSearchHistory((current) => {
            let x = [...current]
            x.splice(index, 1)
            return x
        })
    }

    return (
        <>
            {!parsedHistory ? (
                <Card>
                    <h4>Nothing Here</h4>
                    Try searching for some artwork.
                </Card>
            ) : (
                <ListGroup>
                    {parsedHistory.map((historyItem, index) => (
                        <ListGroup.Item className={styles.historyListItem} onClick={(e) => historyClicked(e, index)} key={index}>
                            {Object.keys(historyItem).map((key) => (
                                <>
                                    {key}: <strong>{historyItem[key]}</strong>&nbsp;
                                </>
                            ))}
                            <Button className="float-end" variant="danger" size="sm" onClick={(e) => removeHistoryClicked(e, index)}>
                                &times;
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </>
    )
}
