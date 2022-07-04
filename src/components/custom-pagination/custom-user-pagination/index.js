import { useMemo } from "react"

const range = (start, end) => {
    let length = end - start + 1;
    /*
        Create an array of certain length and set the elements within it from
      start value to end value.
    */
    return Array.from({ length }, (_, idx) => idx + start);
  };

export const usePagination = ({
    totalCount,
    pageSize,
    currentPage,
}) => {
    const paginationRange = useMemo(() => {

        const totalPageCount = Math.ceil(totalCount / pageSize);

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;
               
        if(currentPage === firstPageIndex) {
            let theRange = range(firstPageIndex,firstPageIndex + 2)
            return [...theRange, lastPageIndex]
        }

        else if(currentPage === lastPageIndex) {
            let theRange = range(lastPageIndex - 2,lastPageIndex)
            return [firstPageIndex, ...theRange]
        }
        else {
            return [...range(currentPage - 1, currentPage + 1),lastPageIndex]
        }
    },[totalCount, pageSize, currentPage]);
    return paginationRange;
}