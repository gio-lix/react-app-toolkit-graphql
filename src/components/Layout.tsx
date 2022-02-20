import {FC} from "react"

interface ILayout {

}

const Layout: FC<ILayout> = ({children}) => {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            Home
                        </li>
                    </ul>
                </nav>
            </header>
            <div>
                {children}
            </div>
        </>
    )
}
export default Layout