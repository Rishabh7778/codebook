export const filterReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {// what is the type by user!

        case "PRODUCT_LIST":
            return { productList: payload.products }

        case "SHORT_BY":
            return {...state, sortBy: payload.sortBy}

        case "RATINGS":
            return { ...state, ratings: payload.ratings }  // step 2 // update the state 
        // {
        //     type: "RATINGS",
        //     payload: {
        //        ratings: "4STARSABOVE"
        //     }
        //  }

        case "BEST_SELLER_ONLY":
            return { ...state, bestSellerOnly: payload.bestSellerOnly }

        case "ONLY_IN_STOCK":
            return { ...state, onlyInStock: payload.onlyInStock }

        case "CLEAR_FILTER":
            return {
                ...state, 
                onlyInStock: false,
                bestSellerOnly: false,
                sortBy: null,
                ratings: null
            }

        default:
            throw new Error("No Case Found! ");
    }
}