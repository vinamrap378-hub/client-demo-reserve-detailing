'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SERVICES_DATA, ServiceItem } from '@/data/servicesData';

export type VehicleCategory = 'coupe' | 'sedan' | 'suv' | 'truck' | 'exotic' | 'other';

export interface VehicleTypeOption {
  id: VehicleCategory;
  name: string;
  subtext: string;
  multiplier: number;
  icon: string;
}

export const VEHICLE_OPTIONS: VehicleTypeOption[] = [
  { id: 'coupe', name: 'Coupe / Sports', subtext: '911, Cayman, Corvette, M4', multiplier: 1.0, icon: 'Car' },
  { id: 'sedan', name: 'Executive Sedan', subtext: 'Panamera, S-Class, Taycan, M5', multiplier: 1.1, icon: 'CarFront' },
  { id: 'suv', name: 'Mid & Full SUV', subtext: 'Cayenne, Urus, G-Wagon, Range Rover', multiplier: 1.25, icon: 'Truck' },
  { id: 'truck', name: 'Large Truck / Heavy', subtext: 'TRX, Raptor, Escalade ESV', multiplier: 1.35, icon: 'Truck' },
  { id: 'exotic', name: 'Exotic / Hypercar', subtext: 'Ferrari, Lamborghini, McLaren, GT3 RS', multiplier: 1.3, icon: 'Sparkles' },
  { id: 'other', name: 'Bespoke / Custom', subtext: 'Vintage, Classic, Concours restoration', multiplier: 1.2, icon: 'ShieldCheck' }
];

export interface AddOnItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const AVAILABLE_ADDONS: AddOnItem[] = [
  { id: 'engine-bay', name: 'Engine Bay Precision Detail & Ceramic Coat', price: 149, description: 'Steam clean, sensor protection, and high-temp heat shield coating' },
  { id: 'wheel-off', name: 'Wheels-Off Deep Barrel & Caliper Ceramic 9H', price: 299, description: 'Removal of all 4 wheels for 360° ceramic barrier against brake dust' },
  { id: 'leather-shield', name: 'Leather Shield Hydrophobic Nano Barrier', price: 189, description: 'Prevents dye transfer from denim and UV drying for 2 years' },
  { id: 'glass-shield', name: 'FlyBy Forte Extreme Glass Rain Shield', price: 99, description: 'Extreme water repellency over 35mph, zero wiper shudder' },
  { id: 'transport', name: 'Enclosed Single-Car Concierge Transport', price: 150, description: 'Door-to-door hydraulic enclosed transport anywhere in South Florida' }
];

export interface BookingState {
  serviceId: string;
  vehicleCategory: VehicleCategory;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  date: string;
  timeSlot: string;
  selectedAddOns: string[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
}

interface BookingContextType {
  booking: BookingState;
  selectedService: ServiceItem;
  updateBooking: (fields: Partial<BookingState>) => void;
  selectService: (serviceId: string) => void;
  toggleAddOn: (addonId: string) => void;
  calculatePricing: () => {
    basePrice: number;
    vehicleMultiplier: number;
    serviceTotal: number;
    addOnsTotal: number;
    subtotal: number;
    tax: number;
    total: number;
  };
  resetBooking: () => void;
}

const DEFAULT_BOOKING: BookingState = {
  serviceId: 'signature-detail',
  vehicleCategory: 'coupe',
  vehicleMake: 'Porsche',
  vehicleModel: '911 GT3',
  vehicleYear: '2024',
  date: '',
  timeSlot: '10:30 AM',
  selectedAddOns: ['leather-shield'],
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  notes: ''
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(DEFAULT_BOOKING);

  // Hydrate from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('reserve_booking_state');
      if (saved) {
        setBooking(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const updateBooking = (fields: Partial<BookingState>) => {
    setBooking(prev => {
      const next = { ...prev, ...fields };
      try {
        localStorage.setItem('reserve_booking_state', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const selectService = (serviceId: string) => {
    updateBooking({ serviceId });
  };

  const toggleAddOn = (addonId: string) => {
    setBooking(prev => {
      const exists = prev.selectedAddOns.includes(addonId);
      const nextAddons = exists
        ? prev.selectedAddOns.filter(id => id !== addonId)
        : [...prev.selectedAddOns, addonId];
      const next = { ...prev, selectedAddOns: nextAddons };
      try {
        localStorage.setItem('reserve_booking_state', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const selectedService =
    SERVICES_DATA.find(s => s.id === booking.serviceId) || SERVICES_DATA[0];

  const calculatePricing = () => {
    const vehOpt = VEHICLE_OPTIONS.find(v => v.id === booking.vehicleCategory) || VEHICLE_OPTIONS[0];
    const basePrice = selectedService.price;
    const vehicleMultiplier = vehOpt.multiplier;
    const serviceTotal = Math.round(basePrice * vehicleMultiplier);

    const addOnsTotal = booking.selectedAddOns.reduce((sum, addonId) => {
      const found = AVAILABLE_ADDONS.find(a => a.id === addonId);
      return sum + (found ? found.price : 0);
    }, 0);

    const subtotal = serviceTotal + addOnsTotal;
    const tax = Math.round(subtotal * 0.07); // 7% Florida sales tax
    const total = subtotal + tax;

    return {
      basePrice,
      vehicleMultiplier,
      serviceTotal,
      addOnsTotal,
      subtotal,
      tax,
      total
    };
  };

  const resetBooking = () => {
    setBooking(DEFAULT_BOOKING);
    try {
      localStorage.removeItem('reserve_booking_state');
    } catch (e) {}
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        selectedService,
        updateBooking,
        selectService,
        toggleAddOn,
        calculatePricing,
        resetBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
