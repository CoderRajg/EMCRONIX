import React, { useContext } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import useDocTitle from '../hooks/useDocTitle';
import FilterBar from '../components/filters/FilterBar';
import ProductCard from '../components/product/ProductCard';
import Services from '../components/common/Services';
import filtersContext from '../contexts/filters/filtersContext';
import EmptyView from '../components/common/EmptyView';
import { useLocation} from 'react-router-dom';


const AllProducts = () => {
   
   const location=useLocation();
//    console.log(location)
   const data=location.state?.test;
//    console.log(data);
    
    

    useDocTitle('All Products');

    const { allProducts } = useContext(filtersContext);

    const newProduct=data===undefined?allProducts:allProducts.filter(product=>product.category===data)


    return (
        <>
            <section id="all_products" className="section">
                <FilterBar category={data}/>

                <div className="container">
                    {
                        newProduct.length ? (
                            <div className="wrapper products_wrapper">
                                {
                                    newProduct.map(item => (
                                        <ProductCard
                                            key={item.id}
                                            {...item}
                                        />
                                    ))
                                }
                            </div>
                        ) : (
                            <EmptyView
                                icon={<BsExclamationCircle />}
                                msg="No Results Found"
                            />
                        )
                    }
                </div>
            </section>

            <Services />
        </>
    );
};

export default AllProducts;