
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeaturedProducts from "@/components/FeaturedProducts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 pb-12 md:pb-16 lg:pb-24 overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div 
              className="animate-slide-down"
              style={{ animationDelay: '0.1s' }}
            >
              <h1 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
                Refined Elegance for Modern Living
              </h1>
            </div>
            
            <div 
              className="mt-6 text-lg text-muted-foreground max-w-xl animate-slide-down"
              style={{ animationDelay: '0.3s' }}
            >
              <p>
                Curated collection of minimalist essentials designed for simplicity,
                functionality, and timeless elegance.
              </p>
            </div>
            
            <div 
              className="mt-8 flex flex-col sm:flex-row gap-4 animate-slide-down"
              style={{ animationDelay: '0.5s' }}
            >
              <Link to="/products">
                <Button size="lg" className="min-w-[160px]">
                  Shop Now
                </Button>
              </Link>
              <Link to="/products?category=featured">
                <Button variant="outline" size="lg" className="min-w-[160px] group">
                  Explore Collections
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background Design Elements */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ 
            transform: `translateY(${scrollY * 0.1}px)`,
            opacity: Math.max(0, 1 - scrollY * 0.002)
          }}
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-3xl font-medium tracking-tight">Shop by Category</h2>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              Explore our carefully curated product categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Essential Electronics",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
                href: "/products?category=electronics"
              },
              {
                title: "Modern Apparel",
                image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
                href: "/products?category=clothing"
              },
              {
                title: "Home & Living",
                image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
                href: "/products?category=home"
              }
            ].map((category, index) => (
              <Link 
                key={index} 
                to={category.href}
                className={cn(
                  "group relative overflow-hidden rounded-lg",
                  "transition-all duration-500 ease-out transform hover:-translate-y-2"
                )}
              >
                <div className="aspect-[3/4]">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/5 opacity-80"></div>
                  <div className="absolute inset-0 flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2">{category.title}</h3>
                      <span className="inline-flex items-center text-sm text-white/90 group-hover:underline">
                        Shop collection <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <FeaturedProducts />
      
      {/* Brand Values Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-medium tracking-tight">Our Principles</h2>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              The values that guide our approach to design and creation
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Minimalist Design",
                description: "Products that embody simplicity and purpose, eliminating the unnecessary."
              },
              {
                title: "Quality Materials",
                description: "Carefully selected materials that ensure longevity and enhance the user experience."
              },
              {
                title: "Ethical Production",
                description: "Ethical manufacturing practices that respect both people and the environment."
              },
              {
                title: "Timeless Aesthetic",
                description: "Designs that transcend trends, remaining relevant and beautiful for years."
              }
            ].map((value, index) => (
              <div key={index} className="flex flex-col items-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary"></div>
                </div>
                <h3 className="text-lg font-medium mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-medium tracking-tight">Stay Informed</h2>
            <p className="mt-2 text-muted-foreground">
              Subscribe to receive updates on new products and exclusive offers
            </p>
            
            <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
              <Button type="submit" className="sm:w-auto">
                Subscribe
              </Button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
