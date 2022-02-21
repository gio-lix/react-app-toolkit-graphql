import {FC, useEffect, useState} from "react"
import {CartType, DataType, DefaultSizeType, IdNameType, ItemsType} from "../../type";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, deleteItem, minusQty, selectOrderSlice, updateValue} from "../services/slices/orderSlice";
import IMAGES from "../static/images";


interface ICart {

}
const Cart: FC<ICart> = () => {
    const [image, setImage] = useState<any>([]);
    const {pathname} = useLocation()
    const cartPath = pathname === '/order'
    const [takeSize, setTakeSize] = useState<DataType[]>();
    const {cartItems} = useSelector(selectOrderSlice)
    const dispatch = useDispatch()

    useEffect(() => {
        setTakeSize(cartItems)
    }, [cartItems]);



    const handlerUpdateCartValue = (id: string, name: string, value: string) => {
        dispatch(updateValue({id, name, value}))
    }

    const filterById = (item: DataType[], id: string ) => {
        return item?.filter((e: IdNameType) => e.id === id)
    }

    const handleImageSlidePlus = (item: string[], id: string) => {
        const find = image?.find((e: {id: string}) => e.id === id)
        if (find) {
            if (item?.length === find.count) {
                image?.forEach(() => {
                    find.count = 0
                })
                return;
            }
            const updateImage =  image?.map((e: {id: string, count: number}) => {
                if (e.id === id) {
                    e.id = id
                    e.count++
                }
                return e
            })
            setImage(updateImage)
            return
        }
        setImage((prev: {id: string, count: number}[]) => prev.concat({id: id, count: 1}))
    }

    const handleImageSlideMinus = (item:  string[], id: string) => {
        const find = image?.find((e: {id: string} ) => e.id === id)
        if (find) {
            if (find.count === 0) {
                image?.forEach(() => {
                    find.count = item?.length - 1
                })
                return;
            }
            const updateImage =  image?.map((e: {id: string, count: number}) => {
                if (e.id === id) {
                    e.id = id
                    e.count--
                }
                return e
            })
            setImage(updateImage)
            return
        }
        setImage((prev: {id: string, count: number}[]) => prev.concat({id: id, count: item?.length - 1}))
    }



    const handleClickCartQty = (id: string) => {
        const updateOrder = filterById(cartItems, id)
        dispatch(addToCart(updateOrder[0]))

    }
    const handleClickCartQtyMinus = (id: string) => {
        const updateOrder = filterById(cartItems, id)
        if (updateOrder[0]?.qty < 2) {
            return
        }
        dispatch(minusQty(updateOrder[0]))
    }

    const handleDeleteCart = (id: string) => {
        dispatch(deleteItem(id))
    }

    return (
     <>
         {cartItems?.length === 0 && (
             <div className='font-roboto_condensed mt-36'>
                 <h1 className={`${cartPath ? 'text-3xl' : 'text-xl'} text-center text-gray-300 `}>Cart Is Empty</h1>
             </div>
         )}
         {cartItems?.map((el: CartType, i: number) => {
             const imgCsr = image?.find((e: {id: string}) => e.id === el.id)
             return (
                 <div key={el.id}    className={`${cartPath ? ' min-h-[225px] border-t border-gray-500' : 'min-h-[137px] '} relative flex  divide-y  `}>
                     <div className={`${cartPath ? 'grid-cols-2' : 'grid-cols-2'} grid  group flex justify-between w-full h-full py-[21px]`}>
                         <section className='col-span-1 font-raleway'>
                             <h4 className={`${cartPath ? 'font-semibold text-3xl ' : 'font-light text-base'}  `}>{el?.brand}</h4>
                             <h3 className={`${cartPath ? 'font-normal text-3xl my-4' : 'font-light text-base'} `}>{el?.name}</h3>
                             <p className=' font-bold text-base my-4'><span>$</span>{el?.price}</p>
                             <div>
                                 {el?.defaultItems?.map((element: DefaultSizeType, i: number) => {
                                     return (
                                         <div key={i}>
                                             <p className='uppercase font-roboto_condensed font-bold mt-[12px] mb-[8px] '>{el.name && `${element.name}:`}</p>
                                             <div className='flex'>
                                                 {element.items?.map((e: ItemsType, i: number) => {
                                                     const index = takeSize?.map((e: any) => e.allDefaultSizes
                                                         ?.map((s: ItemsType) => ({nameId: e.id,...s})))
                                                         .flat()
                                                         .findIndex((sa: any) => (el.id === sa.nameId && sa.name === element.name && (sa.id === e.id || sa.id === e.value)))

                                                     if (element?.name === 'Color') {
                                                         return (
                                                             <button onClick={() => handlerUpdateCartValue(el?.id, element.name, e?.id)}  key={i} style={{backgroundColor: e.value}}
                                                                     className={`${(index >= 0) && 'scale-125 ml-1'}   ${cartPath ? ' w-[63px] h-[45px] mr-[12px]' : 'w-[24px] h-[24px] mr-[8px]'}  flex justify-center items-center border border-bor_gray`}>
                                                             </button>
                                                         )
                                                     }
                                                     return (
                                                         <button key={i} onClick={() => handlerUpdateCartValue(el?.id, element.name, e?.id)}
                                                                 className={`${(index >= 0) && 'bg-black text-white'} ${cartPath ? 'w-[63px] h-[45px] mr-[12px]' : 'min-w-[24px] h-[24px] text-sm'} mr-[8px]  flex justify-center items-center border border-bor_gray`}>
                                                                    <span  className='font-source_sans_pro text-base'>
                                                                        {e?.value}
                                                                    </span>
                                                         </button>

                                                     )
                                                 })}
                                             </div>
                                         </div>
                                     )
                                 })}
                             </div>
                         </section>
                         <div className={`absolute  z-20 top-2 right-0  h-auto flex justify-end items-center `}>
                             <button onClick={() => handleDeleteCart(el.id)}  className='w-7 h-7 flex justify-center items-center  hidden group-hover:inline-flex rounded-full bg-gray-600 hover:bg-red-500'>
                                 <p className='text-white font-raleway font-bold'>X</p>
                             </button>
                         </div>
                         <div className={`col-span-1 flex justify-end items-center h-full `}>
                             <div className='flex flex-col items-center justify-between mr-3'>
                                 <button onClick={() => handleClickCartQty(el.id)}  className={`${cartPath ? 'w-[45px] h-[45px]' : 'w-[24px] h-[24px]'} flex justify-center items-center border border-black`}>
                                        <img src={IMAGES.plus} className={`${cartPath ? 'w-[15px] h-[15px]' : 'w-[8px] h-[8px]'}`} alt='plus'/>
                                 </button>
                                 <span className={`${cartPath ? 'font-medium text-2xl' : 'text-base'} my-[30px] font-raleway `}>{el.qty}</span>
                                 <button onClick={() => handleClickCartQtyMinus(el.id)} className={`${cartPath ? 'w-[45px] h-[45px]' : 'w-[24px] h-[24px]'}  flex justify-center items-center   border border-black`}>
                                     <img src={IMAGES.minus} className={`${cartPath ? 'w-[15px] h-[15px]' : 'w-[8px] h-[8px]'}`}   alt='minus'/>
                                 </button>
                             </div>
                             {/* image navigation */}
                             <div className={`relative `}>
                                 <img src={imgCsr?.id === el?.id && el?.image[imgCsr?.count] || el?.image[0]}
                                      className={`${cartPath ? 'w-[141px] h-[185px]' : 'w-[105px] h-[137px]'}`}
                                      alt="img"
                                 />
                                 <div className='absolute top-0 w-full h-full flex items-center '>
                                     {(el?.image.length > 1) && (
                                         <span className={` flex w-full h-full justify-between `}>
                                                    <button onClick={() => handleImageSlideMinus(el?.image, el.id)} >
                                                        <img src={IMAGES.left} className='w-[20px] h-[20px]' alt="left" />
                                                    </button>
                                                    <button onClick={() => handleImageSlidePlus(el?.image, el.id)}>
                                                         <img src={IMAGES.left} alt="right"  className='rotate-180 w-[20px] h-[20px] '/>
                                                    </button>
                                               </span>
                                     )}
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>

                 )
         })}
     </>
  )
}
export default Cart