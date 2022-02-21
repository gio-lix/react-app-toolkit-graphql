import React, {FC} from "react"
import Header from "./Header";

interface ILayout {

}

const Layout: FC<ILayout> = ({children}) => {
    return (
        <div  className='max-w-[1440px] max-h-[1513px] mx-auto px-28'>
            <Header />
            <div>
                {children}
            </div>
        </div>
    )
}
export default Layout