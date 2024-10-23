// ProductCard.js
import React from 'react';
import { Card, CardHeader, CardBody, Input, Button, Image } from '@nextui-org/react';

const ProductCard = ({ product, handleAddToCart, quantities, handleQuantityChange }) => {
    return (
        <Card className="bg-gray-800 text-white shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-xl">{product.name}</h4>
                <small className="text-gray-400">Price: ฿{product.price.toFixed(2)}</small>
                <small className="text-gray-400">Quantity: {product.amount}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2 text-center">
                {product.productImgUrl && (
                    <div className="flex justify-center mb-2">
                        <Image
                            src={product.productImgUrl}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-lg"
                        />
                    </div>
                )}
                <p className="text-gray-300">{product.description}</p>
                <Input
                    type="number"
                    min="1"
                    value={quantities[product.productId] || 1}
                    onChange={(e) => handleQuantityChange(product.productId, parseInt(e.target.value))}
                    className="text-white w-full mt-2"
                />
                <Button
                    color="primary"
                    onClick={() => handleAddToCart(product)}
                    className="mt-2"
                >
                    Add to Cart
                </Button>
            </CardBody>
        </Card>
    );
};

export default ProductCard;