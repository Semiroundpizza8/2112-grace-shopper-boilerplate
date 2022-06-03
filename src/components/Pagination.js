import React from 'react'
import '../style/Pagination.css'

const Pagination = ({productsPerPage, totalProducts, paginate}) => {
    const pageNumbers = [];

    for(let i =1; i <= Math.ceil(totalProducts / productsPerPage); i++){
        pageNumbers.push(i);
    } 
  return (
    <nav>
        <ul className='pagination'>
            {pageNumbers.map(number => (
                <li key={number} className="page__item">
                    <a onClick={() => paginate(number)} href='#' className='page__link'>
                        {number}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Pagination