import usePagination from "../hooks/usePagination"

/**
 * @file Pagination.js
 * @author 0xChristopher
 * @brief This file is responsible for the Pagination module of the cryptocurrency website.
 */

/**
 * @brief The Pagination() function creates Pagination module to be displayed in the Main module.
 * @param props The properties passed into the pagination module
 * @return Returns the constructed module
 */
function Pagination(props)
{
    // Set variables to prop values
    const {
        onPageChange,
        totalCount,
        siblingCount = 2,
        pageNumber,
        pageSize,
        maxPages
    } = props

    // Pass variables into usePagination hook
    const paginationRange = usePagination({
        totalCount,
        pageSize,
        siblingCount,
        pageNumber,
        maxPages
    })

    // Check if pagination is necessary; if not, return null
    if (pageNumber === 0 || paginationRange.length < 2)
        return null

    /**
     * @brief The onNext() function pointer references a positive change in the onPageChange() function,
     *      incrementing the current page number.
     */
    const onNext = () => {
        onPageChange(pageNumber + 1)
    }

    /**
     * @brief The onPrevious() function pointer references a negative change in the onPageChange() function,
     *      decrementing the current page number.
     */
    const onPrevious = () => {
        onPageChange(pageNumber - 1)
    }

    const DOTS = "..."                                                                  // Placeholder for ellipsis
    let lastPage = Math.min(paginationRange[paginationRange.length - 1], maxPages)      // Last page based on range of pagination

    // Create the pagination bar
    const paginationBar = paginationRange.map((pageNumber, index) => {
        // Set ellipsis where necessary (see hook for details)
        if (pageNumber === DOTS)
            return <li className="pagination-item--dots" key={index}>&#8230;</li>
        
        return (
            // Return each list item based on their index; add 'selected' class to the current page
            <li className={`pagination-item ${pageNumber === props.pageNumber ? "pagination--selected" : ""}`} 
                key={index} 
                onClick={() => onPageChange(pageNumber)}
            >
                {pageNumber}
            </li>
        )
    })

    return (
        <ul className="pagination-container">
            {/* Left Arrow */}
            {pageNumber !== 1 && <li className="pagination-item" onClick={onPrevious}>
                <div className="pagination-item--left-arrow">&lt;</div>
            </li>}
            {paginationBar}
            {/* Right Arrow */}
            {pageNumber !== lastPage && <li className="pagination-item" onClick={onNext}>
                <div className="pagination-item--right-arrow">&gt;</div>
            </li>}
        </ul>
    )
}

export default Pagination