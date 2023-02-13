import { Fragment, useContext } from 'react'
import LoadingComponent from '../components/Loading'
import ReactIf from '../components/ReactIf'
import { GlobalContext } from '../context/globalStateProvider'
import useFilterCategories from '../hooks/useFilterCategories'
import useSortOptions from '../hooks/useSortOptions'

const DatasetStoreHeader = () => {
    const filterCategories = useFilterCategories()
    const sortOptions = useSortOptions()
    const [, dispatch] = useContext(GlobalContext)

    const filterCategoriesToDisplay = filterCategories.categories.map((category: string) => {
        return <button key={category} className='chip' onClick={(): void => dispatch('setDatasetRequestState', { selectedFilter: category })}>{category}</button>
    })

    const sortOptionsToDisplay = sortOptions.options.map((option: string) => {
        return <button key={option} className='chip' onClick={(): void => dispatch('setDatasetRequestState', { selectedSortOption: option })}>{option}</button>
    })

    return (
        <Fragment>
            <ReactIf condition={filterCategories.isLoaded && sortOptions.isLoaded}>
                <div className='jumbotron mt-4 text-center'>
                    <p className='lead text-capitalize'>Filter by Category</p>
                    {filterCategoriesToDisplay}
                    <p className='mt-4 lead text-capitalize'>Sort Datasets</p>
                    {sortOptionsToDisplay}
                    <p className='mt-4 lead text-capitalize'>Displaying 37 datasets</p>
                    <input type='text' placeholder='Search Datasets' className='searchbar-navbar' onChange={(e): void => dispatch('setDatasetRequestState', { searchInput: e.target.value })} />
                </div>
            </ReactIf>
            <ReactIf condition={!filterCategories.isLoaded || !sortOptions.isLoaded}>
                <LoadingComponent />
            </ReactIf>
        </Fragment>
    )
}

export default DatasetStoreHeader