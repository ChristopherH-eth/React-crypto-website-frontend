import usePagination from "../hooks/usePagination"

function Pagination(props)
{
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        pageNumber,
        pageSize
    } = props

    const paginationRange = usePagination({
        totalCount,
        pageSize,
        siblingCount,
        pageNumber
    })

    if (pageNumber === 0 || paginationRange.length < 2)
        return null

    const onNext = () => {
        onPageChange(pageNumber + 1)
    }

    const onPrevious = () => {
        onPageChange(pageNumber - 1)
    }

    const DOTS = "..."
    let lastPage = paginationRange[paginationRange.length - 1]

    const paginationBar = paginationRange.map(pageNumber => {
        if (pageNumber === DOTS)
            return <li className="pagination-item--dots"></li>
        
        return (
            <li className="pagination-item" onClick={onPageChange(pageNumber)}>
                {pageNumber}
            </li>
        )
    })

    return (
        <ul className="pagination-container">
            {pageNumber !== 1 && <li className="pagination-item" onClick={onPrevious}>
                <div className="pagination-item--left-arrow" />
            </li>}
            {paginationBar}
            {pageNumber !== lastPage && <li className="pagination-item" onClick={onNext}>
                <div className="pagination-item--right-arrow" />
            </li>}
        </ul>
    )
}

export default Pagination