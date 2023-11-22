import { getToken } from '@/lib/authenticate'

export async function addToFavourites(id) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        Authorization: `JWT ${getToken()}`,
    })

    const data = await res.json()

    if (res.status === 200) {
        return data
    } else {
        return []
    }
}

export async function removeFromFavourites(id) {}

export async function getFavourites() {}

export async function addToHistory(id) {}

export async function removeFromHistory(id) {}

export async function getHistory() {}
