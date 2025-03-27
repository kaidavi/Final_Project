
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { categories } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const { getCartCount } = useCart();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic or redirect to search results
    console.log("Search for:", searchQuery);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "py-3 bg-white/80 backdrop-blur-lg shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-medium tracking-tight"
          >
            <span className="text-primary">MINIMAL</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {categories.slice(0, 5).map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative",
                  location.pathname.includes(`/products`) && location.search.includes(`category=${category.id}`) 
                    ? "text-primary after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:content-[''] after:transition-transform" 
                    : "text-muted-foreground"
                )}
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Desktop */}
            <div className="hidden md:flex relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center transition-all">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-[200px] h-9 focus-visible:ring-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-1 h-9 w-9"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </form>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsSearchOpen(true)}
                  className="h-9 w-9"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Account */}
            <Link to="/account">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ShoppingCart className="h-5 w-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden h-9 w-9"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[56px] bg-white z-40 animate-fade-in">
            <div className="container mx-auto px-4 pt-6 pb-20 flex flex-col h-full">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col space-y-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/products?category=${category.id}`}
                    className={cn(
                      "text-base py-2 border-b border-border transition-colors",
                      location.pathname.includes(`/products`) && location.search.includes(`category=${category.id}`) 
                        ? "text-primary font-medium" 
                        : "text-foreground"
                    )}
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile additional links */}
              <div className="mt-auto pt-6 border-t border-border">
                <Link
                  to="/account"
                  className="flex items-center py-3 text-base text-foreground"
                >
                  <User className="mr-3 h-5 w-5" />
                  My Account
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
