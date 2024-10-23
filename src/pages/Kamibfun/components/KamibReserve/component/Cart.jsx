// Cart.js
import React from 'react';
import { Button } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const Cart = ({ cart, handleRemoveFromCart, increaseQuantity, decreaseQuantity, calculateTotal }) => {
    return (
        <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2">Your Cart</h3>
            <ul className="list-disc pl-5">
                {cart.map((item, index) => (
                    <li key={index} className="flex items-center justify-between mb-2">
                        <span>{item.name}</span>
                        <div className="flex items-center">
                            <Button
                                onClick={() => decreaseQuantity(item.productId)}
                                className="mx-1 bg-transparent"
                                size="xs"
                                aria-label="Decrease Quantity"
                            >
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                                onClick={() => increaseQuantity(item.productId)}
                                className="mx-1 bg-transparent"
                                size="xs"
                                aria-label="Increase Quantity"
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                            <Button
                                onClick={() => handleRemoveFromCart(item.productId)}
                                className="ml-2 bg-transparent"
                                size="xs"
                                aria-label="Remove Item"
                            >
                                <FontAwesomeIcon icon={faTrash} style={{ color: "#ff0000" }} />
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
            <h4 className="text-xl font-bold mt-4">Total: ${calculateTotal()}</h4>
        </div>
    );
};

export default Cart;