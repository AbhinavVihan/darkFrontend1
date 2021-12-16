export interface DevData {
  status: string;
  data: WelcomeData;
}

export interface WelcomeData {
  data: DataData;
}

export interface DataData {
  startLocation: StartLocation;
  ratingsAverage: number;
  ratingsQuantity: number;
  images: string[];
  startDates: Date[];
  secretTour: boolean;
  guides: Guide[];
  _id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  locations: Location[];
  slug: string;
  __v: number;
  durationWeeks: number;
  reviews: Review[];
  id: string;
}

export interface Guide {
  photo: string;
  role: string;
  _id: string;
  name: string;
  email: string;
}

export interface Location {
  type: string;
  coordinates: number[];
  _id: string;
  description: string;
  day: number;
}

export interface Review {
  _id: string;
  createdAt: Date;
  review: string;
  rating: number;
  user: User;
  tour: string;
  __v: number;
  id: string;
}

export interface User {
  photo: string;
  _id: string;
  name: string;
}

export interface StartLocation {
  type: string;
  description: string;
  coordinates: number[];
  address: string;
}
