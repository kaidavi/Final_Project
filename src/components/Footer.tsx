
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Shop",
      items: [
        { name: "All Products", href: "/products" },
        { name: "Featured", href: "/products?featured=true" },
        { name: "New Arrivals", href: "/products?new=true" },
        { name: "Sale", href: "/products?sale=true" }
      ]
    },
    {
      title: "Company",
      items: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Store Locations", href: "/stores" },
        { name: "Our Responsibility", href: "/responsibility" }
      ]
    },
    {
      title: "Support",
      items: [
        { name: "Contact Us", href: "/contact" },
        { name: "FAQs", href: "/faq" },
        { name: "Shipping", href: "/shipping" },
        { name: "Returns", href: "/returns" }
      ]
    },
    {
      title: "Legal",
      items: [
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "Accessibility", href: "/accessibility" }
      ]
    }
  ];

  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="container px-4 md:px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-sm font-medium tracking-wide text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link 
                      to={item.href} 
                      className={cn(
                        "text-sm text-muted-foreground hover:text-foreground transition-colors"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link to="/" className="text-xl font-medium tracking-tight">
                <span className="text-primary">MINIMAL</span>
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {currentYear} Minimal. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
