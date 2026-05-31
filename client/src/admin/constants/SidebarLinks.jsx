import {
    LayoutDashboard,
    Users,
    ShoppingBasket,
    Package,
    ClipboardList
} from 'lucide-react';


export const sidebarLinks=[
    {
        title:"DashBoard",
        path:"/admin/dashboard",
        icon:LayoutDashboard,
    },
     {
        title:"Farmers",
        path:"/admin/farmers",
        icon:Users,
    },
     {
        title:"Buyers",
        path:"/admin/buyers",
        icon:ShoppingBasket,
    },
     {
        title:"Products",
        path:"/admin/products",
        icon:Package,
    },
     {
        title:"Orders",
        path:"/admin/orders",
        icon:ClipboardList,
    },
]

