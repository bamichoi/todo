import {BrowserRouter, Switch, Route} from "react-router-dom";
import Coins from "./routes/Coins"
import Coin from "./routes/Coin"

interface IRouterProps {
    toggleTheme: () => void;
    theme: string;
}


function Router({ toggleTheme, theme }:IRouterProps) {
    return <BrowserRouter>
        <Switch>
            <Route path="/:coinId">
                <Coin toggleTheme={toggleTheme} theme={theme}/>
            </Route>
            <Route path="/">
                <Coins toggleTheme={toggleTheme} theme={theme}/>
            </Route>
        </Switch>
    </BrowserRouter>
}

export default Router;