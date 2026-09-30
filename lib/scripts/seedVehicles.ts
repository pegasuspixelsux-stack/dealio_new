import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, writeBatch } from "firebase/firestore";

export interface Vehicle {
  id?: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  category: string;
  status: "disponible" | "reservado" | "vendido";
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const VEHICLES_DATA: Omit<Vehicle, "id">[] = [
  {
    slug: "bmw-m4-competition",
    make: "BMW",
    model: "M4 Competition",
    year: 2024,
    price: 85000,
    mileage: 500,
    category: "Deportivo",
    status: "disponible",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80",
  },
  {
    slug: "porsche-911-gt3",
    make: "Porsche",
    model: "911 GT3",
    year: 2023,
    price: 120000,
    mileage: 1200,
    category: "Deportivo",
    status: "disponible",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=80",
  },
  {
    slug: "audi-rs6-avant",
    make: "Audi",
    model: "RS6 Avant",
    year: 2022,
    price: 95000,
    mileage: 8500,
    category: "SUV",
    status: "disponible",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&q=80",
  },
  {
    slug: "mercedes-amg-g63",
    make: "Mercedes-Benz",
    model: "AMG G63",
    year: 2024,
    price: 150000,
    mileage: 200,
    category: "SUV",
    status: "disponible",
    image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=1200&q=80",
  },
  {
    slug: "ford-mustang-shelby",
    make: "Ford",
    model: "Mustang Shelby",
    year: 2023,
    price: 75000,
    mileage: 2100,
    category: "Deportivo",
    status: "disponible",
    image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=1200&q=80",
  },
  {
    slug: "tesla-model-s-plaid",
    make: "Tesla",
    model: "Model S Plaid",
    year: 2024,
    price: 110000,
    mileage: 800,
    category: "Sedán",
    status: "disponible",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&q=80",
  },
  {
    slug: "range-rover-sport",
    make: "Range Rover",
    model: "Sport",
    year: 2023,
    price: 100000,
    mileage: 3500,
    category: "SUV",
    status: "reservado",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&q=80",
  },
  {
    slug: "chevrolet-corvette-c8",
    make: "Chevrolet",
    model: "Corvette C8",
    year: 2023,
    price: 90000,
    mileage: 4200,
    category: "Deportivo",
    status: "disponible",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80",
  },
  {
    slug: "volkswagen-golf-gti",
    make: "Volkswagen",
    model: "Golf GTI",
    year: 2022,
    price: 35000,
    mileage: 12500,
    category: "Sedán",
    status: "disponible",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c351?w=1200&q=80",
  },
  {
    slug: "toyota-land-cruiser",
    make: "Toyota",
    model: "Land Cruiser",
    year: 2024,
    price: 65000,
    mileage: 600,
    category: "SUV",
    status: "disponible",
    image: "https://images.unsplash.com/photo-1594784439943-7f311c107106?w=1200&q=80",
  },
];

export async function seedVehicles(): Promise<{ success: boolean; count: number; message: string }> {
  try {
    const vehiclesRef = collection(db, "vehicles");
    const snapshot = await getDocs(vehiclesRef);

    // Only seed if collection is empty
    if (!snapshot.empty) {
      return {
        success: false,
        count: 0,
        message: `Database already contains ${snapshot.size} vehicles. Skipping seed.`,
      };
    }

    const batch = writeBatch(db);
    const now = new Date();

    VEHICLES_DATA.forEach((vehicle) => {
      const docRef = vehiclesRef.doc();
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
