import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchCategoriesAsync } from '../../store/categories/category.action';

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from '../category/category.component';

const Shop = () => {

    const dispatch = useDispatch();
    console.log('Shop component');

    useEffect(() => {
        console.log('use effect');
        dispatch(fetchCategoriesAsync());
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />}/>
        </Routes>
    );
};

export default Shop;