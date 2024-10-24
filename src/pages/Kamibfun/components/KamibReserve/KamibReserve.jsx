import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthContext';
import { useLanguage } from '../../../../contexts/LanguageContext';
import {
    Button,
    Input,
    Select,
    SelectItem,
    Card,
    CardHeader,
    CardBody,
    Image,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
} from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash, faClock, faLanguage } from '@fortawesome/free-solid-svg-icons';
import "./KamibReserve.css";

const Reserve = () => {
    const { concertId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [rounds, setRounds] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedRoundId, setSelectedRoundId] = useState(null);
    const [availableDates, setAvailableDates] = useState([]);
    const [filteredRounds, setFilteredRounds] = useState([]);
    const [cart, setCart] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { language, toggleLanguage, t } = useLanguage();
    const [showLanguageModal, setShowLanguageModal] = useState(true);
    const [processingPayment, setProcessingPayment] = useState(false);


    // Language Selection Modal
    const handleLanguageSelect = (selectedLanguage) => {
        if (language !== selectedLanguage) {
            toggleLanguage();
        }
        setShowLanguageModal(false);
    };

    const LanguageModal = () => (
        <Modal
            isOpen={showLanguageModal}
            onClose={() => setShowLanguageModal(false)}
            hideCloseButton
            isDismissable={false}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    <div className="text-2xl font-bold">Select Language / เลือกภาษา</div>
                </ModalHeader>
                <ModalBody>
                    <div className="flex flex-col gap-4">
                        <Button
                            size="lg"
                            onClick={() => handleLanguageSelect('en')}
                            className={`p-6 ${language === 'en' ? 'bg-blue-600' : 'bg-gray-600'}`}
                        >
                            <span className="text-xl">English</span>
                        </Button>
                        <Button
                            size="lg"
                            onClick={() => handleLanguageSelect('th')}
                            className={`p-6 ${language === 'th' ? 'bg-blue-600' : 'bg-gray-600'}`}
                        >
                            <span className="text-xl">ภาษาไทย</span>
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );

    // Rest of the existing code...
    const formatDateTime = (dateString, showDate = true, showTime = true) => {
        const options = {
            timeZone: 'Asia/Bangkok',
            ...(showDate && { dateStyle: 'full' }),
            ...(showTime && { timeStyle: 'short' })
        };
        return new Date(dateString).toLocaleString(language === 'th' ? 'th-TH' : 'en-US', options);
    };


    useEffect(() => {
        const fetchRounds = async () => {
            try {
                const response = await fetch(`https://api.spotup.shop/api/v1/concert-rounds/by-concert/147`);
                const roundResponse = await response.json();
                setRounds(roundResponse.data);

                const dates = [...new Set(roundResponse.data.map(round =>
                    new Date(round.startTime).toLocaleString('th-TH', {
                        timeZone: 'Asia/Bangkok',
                        dateStyle: 'full'
                    })
                ))].sort();
                setAvailableDates(dates);
            } catch (error) {
                setError('Error fetching concert rounds.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRounds();
    }, [concertId]);

    useEffect(() => {
        if (selectedDate) {
            const roundsForDate = rounds.filter(round =>
                new Date(round.startTime).toLocaleString('th-TH', {
                    timeZone: 'Asia/Bangkok',
                    dateStyle: 'full'
                }) === selectedDate
            );
            setFilteredRounds(roundsForDate);
            setSelectedRoundId(null);
        }
    }, [selectedDate, rounds]);

    useEffect(() => {
        const fetchProducts = async () => {
            if (selectedRoundId) {
                try {
                    const response = await fetch(`https://api.spotup.shop/api/v1/products/concert/147`);
                    const productResponse = await response.json();
                    setProducts(productResponse.data.filter(product =>
                        product.roundNumber.toString() === selectedRoundId.toString()
                    ));
                } catch (error) {
                    setError('Error fetching products.');
                    console.error(error);
                }
            }
        };

        fetchProducts();
    }, [selectedRoundId, concertId]);

    const handleRoundSelect = (roundId) => {
        setSelectedRoundId(roundId);
    };

    const createCheckoutSession = async (cartItems) => {
        try {
            const response = await fetch('https://api.spotup.shop/checkout/create-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',  // Changed to text/plain to avoid triggering preflight
                },
                body: JSON.stringify({
                    productName: "Concert Tickets",
                    amount: Math.round(parseFloat(calculateTotal()) * 100), // Convert to cents
                })
            });
    
            if (response.redirected) {
                // The backend will redirect directly to Stripe Checkout
                window.location.href = response.url;
                return;
            }
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const session = await response.json();
    
            // Store cart data in localStorage before redirecting
            localStorage.setItem('pendingPurchase', JSON.stringify({
                sessionId: session.sessionId,
                cart: cartItems.map(item => ({
                    userId: user.id,
                    productId: item.productId,
                    quantity: item.quantity,
                }))
            }));
    
            return session;
        } catch (error) {
            console.error('Error creating checkout session:', error);
            throw error;
        }
    };
    
    // Function to process the ticket purchase after successful payment
    const processPurchase = async (purchaseData) => {
        const { cart } = purchaseData;
    
        try {
            setProcessingPayment(true);
    
            for (const purchase of cart) {
                const response = await fetch(`https://api.spotup.shop/api/v1/tickets/buy`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(purchase),
                });
    
                const result = await response.json();
                if (!result.success) throw new Error(result.message);
            }
    
            // Clear the pending purchase from localStorage
            localStorage.removeItem('pendingPurchase');
    
            // Show success message and redirect
            alert(t('purchaseSuccessful'));
            navigate(`/my-tickets`);
        } catch (error) {
            console.error('Error purchasing tickets:', error);
            setError(t('purchaseError'));
        } finally {
            setProcessingPayment(false);
        }
    };
    
    const handleBuy = async () => {
        try {
            setLoading(true);
            await createCheckoutSession(cart);  // No need to handle the session URL here since the backend redirects
        } catch (error) {
            setError(t('checkoutError'));
            console.error('Error during checkout:', error);
            setLoading(false);
        }
    };
    
    // Check for successful payment and process the ticket purchase
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const sessionId = query.get('session_id');
    
        if (sessionId) {
            const pendingPurchase = JSON.parse(localStorage.getItem('pendingPurchase') || 'null');
    
            if (pendingPurchase && pendingPurchase.sessionId === sessionId) {
                // Verify the payment first
                fetch(`https://api.spotup.shop/checkout/verify/${sessionId}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.paid) {
                            // Process the ticket purchase
                            return processPurchase(pendingPurchase);
                        } else {
                            throw new Error('Payment verification failed');
                        }
                    })
                    .catch(error => {
                        console.error('Error verifying payment:', error);
                        setError(t('paymentVerificationError'));
                    });
            }
        }
    }, [navigate]);
    

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
        setCart((prevCart) => prevCart.map(item =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decreaseQuantity = (productId) => {
        setCart((prevCart) => prevCart.map(item =>
            item.productId === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="reserve-container flex flex-col min-h-screen bg-gray-900 text-white p-8">
            <LanguageModal />
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-4xl font-bold text-center">
                        {t('reserveTitle')} {concertId}
                    </h1>
                    <Button
                        onClick={toggleLanguage}
                        className="bg-transparent"
                        size="sm"
                    >
                        <FontAwesomeIcon icon={faLanguage} className="mr-2" />
                        {language.toUpperCase()}
                    </Button>
                </div>

                <div className="mb-6">
                    <Select
                        label={t('selectDate')}
                        placeholder={t('selectDatePlaceholder')}
                        className="max-w-xs mb-4"
                        onChange={(e) => setSelectedDate(e.target.value)}
                        value={selectedDate}
                    >
                        {availableDates.map((date) => (
                            <SelectItem key={date} value={date}>
                                {date}
                            </SelectItem>
                        ))}
                    </Select>

                    {selectedDate && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold mb-2">{t('selectRound')}</h3>
                            <div className="grid gap-3">
                                {filteredRounds.map((round) => (
                                    <button
                                        key={round.id}
                                        onClick={() => handleRoundSelect(round.id)}
                                        className={`w-full text-left p-4 rounded-lg transition-all ${selectedRoundId === round.id
                                            ? 'bg-blue-600 border-2 border-blue-400'
                                            : 'bg-gray-800 hover:bg-gray-700'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-lg font-semibold mb-1">
                                                    {t('round')} {round.roundNumber}
                                                </div>
                                                <div className="text-sm text-gray-300 flex items-center">
                                                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                                                    {formatDateTime(round.startTime)} - {formatDateTime(round.endTime, false, true)}
                                                </div>
                                            </div>
                                            {selectedRoundId === round.id && (
                                                <div className="text-blue-200 text-sm font-semibold">
                                                    {t('selectedRound')}
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>


                {selectedRoundId && (
                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold mb-2">{t('selectProduct')}</h3>
                        {Object.keys(groupedProducts).length === 0 ? (
                            <p>{t('noProducts')}</p>
                        ) : (
                            Object.entries(groupedProducts).map(([type, products]) => (
                                <div key={type} className="mb-6">
                                    <h4 className="text-lg font-bold mb-2 text-blue-300">
                                        {t('ticketType')}: {type}
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {products.map(product => (
                                            <Card
                                                key={product.productId}
                                                className="bg-gray-800 text-white shadow-lg hover:shadow-xl transition-shadow duration-200"
                                            >
                                                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                                    <h4 className="font-bold text-xl">{product.name}</h4>
                                                    <small className="text-gray-400">
                                                        {t('price')}: ฿{product.price.toFixed(2)}
                                                    </small>
                                                    <small className="text-gray-400">
                                                        {t('quantity')}: {product.amount}
                                                    </small>
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
                                                        {t('addToCart')}
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
                        <h3 className="text-2xl font-semibold mb-2">{t('yourCart')}</h3>
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
                        <h4 className="text-xl font-bold mt-4">
                            {t('total')}: ${calculateTotal()}
                        </h4>
                    </div>
                )}

                {cart.length > 0 && (
                    <Button
                        color="success"
                        onClick={handleBuy}
                        className="w-full"
                        disabled={loading || processingPayment}
                    >
                        {loading ? t('creatingCheckout') :
                            processingPayment ? t('processingPurchase') :
                                t('buyNow')}
                    </Button>
                )}

                {error && (
                    <div className="text-red-500 mt-4 text-center">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reserve;