function WebHeader({ setCart, cart, isOpen, setIsOpen }) {
    return (
        <header className="fixed w-full z-50 bg-white">
            <div className="flex items-center justify-between w-full h-16 p-[25px] md:h-28 md:px-24 md:pb-0">
                <div className="flex gap-3 items-center">
                    {/* Toggle Menu */}
                    <ToggleMenu />
                    <img className="h-5 order-2 md:order-1" alt="logo" src="/images/logo.svg" />
                    </div>

                {/* Cart and User*/}
                <div className="flex justify-end gap-3 items-center md:gap-8">
                    <CartIcon setCart={setCart} cart={cart} isOpen={isOpen} setIsOpen={setIsOpen} />
                    <img className="h-8 w-8 rounded-full hover:border border-orange-600" alt="user" src="/images/image-avatar.png" />
                </div>
            </div>

            {/* HR Line */}
            <div className="hidden md:block px-24">
                <hr className="border-1 border-gray-400" />
            </div>
        </header>
    );
}

function ToggleMenu() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isBold, setIsBold] = React.useState("Collections");
    const menus = ["Collections", "Mens", "Women", "About", "Contact"];
    
    function toggle() {
        setIsOpen(!isOpen);
    }
    
    return (
        <>
            <button className="z-50 md:hidden cursor-pointer"
                onClick={toggle}>

                <img
                    className="h-4 mt-[5px]"
                    alt={isOpen ? "close" : "menu"}
                    src={isOpen ?
                        "/images/icon-close.svg" :
                        "/images/icon-menu.svg"} />
            </button>

            <ul className={`absolute h-screen w-2/3 top-0 left-0 pt-16 px-[25px] bg-white  ${isOpen ? "block" : "hidden"} 
            
            md:static md:h-auto md:w-auto md:pt-0 md:flex md:gap-6 md:order-2`}>
                {menus.map(menu => (<li key={menu} onClick={() => setIsBold(menu)} className={`relative py-4 cursor-pointer text-gray-900  ${isBold === menu ? "border-b-4 border-orange-500 font-bold" : "border-none font-normal"}`}>
                {menu}
            
                </li>
                ))}
            </ul>
        </>
    );
}

function CartIcon({ setCart, cart, isOpen, setIsOpen }) {
    function toggle() {
        setIsOpen(!isOpen);
    }
    
    function deleteIcon(id) {
        setCart(prev => prev.filter(item => item.id !== id));
    }
    
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    
    return (
        <>
            <div className="relative">
                <button className="relative z-50 cursor-pointer" onClick={toggle}>
                
                <span className={`absolute font-bold text-white text-[10px] px-2 rounded-full bg-orange-500 -top-2 -right-2 ${cart.length > 0 ? "block" : "hidden"}`}>{total}</span>
                <img alt="cart" src="/images/icon-cart.svg" />
            </button>

{ /* Whole cart container */ }
<div className={`fixed w-[95%] left-3 h-64 top-[75px] right-0 rounded-md bg-white shadow-lg items-center ${isOpen ? "block" : "hidden"}

md:absolute md:top-[50px] md:-translate-x-1/2 md:w-[30vw]`
}>
                {/* Cart Header */}
                <div>
                    <h1 className="p-4 font-bold">Cart</h1>

                    <hr className="pt-4 md:pt-0" />
                </div>

                {/* After hr line */}
                {cart.length === 0 ?
                    (<div className="p-4 h-40 flex items-center justify-center">
                        <p className="text-center text-gray-500 font-bold">Your cart is empty.</p>
                    </div>) :


                    (cart.map((item) => (
                        <div className="p-4 h-44">
                            <div key={item.id} className="flex items-center gap-4">
                                <img className="h-12 w-12 rounded-md" src={item.src} alt={item.alt} key={item.id} />

                                <div className="">
                                    <p className="text-gray-500" key={item.id}>
                                        {item.name}
                                        <br />
                                        ${item.price} x {item.qty}
                                        <span className="font-bold text-black"> ${item.price * item.qty}</span>
                                    </p>
                                </div>

                 <button className="z-50 cursor-pointer" onClick={() => deleteIcon(item.id)}>
                     <img className="items-center" alt="delete" src="/images/icon-delete.svg" />
                 </button>               
                            </div>
                            {cart.length != 0 &&
                    (<button onClick={() => setIsClicked(!isClicked)} className="mt-8 w-full flex items-center justify-center bg-orange-500 font-bold p-4 rounded-md hover:opacity-80 active:opacity-70 active:scale-95 transition-all duration-200"
                    >
                        Checkout
                    </button>)
                }
                        </div>
                    ))
                    )}
            </div >
            </div>
        </>
    );
}

