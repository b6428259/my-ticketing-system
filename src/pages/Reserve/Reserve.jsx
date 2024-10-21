import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { Button, Input, Select, SelectItem, Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import "./Reserve.css";

const Reserve = () => {
    const { concertId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [rounds, setRounds] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedRound, setSelectedRound] = useState(new Set([]));
    const [cart, setCart] = useState([]);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const fetchRoundsAndProducts = async () => {
            try {
                const roundResponse = await axios.get(`https://api.spotup.shop/api/v1/concert-rounds/by-concert/${concertId}`);
                setRounds(roundResponse.data.data);
            } catch (error) {
                console.error('Error fetching concert rounds:', error);
            }
        };

        fetchRoundsAndProducts();
    }, [concertId]);

    useEffect(() => {
        const fetchProducts = async () => {
            if (selectedRound.size > 0) {
                try {
                    const roundId = Array.from(selectedRound)[0];
                    const round = rounds.find(r => r.id.toString() === roundId);
                    const productResponse = await axios.get(`http://localhost:8080/api/v1/products/concert/${concertId}`);
                    setProducts(productResponse.data.data.filter(product => product.roundNumber === round.roundNumber));
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            }
        };

        fetchProducts();
    }, [selectedRound, concertId, rounds]);

    const handleAddToCart = (product) => {
        const quantity = quantities[product.productId] || 1;

        setCart((prevCart) => {
            const existingProduct = prevCart.find(p => p.productId === product.productId);
            if (existingProduct) {
                return prevCart.map(p =>
                    p.productId === product.productId ? { ...p, quantity: existingProduct.quantity + quantity } : p
                );
            }
            return [...prevCart, { ...product, quantity }];
        });

        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [product.productId]: 1,
        }));
    };

    const handleQuantityChange = (productId, value) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: Math.max(1, value),
        }));
    };

    const handleRemoveFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.productId !== productId));
    };

    const increaseQuantity = (productId) => {
        setCart((prevCart) => {
            return prevCart.map(item => {
                if (item.productId === productId) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
        });
    };

    const decreaseQuantity = (productId) => {
        setCart((prevCart) => {
            return prevCart.map(item => {
                if (item.productId === productId && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
        });
    };

    const handleBuy = async () => {
        const purchases = cart.map(product => ({
            userId: user.id,
            productId: product.productId,
            quantity: product.quantity,
        }));

        try {
            for (const purchase of purchases) {
                await axios.post('http://localhost:8080/api/v1/tickets/buy', purchase);
            }

            alert('Purchase successful!');
            navigate(`/my-tickets`);
        } catch (error) {
            console.error('Error purchasing tickets:', error);
            alert('Error purchasing tickets. Please try again.');
        }
    };

    // Function to calculate the total price
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const groupProductsByType = (products) => {
        return products.reduce((acc, product) => {
            const { type } = product;
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(product);
            return acc;
        }, {});
    };

    const groupedProducts = groupProductsByType(products);

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-4">Reserve Tickets for Concert {concertId}</h1>

                <div className="mb-6">
                    <Select
                        label="Select Round"
                        placeholder="Choose a concert round"
                        selectedKeys={selectedRound}
                        className="max-w-xs"
                        onSelectionChange={setSelectedRound}
                    >
                        {rounds.map((round) => (
                            <SelectItem
                                key={round.id.toString()}
                                value={round.id}
                                textValue={`Round ${round.roundNumber} - ${new Date(round.roundDate).toLocaleString()}`}
                            >
                                Round {round.roundNumber} - {new Date(round.roundDate).toLocaleString()}
                            </SelectItem>
                        ))}
                    </Select>
                </div>

                {selectedRound.size > 0 && (
                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold mb-2">Select Product</h3>
                        {Object.keys(groupedProducts).length === 0 ? (
                            <p>No products available for this round.</p>
                        ) : (
                            Object.entries(groupedProducts).map(([type, products]) => (
                                <div key={type} className="mb-6">
                                    <h4 className="text-lg font-bold mb-2 text-blue-300">Category: {type}</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {products.map(product => (
                                            <Card
                                                key={product.productId}
                                                className="bg-gray-800 text-white shadow-lg hover:shadow-xl transition-shadow duration-200"
                                            >
                                                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                                    <h4 className="font-bold text-xl">{product.name}</h4>
                                                    <small className="text-gray-400">Price: ${product.price.toFixed(2)}</small>
                                                    <small className="text-gray-400">Amout :{product.amount}</small>
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
                                                        className=" text-white w-full mt-2"
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
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {cart.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold mb-2">Your Cart</h3>
                        <ul className="list-disc pl-5">
                            {cart.map((item, index) => (
                                <li key={index} className="flex items-center justify-between">
                                    <span>
                                        {item.name} - Quantity: {item.quantity}
                                    </span>
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
                                            <FontAwesomeIcon icon={faTrash} style={{color: "#ff0000"}}/>
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Display total amount here */}
                        <h4 className="text-xl font-bold mt-4">Total: ${calculateTotal()}</h4>
                    </div>
                )}

                {cart.length > 0 && (
                    <Button color="success" onClick={handleBuy} className="w-full">
                        Buy Now
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Reserve;
