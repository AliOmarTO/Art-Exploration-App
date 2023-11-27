import { useRouter } from 'next/router'
import { Card, ListGroup, Button } from 'react-bootstrap'
import { useAtom } from 'jotai'
import { searchHistoryAtom } from '@/store'
import styles from '@/styles/History.module.css'
import { setLazyProp } from 'next/dist/server/api-utils'
import { removeFromHistory } from '@/lib/userData'

export default function History() {
    const router = useRouter()
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    let parsedHistory = []
    console.log(searchHistory)
    if (!searchHistory) return null

    searchHistory.forEach((h) => {
        let params = new URLSearchParams(h)
        let entries = params.entries()
        parsedHistory.push(Object.fromEntries(entries))
    })

    function historyClicked(e, index) {
        router.push(`/artwork?${searchHistory[index]}`)
    }

    async function removeHistoryClicked(e, index) {
        e.stopPropagation()
        setSearchHistory(await removeFromHistory(searchHistory[index]))
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
