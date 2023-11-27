import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { isAuthenticated } from '@/lib/authenticate'
import { getFavourites, getHistory } from '@/lib/userData'
import { useAtom } from 'jotai'
import { favouritesAtom, searchHistoryAtom } from '@/store'

const PUBLIC_PATHS = ['/register', '/login', '/', '/_error']

export default function RouteGuard(props) {
    const router = useRouter()
    const [authorized, setAuthorized] = useState(false)
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

    function authCheck(url) {
        const path = url.split('?')[0]
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false)
            router.push('/login')
        } else {
            setAuthorized(true)
        }
    }

    async function updateAtoms() {
        setFavouritesList(await getFavourites())
        setSearchHistory(await getHistory())
    }

    useEffect(() => {
        updateAtoms()
        // on initial load - run auth check
        authCheck(router.pathname)

        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeComplete', authCheck)
        }
    }, [])

    return <>{authorized && props.children}</>
}