function Gallery() {
    const myImages = [
        { id: 1, src: '/images/image-product-1.jpg', alt: 'product image' },
        { id: 2, src: '/images/image-product-2.jpg', alt: 'product image' },
        { id: 3, src: '/images/image-product-3.jpg', alt: 'product image' },
        { id: 4, src: '/images/image-product-4.jpg', alt: 'product image' }
    ];
    
    function ImgThumbnails() {
        return (
            <>
                <div className="hidden md:block">
        <ul className="flex justify-between">
            {myImages.map((myImage,i)=>(<img key={myImage.src} src={myImage.src} alt={myImage.alt} 
                onClick={()=>setIndex(i)} 
                className={`w-[20%] mt-8 cursor-pointer hover:opacity-60 rounded-xl ${index === i ? "border-2 border-orange-600 opacity-60" : "border-none"}`} 
            />
                ))}
                </ul>
    </div>
            </>
        );
    }
    
    function lightBox(){
        return(
            <>
                <div className="absolute left-0 w-screen h-screen bg-black opacity-50 items-center">
                            <img className="md:rounded-xl" alt={myImg.alt} src={myImg.src} />
        
                { ImgThumbnails() }
                </div>
            </>
        );
    }
    
    
    const [index, setIndex] = React.useState(0);
    
    let hasPrev = index > 0;
    let hasNext = index < myImages.length - 1;
    
    function imgPrev() {
        if (hasPrev) {
            setIndex(index - 1);
        }
    }
    
    function imgNext() {
        if (hasNext) {
            setIndex(index + 1);
        }
    }
    
    let myImg = myImages[index];
    
    return (
        <>
            <div className="relative items-center">
                <div className="w-full absolute p-5 flex justify-between top-1/2 -translate-y-1/2 md:hidden">
                    <button className="z-50" onClick={imgPrev} disabled={!hasPrev}>
                        <img className="bg-white rounded-full p-3" alt="previous" src="/images/icon-previous.svg" />
                    </button>

                    <button className="z-50" onClick={imgNext} disabled={!hasNext}>
                        <img className="bg-white rounded-full p-3" alt="next" src="/images/icon-next.svg" />
                    </button>
                </div>

                <img className=" md:rounded-xl" onClick={lightBox} alt={myImg.alt} src={myImg.src} />
                
                    {ImgThumbnails()}
            </div>
        </>
    );
}

function ProductDesc() {
    return (
        <>
            <div className="mx-[25px]">
                <div className="my-5">
                    <p className="pb-2 text-gray-500 text-xs tracking-[2px] font-black uppercase">Sneaker Company</p>
                    <h2 className="py-1 text-gray-900 text-3xl font-bold">Fall Limited Edition Sneakers</h2>
                    <p className="pt-3 text-gray-500 font-gray-400">These low-profile sneakers are your perfect casual wear companion. Featuring a
                        durable rubber outer sole, they’ll withstand everything the weather can offer.</p>
                </div>

                <div className="flex my-7 items-center justify-between md:block">
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-bold text-gray-900">$125.00</h2>
                        <p className="px-2 bg-gray-900 font-bold text-white rounded-md">50%</p>

                    </div>
                    <p className="text-gray-500 font-bold line-through">$250.00</p>
                </div>
            </div>
        </>
    );
}

function AddToCart({ cart, setCart }) { // ADDING ITEMS
    const [count, setCount] = React.useState(0);
    
    const product = {
        id: 1,
        name: 'Fall Limited  Edition Sneakers',
        price: 125.00,
        qty: 0,
        src: '/images/image-product-1.jpg',
        alt: 'Product Image'
    };
    
    let hasMinus = count > 0;
    
    function minus() {
        if (hasMinus) {
            setCount(count - 1);
        }
    }
    
    function plus() {
        setCount(count + 1);
    }
    
    function add() {
        if (count === 0) return;
        
        const existing = (cart.find(item => item.id === product.id));
        
        if (existing) {
            setCart(prevCart => prevCart.map(item => item.id === product.id ? { ...item, qty: item.qty + count } : item));
        }
        else
            setCart(prev => [...prev, { ...product, qty: count }]);
    }
    
    return (
        <div className="mx-[25px] mb-20 md:flex md:gap-4">
            <div className="w-full px-5 py-4 bg-gray-50 flex justify-between items-center rounded-md md:w-1/3">
                <button className="" onClick={minus} disabled={!hasMinus}>
                    <img src="/images/icon-minus.svg" alt="minus" className="hover:opacity-60" />
                </button>

                <p className="font-bold">{count}</p>

                <button className="hover:opacity-60" onClick={plus}>
                    <img src="/images/icon-plus.svg" alt="plus" className="" />
                </button>
            </div>

            <button className="mt-4 w-full flex items-center justify-center gap-3 bg-orange-500 font-bold p-4 rounded-md shadow-xl shadow-orange-500/50 hover:opacity-80 active:opacity-70 active:scale-95 transition-all duration-200 md:w-2/3 md:m-0"
                onClick={() => {add(product); setCount(0);}}
            >
                <img src="/images/icon-cart.svg" alt="Cart" className="w-4 h-4" />
                <span>Add to cart</span>
            </button>
        </div>
    );
}

function WebFooter() {
    return (
        <>
            <div className="attribution">
                Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
                Coded by <a href="#">Callo, Moselle</a>.
            </div>
        </>
    )
}


// App rendering
function App() {
    const [cart, setCart] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false);
    
    
    return (
        <>
            <WebHeader setCart={setCart} cart={cart} isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="md:px-24">
                <main className="pt-8 md:pt-28">
                    <div className="md:flex md:gap-12 md:px-12 md:mt-20">
                    <Gallery />
                    
                    <div>
                     <ProductDesc />
                                    <AddToCart cart={cart} setCart={setCart} />
                    </div>
                </div>
                </main>
            </div>

            <WebFooter />
        </>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));