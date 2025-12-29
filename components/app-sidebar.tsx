// components/app-sidebar.tsx
"use client";

import * as React from "react";
import {
  GalleryVerticalEnd,
  Minus,
  Plus,
  Package,
  ShoppingBag,
  Users,
  Home,
  Settings,
  User,
  LogOut,
} from "lucide-react";

import { SearchForm } from "@/components/search-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import axios from "axios";

// Fixed fetcher - only use withCredentials (no localStorage token!)
const fetcher = (url: string) =>
  axios
    .get(url, { withCredentials: true,

       headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`}
      
     })
    .then((res) => {
      if (!res.data.success) throw new Error(res.data.message || "Unauthorized");
      return res.data;
    });

interface NavItem {
  title: string;
  url: string;
  icon?: React.ReactElement;
  items?: {
    title: string;
    url: string;
  }[];
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const { data, isLoading } = useSWR('https://zaheen-knitwears-backend.vercel.app/api/v1/auth/me', fetcher);
  const user = data?.data;
  const isAdmin = user?.role === 'admin';
  // const isAdmin =true

  const adminNav: NavItem[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: <Package className="h-5 w-5" />,
      items: [
        { title: "All Products", url: "/dashboard/products" },
        { title: "Add Product", url: "/dashboard/products/new" },
        { title: "Categories", url: "/dashboard/categories" },
      ],
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: <ShoppingBag className="h-5 w-5" />,
      items: [
        { title: "All Orders", url: "/dashboard/orders" },
        { title: "Pending", url: "/dashboard/orders?status=pending" },
        { title: "Processing", url: "/dashboard/orders?status=processing" },
      ],
    },
    {
      title: "Customers",
      url: "/dashboard/customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const userNav: NavItem[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "My Orders",
      url: "/dashboard/orders",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const navMain = isAdmin ? adminNav : userNav;

  if (isLoading) {
    return (
      <Sidebar {...props}>
        <SidebarHeader className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded mx-4" />
        </SidebarHeader>
        <SidebarContent className="p-4 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded" />
          ))}
        </SidebarContent>
      </Sidebar>
    );
  }

  if (!user) {
    return null; // Not logged in
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GalleryVerticalEnd className="size-6" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Zaheen Knitwears</span>
                  <span className="truncate text-xs capitalize">{user.role} Panel</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {navMain.map((item) => {
              const hasItems = !!item.items && item.items.length > 0;
              const isActive = pathname === item.url || (hasItems && item.items.some(sub => pathname.startsWith(sub.url)));

              return (
                <Collapsible
                  key={item.title}
                  defaultOpen={isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    {hasItems ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title} isActive={isActive}>
                            {item.icon}
                            <Link href={item.url} className="flex-1 text-left">
                              <span>{item.title}</span>
                            </Link>
                            <Plus className="ml-auto h-4 w-4" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild isActive={pathname.startsWith(subItem.url)}>
                                  <Link href={subItem.url}>{subItem.title}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : (
                      <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                        <Link href={item.url} className="flex items-center gap-2">
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-auto pb-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="text-red-600 hover:bg-red-50">
                <Link href="/api/auth/logout">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}