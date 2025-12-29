"use client";

import { Book, Menu, ShoppingCart, Sunset, Trees, Zap, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/app/store/cartStore";
import useSWR from "swr";
import axios from "axios";

// SWR fetcher with credentials (for cookies)
const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true,
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    
   }).then((res) => res.data);

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "/logo.png",
    alt: "logo",
    title: "Zaheen Knitwears",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "About Us", url: "/about" },
    {
      title: "Our Products",
      url: "/products",
      items: [
        { title: "All Products", url: "/products", icon: <Book className="size-5" /> },
        { title: "T-Shirts", url: "/products?category=tshirts", icon: <Trees className="size-5" /> },
        { title: "Hoodies", url: "/products?category=hoodies", icon: <Sunset className="size-5" /> },
        { title: "New Arrivals", url: "/products?sort=newest", icon: <Zap className="size-5" /> },
      ],
    },
    { title: "Blogs", url: "/blogs" },
    { title: "Contact", url: "/contact" },
  ],
  className,
}: Navbar1Props) => {
  const pathname = usePathname();
  const hiddenPaths = ['/login', '/signup', '/dashboard', '/admin'];
  
  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  // Zustand: Cart items count
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // SWR: Fetch current user
  const { data, error, isLoading } = useSWR(
    'https://zaheen-knitwears-backend.vercel.app/api/v1/auth/me',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  const user: User | null = data?.success ? data.data : null;
  const isLoggedIn = !!user;

  // Logout handler
  const handleLogout = async () => {
    await axios.post('/api/auth/logout', {}, { withCredentials: true });
    window.location.href = '/';
  };

  return (
    <section className={cn(
      "container mx-auto fixed top-0 z-50 right-0 left-0 gap-4 bg-background/95 px-4 py-3 shadow-md backdrop-blur supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      <div className="flex items-center justify-between">
        {/* Desktop Navbar */}
        <nav className="hidden lg:flex items-center justify-between w-full">
          {/* Left: Logo + Menu */}
          <div className="flex items-center gap-8">
            <Link href={logo.url} className="flex items-center gap-3">
              <img src={logo.src} className="h-10 dark:invert" alt={logo.alt} />
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right: Cart + Profile/Login */}
          <div className="flex items-center gap-4">
            {/* Cart Icon with Badge */}
            <Button variant="outline" size="icon" asChild className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>

            {/* Profile Dropdown or Login */}
            {isLoading ? (
              <Button variant="outline" size="sm" disabled>
                Loading...
              </Button>
            ) : isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="flex items-center">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  {user.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center">
                        <Zap className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </nav>

        {/* Mobile Navbar */}
        <div className="flex lg:hidden items-center justify-between w-full">
          <Link href="/" className="flex items-center">
            <img src={logo.src} className="h-8 dark:invert" alt={logo.alt} />
          </Link>

          <div className="flex items-center gap-3">
            {/* Mobile Cart Icon */}
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                      <img src={logo.src} className="h-8" alt="Logo" />
                      <span className="font-bold">Zaheen Knitwears</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-8 flex flex-col gap-6">
                  <Accordion type="single" collapsible className="w-full">
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="space-y-3 pt-6 border-t">
                    {isLoggedIn ? (
                      <>
                        <div className="pb-4">
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/profile">My Profile</Link>
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/orders">My Orders</Link>
                        </Button>
                        <Button variant="destructive" className="w-full" onClick={handleLogout}>
                          <LogOut className="mr-2 h-4 w-4" /> Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button className="w-full" asChild>
                          <Link href="/login">Login</Link>
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/signup">Sign Up</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

// Keep your existing renderMenuItem, renderMobileMenuItem, SubMenuLink unchanged
// ... (same as before)



const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar };
