import { CartList } from "./components/CartList";
import { CartEmpty } from "./components/CartEmpty";
import { useCart } from "../../context";
import { useTitle } from "../../hook/useTitle";

export const CartPage = () => {
    
    const { cartList } = useCart();
    useTitle(`Cart (${cartList.length})`);

    return (
        <main>
            { cartList.length ? <CartList/> : <CartEmpty/> }
        </main>
    )
}
