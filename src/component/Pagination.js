import React from 'react'

const Pagination = ({postPerPage, totalPosts, setCurrentPage}) => {

const pageNumber = [];
    
for(let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++){
    pageNumber.push(i)
}
// console.log(pageNumber)
  return (
    <>

    <ul className="pagination">
        {
            pageNumber.map((page, index) => {
                return  <li key={index} onClick={() => setCurrentPage(page)} className="page-item">
                          {page}
                        </li>
            })
        }

    </ul>
    
    </>
  )
}


export default Pagination;
