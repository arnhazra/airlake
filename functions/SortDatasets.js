const sortDatasets = (datasets, sortLogic) => {
    let sortedDatasets = []
    switch (sortLogic) {
        case 'nameAscending':
            sortedDatasets = datasets.sort((a, b) => a.name.localeCompare(b.name))
            break;

        case 'nameDescending':
            sortedDatasets = datasets.sort((a, b) => b.name.localeCompare(a.name));
            break;

        case 'priceAscending':
            sortedDatasets = datasets.sort((a, b) => a.price - b.price)
            break;

        case 'priceDescending':
            sortedDatasets = datasets.sort((a, b) => b.price - a.price)
            break;

        case 'freshness':
            sortedDatasets = datasets
            break;

        default:
            sortedDatasets = datasets
            break;
    }

    return sortedDatasets
}

module.exports = sortDatasets