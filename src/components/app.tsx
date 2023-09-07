import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import ScrollToTopBtn from "./menu/ScrollToTop";
import { ExploreScreen } from "./pages/explore";
import { AuctionsScreen } from "./pages/auctions";
import { SignInScreen } from "./pages/sign-in";
import { SignUpScreen } from "./pages/sign-up";
import { ArtistSignInScreen } from "./pages/artist-signin";
import { ArtistSignUpScreen } from "./pages/artist-signup";
import { ForgotPasswordScreen } from "./pages/forgot-password";
import Home from "./pages/home";
import JoinScreen from "./pages/join";
import CheckoutScreen from "./pages/checkout";
import CheckoutSuccessScreen from "./pages/success";
import Custom404Screen from "./pages/custom-404";
import ArtistScreen from "./pages/artist";
import { NftProjectScreen } from "./pages/project";
import { AuctionDetailScreen } from "./pages/auction";
import { MyAccountScreen } from "./pages/my-account";
import { ArtistAccountScreen } from "./pages/artist-account";

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export default function App() {
    return (
        <div className="wraper">
            <Router>
                <GlobalStyles />
                {/* <Header /> */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/join" element={<JoinScreen />} />
                    <Route path="/checkout/:id" element={<CheckoutScreen />} />
                    <Route path="/success" element={<CheckoutSuccessScreen />} />
                    <Route path="/artists" element={<ExploreScreen />} />
                    <Route path="/projects" element={<ExploreScreen />} />
                    <Route path="/nfts" element={<ExploreScreen />} />
                    <Route path="/nft-on-sale" element={<ExploreScreen />} />
                    <Route path="/auctions" element={<AuctionsScreen />} />
                    <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
                    <Route path="/sign-in" element={<SignInScreen />} />
                    <Route path="/sign-in/:signInMode" element={<SignInScreen />} />
                    <Route path="/sign-up/:step" element={<SignUpScreen />} />
                    <Route path="/artist-signin" element={<ArtistSignInScreen />} />
                    <Route path="/artist-signup/:step" element={<ArtistSignUpScreen />} />
                    <Route path="/project/:id" element={<NftProjectScreen />} />
                    <Route path="/artist/:id" element={<ArtistScreen />} />
                    <Route path="/auction/:id" element={<AuctionDetailScreen />} />
                    <Route path="/my-account" element={<MyAccountScreen />} />
                    <Route path="/artist-account" element={<ArtistAccountScreen />} />

                    {/* <Route
                        path="/collection/:collection"
                        element={
                            <PrivateRoute>
                                <Collection />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/ItemDetail/:collection/:id"
                        element={
                            <PrivateRoute>
                                <ItemDetail />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/Author"
                        element={
                            <PrivateRoute>
                                <Author />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/create/collection"
                        element={
                            <PrivateRoute>
                                <CreateCollection />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/create/nft"
                        element={
                            <PrivateRoute>
                                <Create />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/lazy-mint"
                        element={
                            <PrivateRoute>
                                <LazyCreate />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/Auction/:collection/:id"
                        element={
                            <PrivateRoute>
                                <Auction />
                            </PrivateRoute>
                        }
                    /> */}
                    <Route
                        path="*"
                        element={<Custom404Screen />}
                    />
                    <Route
                        path="/404"
                        element={<Custom404Screen />}
                    />
                </Routes>
                <ScrollToTopBtn />
            </Router>
        </div>
    );
}
