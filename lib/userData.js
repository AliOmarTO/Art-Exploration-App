import { getToken } from '@/lib/authenticate'

export async function addToFavourites(id) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `JWT ${getToken()}`,
        },
    })

    const data = await res.json()

    if (res.status === 200) {
        return data
    } else {
        return []
    }
}

export async function removeFromFavourites(id) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: `JWT ${getToken()}`,
        },
    })

    const data = await res.json()

    if (res.status === 200) {
        return data
    } else {
        return []
    }
}

export async function getFavourites() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites`
    const res = await fetch(url, {
        headers: {
            Authorization: `JWT ${getToken()}`,
        },
    })

    const data = await res.json()

    if (res.status === 200) {
        return data
    } else {
        return []
    }
}

export async function addToHistory(id) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `JWT ${getToken()}`,
        },
    })

    const data = await res.json()

    if (res.status === 200) {
        return data
    } else {
        return []
    }
}

export async function removeFromHistory(id) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: `JWT ${getToken()}`,
        },
    })

    const data = await res.json()

    if (res.status === 200) {
        return data
    } else {
        return []
    }
}

export async function getHistory() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/history`
    const res = await fetch(url, {
        headers: {
            Authorization: `JWT ${getToken()}`,
        },
    })

    const data = await res.json()

    if (res.status === 200) {
        return data
    } else {
        return []
    }
}
