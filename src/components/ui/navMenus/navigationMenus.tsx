import Link from "next/link"

export const NavigationMenus = () => {
    return (
        <div className="app-menu navbar-menu">
            <div className="navbar-brand-box">
                <a href="index.html" className="logo logo-dark">
                    <span className="logo-sm">
                        {/* <img src="./images/logo-sm.png" alt="" height="22" /> */}
                    </span>
                    <span className="logo-lg">
                        <img src="./images/logo-dark.png" alt="" height="17" />
                    </span>
                </a>
                <a href="index.html" className="logo logo-light">
                    <span className="logo-sm">
                        <img src="./images/logo-sm.png" alt="" height="22" />
                    </span>
                    <span className="logo-lg">
                        <img src="./images/logo-light.png" alt="" height="17" />
                    </span>
                </a>
                <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
                    <i className="ri-record-circle-line"></i>
                </button>
            </div>

            <div id="scrollbar">
                <div className="container-fluid">

                    <div id="two-column-menu">
                    </div>
                    <ul className="navbar-nav" id="navbar-nav">
                        <li className="menu-title"><span data-key="t-menu">Menu</span></li>

                        <li className="nav-item">
                            <Link className="nav-link menu-link" href="/app">
                                <i className="ri-dashboard-2-line"></i> <span data-key="t-widgets">Dashboards</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link menu-link" href="#sidebarBatteries" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarApps">
                                <i className="ri-battery-2-charge-line"></i> <span data-key="t-batteries">Batteries</span>
                            </Link>
                            <div className="collapse menu-dropdown" id="sidebarBatteries">
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <Link href="/app/batteries" className="nav-link" data-key="t-batteries-all"> Batteries </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/app/battery-types" className="nav-link" data-key="t-batteries-type"> Battery Types </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link menu-link" href="#mobility" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarApps">
                                <i className="ri-device-line"></i> <span data-key="t-apps">Mobility Devices</span>
                            </Link>
                            <div className="collapse menu-dropdown" id="mobility">
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <Link href="/app/mobility-devices" className="nav-link" data-key="t-wallet-activity"> All Mobility devices </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/app/mobility-devices/mobility-types" className="nav-link" data-key="t-users"> Mobility device types </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link menu-link" href="/app/charging-stations">
                                <i className="ri-device-line"></i> <span data-key="t-widgets">Charging Stations</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link menu-link" href="/app/transactions">
                                <i className="ri-device-line"></i> <span data-key="t-widgets">Transactions</span>
                            </Link>
                        </li>


                        {/* <li className="nav-item">
                            <Link className="nav-link menu-link" href="#sidebarAccounts" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarApps">
                                <i className="ri-account-box-line"></i> <span data-key="t-apps">Accounts</span>
                            </Link>
                            <div className="collapse menu-dropdown" id="sidebarAccounts">
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <Link href="/app/accounts/wallet-activity" className="nav-link" data-key="t-wallet-activity"> Wallet Activity </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/app/accounts/users-activity" className="nav-link" data-key="t-users"> Users </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/app/accounts/" className="nav-link"> <span data-key="t-financial-positions">Financial Positions</span></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/app/accounts/activity" className="nav-link"> <span data-key="t-activity">Activity</span></Link>
                                    </li>
                                </ul>
                            </div>
                        </li> */}

                        <li className="nav-item">
                            <Link className="nav-link menu-link" href="#admin" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarApps">
                                <i className="ri-admin-line"></i> <span data-key="t-apps">Admin</span>
                            </Link>
                            <div className="collapse menu-dropdown" id="admin">
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <Link href="/app/admin" className="nav-link" data-key="t-wallet-activity"> Admin </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/app/admin/admin-roles" className="nav-link" data-key="t-users"> Admin roles </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/app/admin/users" className="nav-link" data-key="t-users"> Users </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link menu-link" href="/app/hotlisting">
                                <i className="ri-file-list-3-line"></i> <span data-key="t-widgets">Hot Listing</span>
                            </Link>
                        </li>

                        {/* <li className="nav-item">
                            <a className="nav-link menu-link" href="#sidebarApps" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarApps">
                                <i className="ri-apps-2-line"></i> <span data-key="t-apps">Apps</span>
                            </a>
                            <div className="collapse menu-dropdown" id="sidebarApps">
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <a href="apps-calendar.html" className="nav-link" data-key="t-calendar"> Calendar </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="apps-chat.html" className="nav-link" data-key="t-chat"> Chat </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#sidebarEmail" className="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarEmail" data-key="t-email">
                                            Email
                                        </a>
                                        <div className="collapse menu-dropdown" id="sidebarEmail">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <a href="apps-mailbox.html" className="nav-link" data-key="t-mailbox"> Mailbox </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#sidebaremailTemplates" className="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebaremailTemplates" data-key="t-email-templates">
                                                        Email Templates
                                                    </a>
                                                    <div className="collapse menu-dropdown" id="sidebaremailTemplates">
                                                        <ul className="nav nav-sm flex-column">
                                                            <li className="nav-item">
                                                                <a href="apps-email-basic.html" className="nav-link" data-key="t-basic-action"> Basic Action </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a href="apps-email-ecommerce.html" className="nav-link" data-key="t-ecommerce-action"> Ecommerce Action </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#sidebarEcommerce" className="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarEcommerce" data-key="t-ecommerce">
                                            Ecommerce
                                        </a>
                                        <div className="collapse menu-dropdown" id="sidebarEcommerce">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <a href="apps-ecommerce-products.html" className="nav-link" data-key="t-products"> Products </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-ecommerce-product-details.html" className="nav-link" data-key="t-product-Details"> Product Details </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-ecommerce-add-product.html" className="nav-link" data-key="t-create-product"> Create Product </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-ecommerce-orders.html" className="nav-link" data-key="t-orders">
                                                        Orders </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-ecommerce-order-details.html" className="nav-link" data-key="t-order-details"> Order Details </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-ecommerce-customers.html" className="nav-link" data-key="t-customers"> Customers </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-ecommerce-cart.html" className="nav-link" data-key="t-shopping-cart"> Shopping Cart </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-ecommerce-checkout.html" className="nav-link" data-key="t-checkout"> Checkout </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-ecommerce-sellers.html" className="nav-link" data-key="t-sellers">
                                                        Sellers </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-ecommerce-seller-details.html" className="nav-link" data-key="t-sellers-details"> Seller Details </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#sidebarProjects" className="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarProjects" data-key="t-projects">
                                            Projects
                                        </a>
                                        <div className="collapse menu-dropdown" id="sidebarProjects">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <a href="apps-projects-list.html" className="nav-link" data-key="t-list"> List
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-projects-overview.html" className="nav-link" data-key="t-overview"> Overview </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-projects-create.html" className="nav-link" data-key="t-create-project"> Create Project </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#sidebarTasks" className="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarTasks" data-key="t-tasks"> Tasks
                                        </a>
                                        <div className="collapse menu-dropdown" id="sidebarTasks">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <a href="apps-tasks-kanban.html" className="nav-link" data-key="t-kanbanboard">
                                                        Kanban Board </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-tasks-list-view.html" className="nav-link" data-key="t-list-view">
                                                        List View </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-tasks-details.html" className="nav-link" data-key="t-task-details"> Task Details </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#sidebarCRM" className="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarCRM" data-key="t-crm"> CRM
                                        </a>
                                        <div className="collapse menu-dropdown" id="sidebarCRM">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <a href="apps-crm-contacts.html" className="nav-link" data-key="t-contacts">
                                                        Contacts </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-crm-companies.html" className="nav-link" data-key="t-companies">
                                                        Companies </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-crm-deals.html" className="nav-link" data-key="t-deals"> Deals
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-crm-leads.html" className="nav-link" data-key="t-leads"> Leads
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#sidebarCrypto" className="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarCrypto" data-key="t-crypto"> Crypto
                                        </a>
                                        <div className="collapse menu-dropdown" id="sidebarCrypto">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <a href="apps-crypto-transactions.html" className="nav-link" data-key="t-transactions"> Transactions </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-crypto-buy-sell.html" className="nav-link" data-key="t-buy-sell">
                                                        Buy & Sell </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-crypto-orders.html" className="nav-link" data-key="t-orders">
                                                        Orders </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-crypto-wallet.html" className="nav-link" data-key="t-my-wallet">
                                                        My Wallet </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-crypto-ico.html" className="nav-link" data-key="t-ico-list"> ICO
                                                        List </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-crypto-kyc.html" className="nav-link" data-key="t-kyc-application"> KYC Application </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#sidebarInvoices" className="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarInvoices" data-key="t-invoices">
                                            Invoices
                                        </a>
                                        <div className="collapse menu-dropdown" id="sidebarInvoices">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <a href="apps-invoices-list.html" className="nav-link" data-key="t-list-view">
                                                        List View </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-invoices-details.html" className="nav-link" data-key="t-details">
                                                        Details </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-invoices-create.html" className="nav-link" data-key="t-create-invoice"> Create Invoice </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#sidebarTickets" className="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarTickets" data-key="t-supprt-tickets">
                                            Support Tickets
                                        </a>
                                        <div className="collapse menu-dropdown" id="sidebarTickets">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <a href="apps-tickets-list.html" className="nav-link" data-key="t-list-view">
                                                        List View </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-tickets-details.html" className="nav-link" data-key="t-ticket-details"> Ticket Details </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#sidebarnft" className="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarnft" data-key="t-nft-marketplace">
                                            NFT Marketplace
                                        </a>
                                        <div className="collapse menu-dropdown" id="sidebarnft">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <a href="apps-nft-marketplace.html" className="nav-link" data-key="t-marketplace"> Marketplace </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-nft-explore.html" className="nav-link" data-key="t-explore-now"> Explore Now </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-nft-auction.html" className="nav-link" data-key="t-live-auction"> Live Auction </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-nft-item-details.html" className="nav-link" data-key="t-item-details"> Item Details </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-nft-collections.html" className="nav-link" data-key="t-collections"> Collections </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-nft-creators.html" className="nav-link" data-key="t-creators"> Creators </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-nft-ranking.html" className="nav-link" data-key="t-ranking"> Ranking </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-nft-wallet.html" className="nav-link" data-key="t-wallet-connect"> Wallet Connect </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-nft-create.html" className="nav-link" data-key="t-create-nft"> Create NFT </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="apps-file-manager.html" className="nav-link"> <span data-key="t-file-manager">File Manager</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="apps-todo.html" className="nav-link"> <span data-key="t-to-do">To Do</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#sidebarjobs" className="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarjobs"> <span data-key="t-jobs">Jobs</span> <span className="badge badge-pill bg-success" data-key="t-new">New</span></a>
                                        <div className="collapse menu-dropdown" id="sidebarjobs">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <a href="apps-job-statistics.html" className="nav-link" data-key="t-candidate-list"> Statistics </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#sidebarJoblists" className="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarJoblists" data-key="t-job-lists">
                                                        Job Lists
                                                    </a>
                                                    <div className="collapse menu-dropdown" id="sidebarJoblists">
                                                        <ul className="nav nav-sm flex-column">
                                                            <li className="nav-item">
                                                                <a href="apps-job-lists.html" className="nav-link" data-key="t-list"> List
                                                                </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a href="apps-job-grid-lists.html" className="nav-link" data-key="t-grid"> Grid </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a href="apps-job-details.html" className="nav-link" data-key="t-overview"> Overview</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#sidebarCandidatelists" className="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarCandidatelists" data-key="t-candidate-lists">
                                                        Candidate Lists
                                                    </a>
                                                    <div className="collapse menu-dropdown" id="sidebarCandidatelists">
                                                        <ul className="nav nav-sm flex-column">
                                                            <li className="nav-item">
                                                                <a href="apps-job-candidate-lists.html" className="nav-link" data-key="t-list-view"> List View
                                                                </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a href="apps-job-candidate-grid.html" className="nav-link" data-key="t-grid-view"> Grid View</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-job-application.html" className="nav-link" data-key="t-application"> Application </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-job-new.html" className="nav-link" data-key="t-new-job"> New Job </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-job-companies-lists.html" className="nav-link" data-key="t-companies-list"> Companies List </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="apps-job-categories.html" className="nav-link" data-key="t-job-categories"> Job Categories</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="apps-api-key.html" className="nav-link"> <span data-key="t-api-key">API Key</span> <span className="badge badge-pill bg-success" data-key="t-new">New</span></a>
                                    </li>
                                </ul>
                            </div>
                        </li> */}

                    </ul>
                </div>
            </div>

            <div className="sidebar-background"></div>
        </div>
    )
}