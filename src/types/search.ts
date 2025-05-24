export interface SearchParams {
    search?: string;
    category?: string;
    location?: string;
    date?: Date | null;
  }
  
  export interface SearchChangeHandlers {
    setSearchParams: (value: string) => void;
    setCategory: (value: string) => void;
    setLocation: (value: string) => void;
    setDate: (value: Date | null) => void;
  }