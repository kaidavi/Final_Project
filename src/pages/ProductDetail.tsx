
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "@/lib/data";
import { ArrowLeft, Star, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(id ? getProductById(id) : null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    // Set default selections when product loads
    if (product) {
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      
      // Scroll to top when product changes
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-medium">Product Not Found</h1>
            <p className="text-muted-foreground mt-2">
              The product you're looking for doesn't exist
            </p>
            <Link to="/products">
              <Button variant="link" className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          {/* Breadcrumbs */}
          <nav className="mb-4 md:mb-6 flex items-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link to="/products" className="hover:text-foreground">Products</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link 
              to={`/products?category=${product.category}`} 
              className="hover:text-foreground capitalize"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="truncate">{product.name}</span>
          </nav>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Product Image */}
            <div className="overflow-hidden rounded-lg bg-secondary/30 animate-fade-in">
              <AspectRatio ratio={1} className="bg-secondary/50">
                <div className={cn(
                  "w-full h-full relative",
                  !isImageLoaded ? "image-loading" : ""
                )}>
                  <img
                    src={product.image}
                    alt={product.name}
                    onLoad={() => setIsImageLoaded(true)}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      isImageLoaded ? "opacity-100" : "opacity-0"
                    )}
                  />
                </div>
              </AspectRatio>
            </div>
            
            {/* Product Details */}
            <div className="animate-slide-up">
              <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
                {product.name}
              </h1>
              
              <div className="mt-4 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4 mr-0.5",
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : i < product.rating
                          ? "fill-primary/50 text-primary"
                          : "fill-muted text-muted"
                      )}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium">{product.rating}</span>
                <span className="mx-2 text-muted-foreground">·</span>
                <span className="text-sm text-muted-foreground">
                  {product.reviews} reviews
                </span>
              </div>
              
              <div className="mt-4">
                <p className="text-2xl font-medium">${product.price.toFixed(2)}</p>
              </div>
              
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Description</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
                
                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-3">Color</h3>
                    <div className="flex flex-wrap gap-3">
                      {product.colors.map((color) => (
                        <Button
                          key={color}
                          type="button"
                          variant={selectedColor === color ? "default" : "outline"}
                          onClick={() => setSelectedColor(color)}
                          className={cn(
                            "rounded-md px-3 py-1 h-auto text-sm",
                            selectedColor === color ? "bg-primary text-primary-foreground" : ""
                          )}
                        >
                          {color}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-3">Size</h3>
                    <div className="flex flex-wrap gap-3">
                      {product.sizes.map((size) => (
                        <Button
                          key={size}
                          type="button"
                          variant={selectedSize === size ? "default" : "outline"}
                          onClick={() => setSelectedSize(size)}
                          className={cn(
                            "rounded-md min-w-[40px] px-3 py-1 h-auto text-sm",
                            selectedSize === size ? "bg-primary text-primary-foreground" : ""
                          )}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Add to Cart */}
                <div className="pt-4">
                  <AddToCartButton 
                    product={product} 
                    showQuantity={true} 
                    className="w-full md:w-auto md:min-w-[200px]" 
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="returns">Returns</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="py-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Product Features</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>Premium quality materials for durability</li>
                      <li>Minimalist design that fits any style</li>
                      <li>Crafted with attention to detail</li>
                      <li>Designed for everyday use</li>
                      <li>Timeless aesthetic that won't go out of style</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Specifications</h3>
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <div className="text-muted-foreground">Category</div>
                      <div className="capitalize">{product.category}</div>
                      <div className="text-muted-foreground">Available Colors</div>
                      <div>{product.colors?.join(", ")}</div>
                      {product.sizes && (
                        <>
                          <div className="text-muted-foreground">Available Sizes</div>
                          <div>{product.sizes.join(", ")}</div>
                        </>
                      )}
                      <div className="text-muted-foreground">In Stock</div>
                      <div>{product.inStock ? "Yes" : "No"}</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="py-6">
                <div className="max-w-2xl">
                  <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      We offer free standard shipping on all orders over $50. For orders under $50, 
                      standard shipping is $5.99.
                    </p>
                    <p>
                      Standard shipping typically takes 3-5 business days, depending on your location.
                      Express shipping is available for an additional cost and typically arrives within 
                      1-2 business days.
                    </p>
                    <p>
                      All orders are processed within 1-2 business days. Orders placed after 2 PM EST 
                      will be processed the next business day.
                    </p>
                    <p>
                      International shipping is available to select countries. Shipping times and costs 
                      vary by location.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="returns" className="py-6">
                <div className="max-w-2xl">
                  <h3 className="text-lg font-medium mb-4">Returns & Exchanges</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      We accept returns within 30 days of delivery for a full refund or exchange.
                    </p>
                    <p>
                      To be eligible for a return, your item must be unused and in the same condition 
                      that you received it. It must also be in the original packaging.
                    </p>
                    <p>
                      To initiate a return, please email us at support@minimal.com with your order number
                      and reason for return. Once your return is received and inspected, we will send you
                      an email to notify you that we have received your returned item. We will also notify 
                      you of the approval or rejection of your refund.
                    </p>
                    <p>
                      If approved, your refund will be processed, and a credit will automatically be 
                      applied to your original method of payment within 5-7 business days.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
