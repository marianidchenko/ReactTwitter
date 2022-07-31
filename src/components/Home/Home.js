import { Fragment } from "react"
import { Feed } from "../Feed/Feed"
import { LeftSidebar } from "../LeftSidebar/LeftSidebar"
import { RightSidebar } from "../RightSidebar/RightSidebar"

export const Home = () => {
    return (
        <Fragment>
            <LeftSidebar />
            <Feed />
            <RightSidebar />
        </Fragment>
    )
}