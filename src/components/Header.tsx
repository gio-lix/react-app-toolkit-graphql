import {FC, useCallback, useEffect, useRef, useState} from "react"
import {useGetCategoriesDosQuery, useGetCurrencyDosQuery} from "../services/queryApi/products";
import {Link,  useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addCurrencyValue} from "../services/slices/currencySlice";
import {selectOrderSlice} from "../services/slices/orderSlice";
import Cart from "./Cart";
import {totalPrice} from "../helper";
import IMAGES from "../static/images/index";



const Header = () => {
    const {data, isLoading, isError} = useGetCurrencyDosQuery()
    const {data: categoriesData, isLoading: loading, error} = useGetCategoriesDosQuery()
    const {cartItems} = useSelector(selectOrderSlice)
    const dispatch = useDispatch()
    const {pathname} = useLocation()
    const cartPath = pathname === '/order'
    let navigator = useNavigate()

    console.log(IMAGES.shopIcon)

    const [currency, setCurrency] = useState<boolean>(false);
    const [openCart, setOpenCart] = useState<boolean>(false);
    const currencyBox = useRef<HTMLDivElement>(null);

    const lockScroll = useCallback(() => {
        document.body.style.overflow = 'hidden';
    }, [])
    const unlockScroll = useCallback(() => {
        document.body.style.overflow = '';
    }, [])
    useEffect(() => {
        if (openCart && !cartPath) {
            lockScroll()
        } else {
            unlockScroll()
        }
    }, [openCart]);

    useEffect(() => {
        window.addEventListener('click', handleClickCurrency)
        return () => window.removeEventListener('click', handleClickCurrency)
    })
    const handleClickCurrency = (e: any): void => {
        if (!e.path.includes(currencyBox.current)) {
            setCurrency(false)
            setOpenCart(false)
        }
    }
    const handleCurrencyOpen = () => {
        setCurrency(!currency)
        setOpenCart(false)
    }
    const handleCartOpen = () => {
        setOpenCart(!openCart)
        setCurrency(false)
    }
    const handleCurrencyClick = (item: string) => {
        dispatch(addCurrencyValue(item))
        setCurrency(false)
    }
    const handlerPushOrderPage = () => {
        navigator('/order')
        setOpenCart(false)
    }

    return (
        <header className='relative h-[80px]  flex  items-center'>
            <div className='absolute z-10 w-full flex items-center  justify-between'>
                <nav className='flex items-center h-[78px]'>
                    <ul className='flex items-center font-semibold font-raleway text-base uppercase  h-full'>
                        {!loading && categoriesData?.categories?.map((item: { name: string }, i: number) => (
                            <li key={i} className='relative h-full flex flex-col items-center  justify-center px-4'>
                                <Link to={`/${item.name}`}>
                                    <span className={`${pathname === `/${item.name}` && 'text-green'}`}>{item.name}</span>
                                </Link>
                                <span className={`${pathname === `/${item.name}` && 'bg-green'} absolute bottom-0 left-0 h-[2px] w-full `}> </span>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div ref={currencyBox} className=' flex items-center '>
                    <span onClick={handleCurrencyOpen} className='flex items-center cursor-pointer'>
                        <img src={IMAGES.usa} alt="dollar" className='	 font-raleway  text-lg'/>
                        <img src={IMAGES.vector} alt="vector" className={` w-2 ml-[10px] mt-2 ${currency && 'rotate-180'} `}/>
                    </span>
                    <button onClick={handleCartOpen} className='relative w-[25px] h-[25px] ml-[22px]'>
                        <img src={IMAGES.shopIcon} alt="vector" className='w-[20px] h-[25px]'/>
                        {cartItems?.length > 0 && (
                            <div className='absolute -top-2 -right-2 w-[20px] h-[20px] rounded-full bg-black text-white '>
                                <p className='text-roboto font-bold -translate-y-[3.0px] '>{cartItems?.length}</p>
                            </div>
                        )}
                    </button>
                    <div>
                        {currency && (
                            <section className='absolute -right-5 top-14 w-[114px] h-auto shadow-xl bg-white'>
                                {!isLoading && data?.currencies?.map((el: { symbol: string, label: string }) => (
                                    <span onClick={() => handleCurrencyClick(el.symbol)}
                                          className='flex  flex-cols items-center justify-center px-5 my-[21px] text-currency_text cursor-pointer'
                                          key={el.symbol}>
                                        <p className='font-raleway font-semibold text-lg'>{el.label}</p>
                                    </span>
                                ))}
                            </section>
                        )}
                        {(openCart && !cartPath) && (
                            <div
                                className={`relative top-0 left-0 z-20  w-full h-full flex justify-center items-center `}>
                                {/* overlay */}
                                <span onClick={() => setOpenCart(false)}
                                      className='fixed bg-black bg-opacity-20 top-[80px] left-0 bottom-0 z-30 w-full h-full'>
                                </span>
                                {/* cart  */}
                                <div
                                    className='absolute z-40 -right-5 top-[38px] w-80 h-[540px]  px-4 pb-5 pt-2 flex flex-col justify-between  bg-white'>
                                    <section className='flex space-x-1 leading-relaxed'>
                                        <h4 className='font-bold font-raleway  '>My Bag,</h4>
                                        {cartItems?.length > 0 && <p>{cartItems?.length} items</p>}

                                    </section>
                                    <div className=' h-full w-full overflow-y-auto scrollbar-hide '>
                                        <Cart />
                                    </div>
                                    <section className='h-[168px] '>
                                        <span
                                            className='flex justify-between  font-bold font-raleway text-base leading-relaxed pb-9'>
                                            <h4>Total</h4>
                                            <p>${totalPrice(cartItems)}</p>
                                        </span>
                                        <span className='flex justify-between 	'>
                                           <button onClick={handlerPushOrderPage} className='w-[140px] h-[43px] border border-black uppercase font-semibold font-raleway text-sm'>
                                               view bag
                                           </button>
                                            <button  className='w-[140px] h-[43px]  bg-green text-white uppercase font-semibold font-raleway text-sm'>
                                                check out
                                            </button>
                                       </span>
                                    </section>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='absolute w-full flex items-center justify-center'>
                <img src={IMAGES.logo} className='w-[32px] h-[30px]' alt='logo' />
            </div>
        </header>
    )
}
export default Header