export interface Database {
  public: {
    Tables: {
      // 1. The Owner Profile Table
      owners: {
        Row: {
          id: string; // PK/FK to auth.users
          restaurant_name: string | null;
          owner_name: string | null;
          restaurant_logo_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          restaurant_name?: string | null;
          owner_name?: string | null;
          restaurant_logo_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          restaurant_name?: string | null;
          owner_name?: string | null;
          restaurant_logo_url?: string | null;
          created_at?: string;
        };
      };
      // 2. The Poll Table (Singular and linked by owner_id)
      poll: { // <-- CORRECTED NAME
        Row: {
          id: string;
          owner_id: string; // <-- CORRECTED COLUMN NAME
          title: string;
          description: string | null;
          duration: unknown;
          closes_at: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          owner_id: string;
          title: string;
          description?: string | null;
          duration: unknown;
          closes_at: string;
          is_active?: boolean;
          // ID and created_at handled by DB
        };
        Update: {
          title?: string;
          description?: string | null;
          closes_at?: string;
          is_active?: boolean;
        };
      };
      // 3. The Menu Items Table
      poll_items: {
        Row: {
          id: string;
          poll_id: string;
          item_name: string;
          item_description: string;
          price: number;
          image_url: string | null;
          position: number;
          created_at: string;
        };
        Insert: {
          poll_id: string;
          item_name: string;
          item_description: string;
          price: number;
          image_url?: string | null;
          position: number;
        };
        Update: {
          item_name?: string;
          price?: number;
          image_url?: string | null;
        };
      };
      // 4. The Votes Table
      votes: {
        Row: {
          user_id: string; // <-- CORRECTED COLUMN NAME (no voter_id)
          poll_id: string;
          poll_item_id: string;
          created_at: string;
          // PK is composite (user_id, poll_id), so no explicit 'id' needed
        };
        Insert: {
          user_id: string;
          poll_id: string;
          poll_item_id: string;
        };
        Update: {
          poll_item_id?: string; // Only the item can change if the user changes their vote
        };
      };
    };
    Views: {}; // Leave empty or remove if you don't have views
    Functions: {}; // Leave empty or remove if you don't have functions
    Enums: {}; // Leave empty or remove if you don't have enums
    CompositeTypes: {}; // Leave empty or remove if you don't have composites
  };
}