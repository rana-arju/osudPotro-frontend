'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Gift, Truck, ShoppingCart } from 'lucide-react';

export default function PromoSection() {
  return (
    <section className="py-12  bg-muted/50 dark:bg-gray-900">
      <div className="custom-container mx-auto text-center">
        <motion.h2 
          className="text-3xl font-bold text-blue-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get Your Medicines Delivered to Your Doorstep!
        </motion.h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
          Enjoy up to <span className="font-semibold text-blue-600 dark:text-blue-400">30% off</span> on selected medicines. Free delivery on orders above $50!
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <PromoCard 
            icon={<Gift className="w-12 h-12 text-blue-600" />} 
            title="Exclusive Discounts" 
            description="Save big on essential medicines with special deals and offers." 
          />
          <PromoCard 
            icon={<Truck className="w-12 h-12 text-blue-600" />} 
            title="Fast & Free Delivery" 
            description="Get your orders delivered swiftly with free shipping on orders over $50." 
          />
          <PromoCard 
            icon={<ShoppingCart className="w-12 h-12 text-blue-600" />} 
            title="Easy Online Shopping" 
            description="A seamless shopping experience with secure checkout and fast processing." 
          />
        </div>
        <Button className="mt-6 px-6 py-3 text-lg" size="lg">
          Shop Now
        </Button>
      </div>
    </section>
  );
}

function PromoCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl text-center">
      <CardContent className="flex flex-col items-center gap-4">
        {icon}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
}
