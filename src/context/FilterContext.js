import {createContext, useContext, useReducer } from "react";
import { filterReducer } from "../reducers";


const filterInitialState = {
    productList: [],// when any condition filter then will be update productList, isko update reducer kar raha hai
    onlyInStock: false,
    bestSellerOnly: false,
    sortBy: null,
    ratings: null
}

const FilterContext = createContext(filterInitialState);

// Action creater what action pass to reducer

export const FilterProvider = ({children}) =>{
    const [ state, dispatch ] = useReducer(filterReducer, filterInitialState);
    
    function initialProductList(products){ // products update hoga from api 
        dispatch({
            type: "PRODUCT_LIST",
            payload: {
                products: products
            }
        });     
         
    }

    function bestSeller(products){
        return state.bestSellerOnly ? products.filter(product => product.best_seller === true ) : products;  // Return a new list 
    }


    function inStock(products){
        return state.onlyInStock ? products.filter(product => product.in_stock === true): products;// filter which products in_stock true
    }

    function sort(products){
        if(state.sortBy === "lowtohigh"){
            return products.sort((a,b) => Number(a.price) - Number(b.price));
        }
        if(state.sortBy === "hightolow"){
            return products.sort((a,b) => Number(b.price) - Number(a.price));
        }
        return products;
    }

    // the process involves dispatching an action, updating the state through the reducer, recalculating the filtered product list, and rerendering the UI with the updated products.
    function rating(products){
        if(state.ratings === "4STARSABOVE"){
            return products.filter(product => product.rating >= 4);
        }
        if(state.ratings === "3STARSABOVE"){
            return products.filter(product => product.rating >= 3);
        }
        if(state.ratings === "2STARSABOVE"){
            return products.filter(product => product.rating >= 2);
        }
        if(state.ratings === "1STARSABOVE"){
            return products.filter(product => product.rating >= 1);
        }
        return products;
    }

    //The state is a built-in React object that is used to contain data or information about the component.
    // state and dispatch are provided by the useFilter function.
    
    const filteredProductList = rating(sort(inStock(bestSeller(state.productList)))); // this line check what are diff apply filter a new list


    const value = {
        state, 
        dispatch,
        products: filteredProductList,
        initialProductList
        }

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilter = () => {
    const context = useContext(FilterContext);
    return context;
} 
    