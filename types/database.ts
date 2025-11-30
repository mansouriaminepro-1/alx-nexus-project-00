export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      owners: {
        Row: {
          id: string
          restaurant_name: string | null
          owner_name: string | null
          restaurant_logo_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          restaurant_name?: string | null
          owner_name?: string | null
          restaurant_logo_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          restaurant_name?: string | null
          owner_name?: string | null
          restaurant_logo_url?: string | null
          created_at?: string
        }
      }
      poll: {
        Row: {
          id: string
          owner_id: string
          title: string
          description: string | null
          duration: unknown | null // interval type is tricky in JS, usually string
          closes_at: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          title: string
          description?: string | null
          duration?: unknown | null
          closes_at: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          title?: string
          description?: string | null
          duration?: unknown | null
          closes_at?: string
          is_active?: boolean
          created_at?: string
        }
      }
      poll_items: {
        Row: {
          id: string
          poll_id: string
          item_name: string
          item_description: string | null
          price: number
          image_url: string | null
          position: number
          created_at: string
        }
        Insert: {
          id?: string
          poll_id: string
          item_name: string
          item_description?: string | null
          price: number
          image_url?: string | null
          position: number
          created_at?: string
        }
        Update: {
          id?: string
          poll_id?: string
          item_name?: string
          item_description?: string | null
          price?: number
          image_url?: string | null
          position?: number
          created_at?: string
        }
      }
      votes: {
        Row: {
          user_id: string
          poll_item_id: string
          poll_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          poll_item_id: string
          poll_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          poll_item_id?: string
          poll_id?: string
          created_at?: string
        }
      }
    }
  }
}
