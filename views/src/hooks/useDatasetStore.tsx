import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import endPoints from '../constants/Endpoints'
import { UseDataSetStore } from '../types/States'

const useDataSetStore = ({ searchInput, selectedFilter, sortOption }: UseDataSetStore) => {
    const [state, setState] = useState({ fullDataSets: [], filteredDataSets: [], isLoaded: false })
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
                const response = await axios.post(endPoints.datasetStoreEndpoint)
                setState({ ...state, fullDataSets: response.data.datasets, filteredDataSets: response.data.datasets, isLoaded: true })
            }

            catch (error: any) {
                if (error.response.status === 401) {
                    localStorage.removeItem('accessToken')
                    navigate('/')
                }
            }
        })()
    }, [])

    useEffect(() => {
        const filteredDataSets = state.fullDataSets.filter((dataset: any) => dataset.name.toLowerCase().includes(searchInput))
        setState({ ...state, filteredDataSets: filteredDataSets })
    }, [searchInput])

    useEffect(() => {
        if (sortOption === 'alphabetical') {
            const filteredDataSets = state.fullDataSets.sort((a: any, b: any) => {
                if (a.name < b.name) {
                    return -1
                } else if (a.name > b.name) {
                    return 1
                } else {
                    return 0
                }
            })
            setState({ ...state, filteredDataSets: filteredDataSets })
        }

        if (sortOption === 'reverseAlphabetical') {
            const filteredDataSets = state.fullDataSets.sort((a: any, b: any) => {
                if (a.name < b.name) {
                    return 1
                } else if (a.name > b.name) {
                    return -1
                } else {
                    return 0
                }
            })
            setState({ ...state, filteredDataSets: filteredDataSets })
        }

        if (sortOption === 'priceAscending') {
            const filteredDataSets = state.fullDataSets.sort((a: any, b: any) => {
                if (a.price < b.price) {
                    return -1
                } else if (a.price > b.price) {
                    return 1
                } else {
                    return 0
                }
            })
            setState({ ...state, filteredDataSets: filteredDataSets })
        }

        if (sortOption === 'priceDescending') {
            const filteredDataSets = state.fullDataSets.sort((a: any, b: any) => {
                if (a.price < b.price) {
                    return 1
                } else if (a.price > b.price) {
                    return -1
                } else {
                    return 0
                }
            })
            setState({ ...state, filteredDataSets: filteredDataSets })
        }

        if (sortOption === 'freshness') {
            const filteredDataSets = state.fullDataSets.sort((a: any, b: any) => {
                if (a._id < b._id) {
                    return 1
                } else if (a._id > b._id) {
                    return -1
                } else {
                    return 0
                }
            })
            setState({ ...state, filteredDataSets: filteredDataSets })
        }
    }, [sortOption])

    useEffect(() => {
        if (selectedFilter === 'All') {
            const filteredDataSets = state.fullDataSets
            setState({ ...state, filteredDataSets: filteredDataSets })
        }

        else {
            const filteredDataSets = state.fullDataSets.filter((dataset: any) => dataset.category.includes(selectedFilter))
            setState({ ...state, filteredDataSets: filteredDataSets })
        }
    }, [selectedFilter])

    return state
}

export default useDataSetStore