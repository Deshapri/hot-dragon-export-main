export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      announcements: {
        Row: {
          author_id: string
          content: string
          created_at: string
          expires_at: string | null
          id: string
          is_published: boolean | null
          priority: string | null
          published_at: string | null
          target_audience: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_published?: boolean | null
          priority?: string | null
          published_at?: string | null
          target_audience?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_published?: boolean | null
          priority?: string | null
          published_at?: string | null
          target_audience?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      class_bookings: {
        Row: {
          booking_date: string
          class_id: string
          created_at: string
          id: string
          notes: string | null
          payment_amount: number | null
          payment_status: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          booking_date?: string
          class_id: string
          created_at?: string
          id?: string
          notes?: string | null
          payment_amount?: number | null
          payment_status?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          booking_date?: string
          class_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          payment_amount?: number | null
          payment_status?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_bookings_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          category: string
          created_at: string
          current_participants: number | null
          description: string | null
          duration: number
          id: string
          level: string
          location: string | null
          max_capacity: number
          price: number
          schedule_days: string | null
          schedule_time: string | null
          title: string
          trainer_id: string | null
        }
        Insert: {
          category: string
          created_at?: string
          current_participants?: number | null
          description?: string | null
          duration: number
          id?: string
          level: string
          location?: string | null
          max_capacity: number
          price: number
          schedule_days?: string | null
          schedule_time?: string | null
          title: string
          trainer_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          current_participants?: number | null
          description?: string | null
          duration?: number
          id?: string
          level?: string
          location?: string | null
          max_capacity?: number
          price?: number
          schedule_days?: string | null
          schedule_time?: string | null
          title?: string
          trainer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainers"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_leads: {
        Row: {
          company_name: string | null
          country: string
          created_at: string | null
          email: string
          id: string
          inquiry_type: string | null
          message: string | null
          name: string
          phone: string | null
          preferred_language: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          company_name?: string | null
          country: string
          created_at?: string | null
          email: string
          id?: string
          inquiry_type?: string | null
          message?: string | null
          name: string
          phone?: string | null
          preferred_language?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          company_name?: string | null
          country?: string
          created_at?: string | null
          email?: string
          id?: string
          inquiry_type?: string | null
          message?: string | null
          name?: string
          phone?: string | null
          preferred_language?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      email_logs: {
        Row: {
          content: string | null
          email_type: string
          error_message: string | null
          id: string
          recipient_email: string
          reference_id: string | null
          reference_type: string | null
          sent_at: string
          status: string
          subject: string
        }
        Insert: {
          content?: string | null
          email_type: string
          error_message?: string | null
          id?: string
          recipient_email: string
          reference_id?: string | null
          reference_type?: string | null
          sent_at?: string
          status?: string
          subject: string
        }
        Update: {
          content?: string | null
          email_type?: string
          error_message?: string | null
          id?: string
          recipient_email?: string
          reference_id?: string | null
          reference_type?: string | null
          sent_at?: string
          status?: string
          subject?: string
        }
        Relationships: []
      }
      export_certifications: {
        Row: {
          certificate_url: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          issuing_authority: string | null
          name: string
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          certificate_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          issuing_authority?: string | null
          name: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          certificate_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          issuing_authority?: string | null
          name?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          admin_response: string | null
          category: string
          content: string
          created_at: string
          id: string
          rating: number | null
          responded_at: string | null
          responded_by: string | null
          status: string | null
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_response?: string | null
          category: string
          content: string
          created_at?: string
          id?: string
          rating?: number | null
          responded_at?: string | null
          responded_by?: string | null
          status?: string | null
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_response?: string | null
          category?: string
          content?: string
          created_at?: string
          id?: string
          rating?: number | null
          responded_at?: string | null
          responded_by?: string | null
          status?: string | null
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_responded_by_fkey"
            columns: ["responded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      home_content: {
        Row: {
          content: string | null
          created_at: string
          id: string
          image_url: string | null
          is_active: boolean | null
          order_index: number | null
          section_name: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          order_index?: number | null
          section_name: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          order_index?: number | null
          section_name?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      membership_plans: {
        Row: {
          created_at: string
          description: string | null
          duration_months: number
          features: string[] | null
          id: string
          is_popular: boolean | null
          name: string
          price: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_months: number
          features?: string[] | null
          id?: string
          is_popular?: boolean | null
          name: string
          price: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_months?: number
          features?: string[] | null
          id?: string
          is_popular?: boolean | null
          name?: string
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      memberships: {
        Row: {
          created_at: string
          end_date: string
          id: string
          plan_id: string
          start_date: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          plan_id: string
          start_date?: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          plan_id?: string
          start_date?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "memberships_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "membership_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          currency: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          id: string
          notes: string | null
          order_number: string
          order_status: string | null
          payment_method: string | null
          payment_reference: string | null
          payment_status: string | null
          product_id: string | null
          quantity: number
          shipping_address: Json | null
          shipping_method: string | null
          total_amount: number
          tracking_number: string | null
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          currency: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          id?: string
          notes?: string | null
          order_number: string
          order_status?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          product_id?: string | null
          quantity: number
          shipping_address?: Json | null
          shipping_method?: string | null
          total_amount: number
          tracking_number?: string | null
          unit_price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          id?: string
          notes?: string | null
          order_number?: string
          order_status?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          product_id?: string | null
          quantity?: number
          shipping_address?: Json | null
          shipping_method?: string | null
          total_amount?: number
          tracking_number?: string | null
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          available: boolean | null
          certifications: string[] | null
          created_at: string | null
          description: string | null
          harvest_season: string | null
          id: string
          image_url: string | null
          name: string
          origin_region: string | null
          price_lkr: number
          price_usd: number
          spice_level: string | null
          stock_quantity: number | null
          updated_at: string | null
          weight_kg: number | null
        }
        Insert: {
          available?: boolean | null
          certifications?: string[] | null
          created_at?: string | null
          description?: string | null
          harvest_season?: string | null
          id?: string
          image_url?: string | null
          name: string
          origin_region?: string | null
          price_lkr: number
          price_usd: number
          spice_level?: string | null
          stock_quantity?: number | null
          updated_at?: string | null
          weight_kg?: number | null
        }
        Update: {
          available?: boolean | null
          certifications?: string[] | null
          created_at?: string | null
          description?: string | null
          harvest_season?: string | null
          id?: string
          image_url?: string | null
          name?: string
          origin_region?: string | null
          price_lkr?: number
          price_usd?: number
          spice_level?: string | null
          stock_quantity?: number | null
          updated_at?: string | null
          weight_kg?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email: string
          full_name: string
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string
          data: Json
          generated_by: string
          id: string
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          data: Json
          generated_by: string
          id?: string
          title: string
          type: string
        }
        Update: {
          created_at?: string
          data?: Json
          generated_by?: string
          id?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      service_bookings: {
        Row: {
          booking_date: string
          created_at: string
          duration: number
          id: string
          notes: string | null
          payment_status: string
          price: number
          service_name: string
          service_type: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          booking_date: string
          created_at?: string
          duration: number
          id?: string
          notes?: string | null
          payment_status?: string
          price: number
          service_name: string
          service_type: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          booking_date?: string
          created_at?: string
          duration?: number
          id?: string
          notes?: string | null
          payment_status?: string
          price?: number
          service_name?: string
          service_type?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_responses: {
        Row: {
          completed_at: string
          id: string
          responses: Json
          survey_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          id?: string
          responses: Json
          survey_id: string
          user_id: string
        }
        Update: {
          completed_at?: string
          id?: string
          responses?: Json
          survey_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_responses_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
            referencedRelation: "surveys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      surveys: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          ends_at: string | null
          id: string
          is_active: boolean | null
          questions: Json
          starts_at: string | null
          target_audience: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          ends_at?: string | null
          id?: string
          is_active?: boolean | null
          questions: Json
          starts_at?: string | null
          target_audience?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          is_active?: boolean | null
          questions?: Json
          starts_at?: string | null
          target_audience?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "surveys_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      system_info: {
        Row: {
          address: string
          author_name: string
          created_at: string
          id: string
          phone: string
          system_name: string
          updated_at: string
          version: string
        }
        Insert: {
          address?: string
          author_name?: string
          created_at?: string
          id?: string
          phone?: string
          system_name?: string
          updated_at?: string
          version?: string
        }
        Update: {
          address?: string
          author_name?: string
          created_at?: string
          id?: string
          phone?: string
          system_name?: string
          updated_at?: string
          version?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          company_name: string | null
          country: string
          created_at: string | null
          customer_name: string
          id: string
          is_approved: boolean | null
          is_featured: boolean | null
          language: string | null
          message: string
          product_id: string | null
          rating: number | null
        }
        Insert: {
          company_name?: string | null
          country: string
          created_at?: string | null
          customer_name: string
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          language?: string | null
          message: string
          product_id?: string | null
          rating?: number | null
        }
        Update: {
          company_name?: string | null
          country?: string
          created_at?: string | null
          customer_name?: string
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          language?: string | null
          message?: string
          product_id?: string | null
          rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      trainers: {
        Row: {
          bio: string | null
          created_at: string
          email: string
          experience_years: number | null
          id: string
          name: string
          phone: string | null
          rating: number | null
          specialization: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          email: string
          experience_years?: number | null
          id?: string
          name: string
          phone?: string | null
          rating?: number | null
          specialization?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          email?: string
          experience_years?: number | null
          id?: string
          name?: string
          phone?: string | null
          rating?: number | null
          specialization?: string | null
        }
        Relationships: []
      }
      workout_plans: {
        Row: {
          created_at: string
          description: string | null
          difficulty_level: string
          duration_weeks: number
          exercises: Json | null
          id: string
          member_id: string | null
          title: string
          trainer_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty_level: string
          duration_weeks?: number
          exercises?: Json | null
          id?: string
          member_id?: string | null
          title: string
          trainer_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty_level?: string
          duration_weeks?: number
          exercises?: Json | null
          id?: string
          member_id?: string | null
          title?: string
          trainer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_plans_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      user_role: "member" | "trainer" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["member", "trainer", "admin"],
    },
  },
} as const
