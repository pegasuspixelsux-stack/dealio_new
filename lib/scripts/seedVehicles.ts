import { db } from "@/lib/firebase";
import { collection, getDocs, doc, writeBatch } from "firebase/firestore";

export interface VehiclePhoto {
  url: string;
  path: string;
}

export interface Vehicle {
  id?: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  description: string;
  priceDisplay: number;
  priceCompareAt: number | null;
  specs: {
    mileage: number;
    transmission: string | null;
    fuelType: string | null;
    exteriorColor: string;
    interiorColor: string;
    bodyType: string;
    vin: string;
  };
  photos: VehiclePhoto[];
  status: "published" | "draft";
  createdAt?: Date;
  updatedAt?: Date;
}

const VEHICLES_DATA: Omit<Vehicle, "id">[] = [
  {
    slug: "bmw-m4-competition",
    make: "BMW",
    model: "M4 Competition",
    year: 2024,
    description: "BMW M4 Competition - Performance supreme avec moteur turbo 3.0L",
    priceDisplay: 85000,
    priceCompareAt: null,
    specs: {
      mileage: 500,
      transmission: "Automatic",
      fuelType: "Gasoline",
      exteriorColor: "Azul Yas",
      interiorColor: "Negro",
      bodyType: "Coupe",
      vin: "WBSDD01060AA01234",
    },
    photos: [{ url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80", path: "bmw-m4-competition.jpg" }],
    status: "published",
  },
  {
    slug: "porsche-911-gt3",
    make: "Porsche",
    model: "911 GT3",
    year: 2023,
    description: "Porsche 911 GT3 - Superdeportivo de pista para carretera",
    priceDisplay: 120000,
    priceCompareAt: null,
    specs: {
      mileage: 1200,
      transmission: "Manual",
      fuelType: "Gasoline",
      exteriorColor: "Blanco",
      interiorColor: "Negro",
      bodyType: "Coupe",
      vin: "WP0AA2995RS123456",
    },
    photos: [{ url: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=80", path: "porsche-911-gt3.jpg" }],
    status: "published",
  },
  {
    slug: "audi-rs6-avant",
    make: "Audi",
    model: "RS6 Avant",
    year: 2022,
    description: "Audi RS6 Avant - Familiar deportiva de lujo",
    priceDisplay: 95000,
    priceCompareAt: null,
    specs: {
      mileage: 8500,
      transmission: "Automatic",
      fuelType: "Gasoline",
      exteriorColor: "Gris Nardo",
      interiorColor: "Negro",
      bodyType: "Estate",
      vin: "WUAUU0SC7LN987654",
    },
    photos: [{ url: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&q=80", path: "audi-rs6-avant.jpg" }],
    status: "published",
  },
  {
    slug: "mercedes-amg-g63",
    make: "Mercedes-Benz",
    model: "AMG G63",
    year: 2024,
    description: "Mercedes-Benz AMG G63 - El icónico SUV de lujo",
    priceDisplay: 150000,
    priceCompareAt: null,
    specs: {
      mileage: 200,
      transmission: "Automatic",
      fuelType: "Gasoline",
      exteriorColor: "Negro Obsidiana",
      interiorColor: "Negro/Rojo",
      bodyType: "SUV",
      vin: "WDC1634261V123456",
    },
    photos: [{ url: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=1200&q=80", path: "mercedes-amg-g63.jpg" }],
    status: "published",
  },
  {
    slug: "ford-mustang-shelby",
    make: "Ford",
    model: "Mustang Shelby",
    year: 2023,
    description: "Ford Mustang Shelby - Legendaria versión del icónico muscle car",
    priceDisplay: 75000,
    priceCompareAt: null,
    specs: {
      mileage: 2100,
      transmission: "Manual",
      fuelType: "Gasoline",
      exteriorColor: "Rojo Guardsman",
      interiorColor: "Negro",
      bodyType: "Coupe",
      vin: "1FA6P8CF2H5123456",
    },
    photos: [{ url: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=1200&q=80", path: "ford-mustang-shelby.jpg" }],
    status: "published",
  },
  {
    slug: "tesla-model-s-plaid",
    make: "Tesla",
    model: "Model S Plaid",
    year: 2024,
    description: "Tesla Model S Plaid - El futuro de la velocidad eléctrica",
    priceDisplay: 110000,
    priceCompareAt: null,
    specs: {
      mileage: 800,
      transmission: "Electric",
      fuelType: "Electric",
      exteriorColor: "Blanco Perla",
      interiorColor: "Negro",
      bodyType: "Sedan",
      vin: "5YJ3E1EA5PF123456",
    },
    photos: [{ url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&q=80", path: "tesla-model-s-plaid.jpg" }],
    status: "published",
  },
  {
    slug: "range-rover-sport",
    make: "Range Rover",
    model: "Sport",
    year: 2023,
    description: "Range Rover Sport - Lujo y rendimiento en un SUV",
    priceDisplay: 100000,
    priceCompareAt: null,
    specs: {
      mileage: 3500,
      transmission: "Automatic",
      fuelType: "Gasoline",
      exteriorColor: "Plata",
      interiorColor: "Negro/Cuero",
      bodyType: "SUV",
      vin: "SALRR2EV7F2123456",
    },
    photos: [{ url: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&q=80", path: "range-rover-sport.jpg" }],
    status: "published",
  },
  {
    slug: "chevrolet-corvette-c8",
    make: "Chevrolet",
    model: "Corvette C8",
    year: 2023,
    description: "Chevrolet Corvette C8 - Superdeportivo americano con motor central",
    priceDisplay: 90000,
    priceCompareAt: null,
    specs: {
      mileage: 4200,
      transmission: "Automatic",
      fuelType: "Gasoline",
      exteriorColor: "Amarillo Corvette",
      interiorColor: "Negro",
      bodyType: "Coupe",
      vin: "1G1YY22G935123456",
    },
    photos: [{ url: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80", path: "chevrolet-corvette-c8.jpg" }],
    status: "published",
  },
  {
    slug: "volkswagen-golf-gti",
    make: "Volkswagen",
    model: "Golf GTI",
    year: 2022,
    description: "Volkswagen Golf GTI - Clásico compacto deportivo",
    priceDisplay: 35000,
    priceCompareAt: null,
    specs: {
      mileage: 12500,
      transmission: "Automatic",
      fuelType: "Gasoline",
      exteriorColor: "Gris Oscuro",
      interiorColor: "Negro",
      bodyType: "Hatchback",
      vin: "3VWZ81H17LM123456",
    },
    photos: [{ url: "https://picsum.photos/1200/800?random=1&t=1", path: "volkswagen-golf-gti.jpg" }],
    status: "published",
  },
  {
    slug: "toyota-land-cruiser",
    make: "Toyota",
    model: "Land Cruiser",
    year: 2024,
    description: "Toyota Land Cruiser - El SUV off-road más confiable del mercado",
    priceDisplay: 65000,
    priceCompareAt: null,
    specs: {
      mileage: 600,
      transmission: "Automatic",
      fuelType: "Gasoline",
      exteriorColor: "Blanco Perla",
      interiorColor: "Beige",
      bodyType: "SUV",
      vin: "JTNKRFEJ6L5123456",
    },
    photos: [{ url: "https://picsum.photos/1200/800?random=2&t=2", path: "toyota-land-cruiser.jpg" }],
    status: "published",
  },
];

export async function seedVehicles(forceReset = false): Promise<{ success: boolean; count: number; message: string }> {
  try {
    const vehiclesRef = collection(db, "vehicles");
    const snapshot = await getDocs(vehiclesRef);

    // Clear existing vehicles if forceReset is true
    if (!snapshot.empty && forceReset) {
      const batch = writeBatch(db);
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    } else if (!snapshot.empty && !forceReset) {
      return {
        success: false,
        count: 0,
        message: `Database already contains ${snapshot.size} vehicles. Use forceReset=true to replace them.`,
      };
    }

    const batch = writeBatch(db);
    const now = new Date();

    VEHICLES_DATA.forEach((vehicle) => {
      const docRef = doc(vehiclesRef, vehicle.slug);
      batch.set(docRef, {
        ...vehicle,
        createdAt: now,
        updatedAt: now,
      });
    });

    await batch.commit();

    return {
      success: true,
      count: VEHICLES_DATA.length,
      message: `Successfully seeded ${VEHICLES_DATA.length} vehicles`,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Seed error:", errorMessage);
    return {
      success: false,
      count: 0,
      message: `Failed to seed vehicles: ${errorMessage}`,
    };
  }
}
