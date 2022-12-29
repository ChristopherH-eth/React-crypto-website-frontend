import React from "react"

/**
 * @file usePagination.js
 * @author 0xChristopher
 * @brief This file is responsible for the Pagination hook of the cryptocurrency website.
 */

/**
 * @brief The range() function takes in a start and end value, processes the length of the range, and 
 *      creates an array.
 * @param start The starting value
 * @param end The ending value
 * @return Returns a iterable range in the from of an array
 */
function range(start, end)
{
    let length = end - start + 1

    return Array.from({length}, (_, index) => index + start)
}

/**
 * @brief usePagination hook definition
 * @return Returns the pagination range
 */
const usePagination = ({
    totalCount,
    pageSize,
    siblingCount,
    pageNumber,
    maxPages
}) => {
    const paginationRange = React.useMemo(() => {
        const totalPageCount = Math.min(Math.ceil(totalCount / pageSize), maxPages)
        const totalPageNumbers = siblingCount + 5
        const leftSiblingIndex = Math.max(pageNumber - siblingCount, 1)
        const rightSiblingIndex = Math.min(pageNumber + siblingCount, totalPageCount)
        const shouldShowLeftDots = leftSiblingIndex > 2
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2
        const firstPageIndex = 1
        const lastPageIndex = totalPageCount
        const DOTS = "..."

        // Check if we exceed our maximum sibling amount to show; no truncation needed if true
        if (totalPageNumbers >= totalPageCount)
            return range(1, totalPageCount)

        // We are close enough to the lower bound of our range that we don't exceed our sibling count,
        // but far enough from the upper bound that we need right side truncation
        if (!shouldShowLeftDots && shouldShowRightDots)
        {
            let leftItemCount = 3 + 2 * siblingCount
            let leftRange = range(1, leftItemCount)

            return [...leftRange, DOTS, totalPageCount]
        }

        // We are close enough to the upper bound of our range that we don't exceed our sibling count,
        // but far enough from the lower bound that we need left side truncation
        if (shouldShowLeftDots && !shouldShowRightDots)
        {
            let rightItemCount = 3 + 2 * siblingCount
            let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)

            return [firstPageIndex, DOTS, ...rightRange]
        }

        // We are far enough from both our upper and lower bounds that we need truncation on both the
        // left and right sides
        if (shouldShowLeftDots && shouldShowRightDots)
        {
            let midRange = range(leftSiblingIndex, rightSiblingIndex)

            return [firstPageIndex, DOTS, ...midRange, DOTS, lastPageIndex]
        }
    }, [totalCount, pageSize, pageNumber, siblingCount, maxPages])

    return paginationRange
}

export default usePagination