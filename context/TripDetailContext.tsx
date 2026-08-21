import { createContext } from "react";
import type { TripInfo } from "@/app/create-new-trip/_components/types";

export type TripContextType = {
    tripDetailInfo: TripInfo | null;
    setTripDetailInfo: React.Dispatch<React.SetStateAction<TripInfo | null>>;
}

export const TripDetailContext = createContext<TripContextType | undefined>(undefined);