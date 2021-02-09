
import {useEffect} from 'react'
import './App.css';
import CookieConsent, { Cookies, getCookieConsentValue } from "react-cookie-consent";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from './Home'
import Impressum from './Impressum'
import * as ReactGA from "react-ga";


function App() {
    Cookies.set("test", "nice");

    const initGA = (id: string) => {
        // if (process.env.NODE_ENV === "production") {
            ReactGA.initialize(id);
        // }
    };

    const handleAcceptCookie = () => {
        if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
            initGA(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
        }
    };

    const handleDeclineCookie = () => {
        //remove google analytics cookies
        Cookies.remove("_ga");
        Cookies.remove("_gat");
        Cookies.remove("_gid");
    };

    useEffect(() => {
        const isConsent = getCookieConsentValue();
        if (isConsent) {
            handleAcceptCookie();
        }
    }, []);

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/impressum" component={Impressum}/>
                </Switch>
            </Router>

            <CookieConsent
                onAccept={handleAcceptCookie}
                debug={true}
                enableDeclineButton
                declineButtonText="Decline (optional)"
                onDecline={handleDeclineCookie}
            >
                This website uses cookies to enhance the user experience.{" "}
                <span style={{ fontSize: "10px" }}>
                    This bit of text is smaller :O
                </span>
            </CookieConsent>

        </div>
  );
}

export default App;






