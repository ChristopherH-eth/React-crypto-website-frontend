import React from "react"

function range(start, end)
{
    let length = end - start + 1

    return Array.from({length}, (_, index) => index + start)
}

const usePagination = ({
    totalCount,
    pageSize,
    siblingCount,
    pageNumber
}) => {
    const paginationRange = React.useMemo(() => {
        const totalPageCount = Math.ceil(parseInt(totalCount) / parseInt(pageSize))
        
        const totalPageNumbers = parseInt(siblingCount) + 5
        const leftSiblingIndex = Math.max(parseInt(pageNumber) - parseInt(siblingCount), 1)
        const rightSiblingIndex = Math.min(parseInt(pageNumber) + parseInt(siblingCount), totalPageCount)
        const shouldShowLeftDots = leftSiblingIndex > 2
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2
        const firstPageIndex = 1
        const lastPageIndex = totalPageCount
        const DOTS = "..."

        if (totalPageNumbers >= totalPageCount)
            return range(1, totalPageCount)

        if (!shouldShowLeftDots && shouldShowRightDots)
        {
            let leftItemCount = 3 + 2 * parseInt(siblingCount)
            let leftRange = range(1, leftItemCount)

            return [...leftRange, DOTS, totalPageCount]
        }

        if (shouldShowLeftDots && !shouldShowRightDots)
        {
            let rightItemCount = 3 + 2 * parseInt(siblingCount)
            let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)

            return [firstPageIndex, DOTS, rightRange]
        }

        if (shouldShowLeftDots && shouldShowRightDots)
        {
            let midRange = range(leftSiblingIndex, rightSiblingIndex)

            return [firstPageIndex, DOTS, ...midRange, DOTS, lastPageIndex]
        }
    }, [totalCount, pageSize, pageNumber, siblingCount])

    console.log(totalCount, pageSize, siblingCount, pageNumber, paginationRange)
    return paginationRange
}

export default usePagination