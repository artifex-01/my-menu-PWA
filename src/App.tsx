import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route, Redirect, Switch } from 'react-router-dom'

// Pages
import LoginPage from './pages/LoginPage'
import OTPPage from './pages/OTPPage'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import OrdersPage from './pages/OrdersPage'
import FavoritesPage from './pages/FavoritesPage'
import ProfilePage from './pages/ProfilePage'
import RestaurantDetailPage from './pages/RestaurantDetailPage'
import CartPage from './pages/CartPage'
import QRScanPage from './pages/QRScanPage'
import OrderStatusPage from './pages/OrderStatusPage'
import PaymentPage from './pages/PaymentPage'
import AllRestaurantsPage from './pages/AllRestaurantsPage'
import NotificationsPage from './pages/NotificationsPage'
import NotificationSettingsPage from './pages/NotificationSettingsPage'
import PaymentMethodsPage from './pages/PaymentMethodsPage'
import HelpPage from './pages/HelpPage'
import PrivacyPage from './pages/PrivacyPage'
import MyReviewsPage from './pages/MyReviewsPage'

// Components
import BottomNav from './components/BottomNav'

// Layout wrapper for pages with navigation
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="app-shell">
            <BottomNav />
            <div className="main-content-area">
                {children}
            </div>
        </div>
    )
}

const App: React.FC = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Switch>
                        {/* Auth Routes */}
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/otp" component={OTPPage} />

                        {/* Main Tab Routes with Bottom Nav */}
                        <Route exact path="/app/home">
                            <MainLayout><HomePage /></MainLayout>
                        </Route>
                        <Route exact path="/app/explore">
                            <MainLayout><SearchPage /></MainLayout>
                        </Route>
                        <Route exact path="/app/favorites">
                            <MainLayout><FavoritesPage /></MainLayout>
                        </Route>
                        <Route exact path="/app/orders">
                            <MainLayout><OrdersPage /></MainLayout>
                        </Route>
                        <Route exact path="/app/profile">
                            <MainLayout><ProfilePage /></MainLayout>
                        </Route>

                        {/* Detail Routes (no bottom nav) */}
                        <Route exact path="/restaurant/:id" component={RestaurantDetailPage} />
                        <Route exact path="/cart" component={CartPage} />
                        <Route exact path="/order-status" component={OrderStatusPage} />
                        <Route exact path="/payment" component={PaymentPage} />
                        <Route exact path="/qr-scan" component={QRScanPage} />
                        <Route exact path="/all-restaurants" component={AllRestaurantsPage} />
                        <Route exact path="/notifications" component={NotificationsPage} />
                        <Route exact path="/notification-settings" component={NotificationSettingsPage} />
                        <Route exact path="/payment-methods" component={PaymentMethodsPage} />
                        <Route exact path="/help" component={HelpPage} />
                        <Route exact path="/privacy" component={PrivacyPage} />
                        <Route exact path="/my-reviews" component={MyReviewsPage} />

                        {/* Redirects */}
                        <Route exact path="/app">
                            <Redirect to="/app/home" />
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/login" />
                        </Route>
                    </Switch>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    )
}

export default App
