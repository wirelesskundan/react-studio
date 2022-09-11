import React, { useEffect, useState } from 'react'
import Pagination from './Pagination'

const Allproduct = () => {

    const ApiData = 'https://fakestoreapi.com/';

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [getProdCategories, setgetProdCategories] = useState([]);
    const [getData, setgetData] = useState([]);
    const [Datas, setDatas] = useState([]);

    const [currentPage, setcurrentPage] = useState(1);
    const [postPerPage ] = useState(2);

    const indexOfLasttPost = currentPage * postPerPage
    const indexOfFirstPost = indexOfLasttPost - postPerPage
    const currentPosts = getData.slice(indexOfFirstPost, indexOfLasttPost)

    useEffect(() => {
        fetch(ApiData + 'products/categories')
            .then((res) => {
                return res.json();
            }).then((categories) => {
                setIsLoaded(true);
                setgetProdCategories(categories);
            }).catch((error) => {
                setIsLoaded(true);
                setError(error);
            })
    },[])
    useEffect(() => {
        fetch(ApiData + 'products')
            .then((res) => {
                return res.json();
            }).then((results) => {
                setIsLoaded(true);
                setgetData(results);
                setDatas(results)
            }).catch((error) => {
                setIsLoaded(true);
                setError(error);
            })
    },[])


    const FilterCategories = (CategoriesData) => {
        if(CategoriesData === 'All'){
            setgetData(Datas);
        }else{
            const AllproductList = Datas.filter((CurrentElem) => {
                return CurrentElem.category === CategoriesData
            })
            setgetData(AllproductList);
        }
    }
    
    if(error){
        return <div>Error: {error.message}</div>;
    }else if(!isLoaded){
        return <div>Loading...</div>;
    }else{
        return (
            <>
            <Pagination  postPerPage={postPerPage} totalPosts={getData.length} PaginationClick={setcurrentPage}/>
            <div className="main-container">

                    

                    <div className="left-side-wrap">
                        <ul className="categories-list">
                            {
                                getProdCategories.map((CategoriesList, i) => (
                                    <li key={i + 1} onClick={()=> FilterCategories(CategoriesList)}>{CategoriesList}</li>
                                ))
                            }
                            <li onClick={()=> FilterCategories('All')}>All</li>
                        </ul>
                    </div>
                    <div className="product-list-wrap">
                        {currentPosts.map((ProductList, i) => {
                            return (
                                <div className="product-list-box" key={ProductList.id}>
                                    <div className="product-img">
                                        <img src={ProductList.image} alt={ProductList.image} />
                                    </div>
                                    <div>
                                        <h3>{ProductList.title}</h3>
                                        <p> {ProductList.description} </p>
                                        <h4>{ProductList.category}</h4>
                                        <p>{ProductList.price}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    
            </div>
            </>
        )
    }

    
}


export default Allproduct;