import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Home from "../component/Home";
import My from "../component/My";
import Content from "../component/Content";
import Evaluate from "../component/Evaluate";

const path = [
    { path: "/home", component: Home },
    { path: "/my", component: My },
    { path: "/content", component: Content },
    { path: "/evaluate", component: Evaluate },
    { path: "*", redirect: "/home" },
]
const router = () => {
    return (
        <div>
            <Switch>
                {
                    path.map((val, index) => {
                        if (val.path === "*") {
                            return <Redirect path={val.path} to={val.redirect} key={index}></Redirect>
                        } else {
                            return <Route path={val.path} component={val.component} key={index}></Route>
                        }
                    })
                }
            </Switch>
        </div>
    )
}
export default router