'use client';

import { useState, useEffect, useMemo } from 'react';

interface DiscountTier {
  minLessons: number;
  discountPercentage: number;
}

export function useSubscriptionDiscount(basePrice: number, lessonCount: number) {
  const [discountedPrice, setDiscountedPrice] = useState<number>(basePrice);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  
  const discountTiers = useMemo<DiscountTier[]>(() => [
    { minLessons: 1, discountPercentage: 0 },    // No discount for 1-3 lessons
    { minLessons: 4, discountPercentage: 5 },    // 5% discount for 4-7 lessons
    { minLessons: 8, discountPercentage: 10 },   // 10% discount for 8-11 lessons
    { minLessons: 12, discountPercentage: 15 },  // 15% discount for 12-19 lessons
    { minLessons: 20, discountPercentage: 20 },  // 20% discount for 20+ lessons
  ], []);

  useEffect(() => {
    // Find the highest applicable discount tier based on lesson count
    const applicableTier = [...discountTiers]
      .reverse()
      .find(tier => lessonCount >= tier.minLessons);
    
    const discount = applicableTier ? applicableTier.discountPercentage : 0;
    setDiscountPercentage(discount);
    
    // Calculate the discounted price
    const discounted = basePrice * lessonCount * (1 - discount / 100);
    setDiscountedPrice(Number(discounted.toFixed(2)));
  }, [basePrice, lessonCount, discountTiers]);

  return {
    originalPrice: basePrice * lessonCount,
    discountedPrice,
    discountPercentage,
    savings: basePrice * lessonCount - discountedPrice,
    pricePerLesson: discountedPrice / lessonCount
  };
}

