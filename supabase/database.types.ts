export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      account: {
        Row: {
          access_token: string | null;
          expires_at: number | null;
          id_token: string | null;
          provider: string;
          providerAccountId: string;
          refresh_token: string | null;
          scope: string | null;
          session_state: string | null;
          token_type: string | null;
          type: string;
          userId: string;
        };
        Insert: {
          access_token?: string | null;
          expires_at?: number | null;
          id_token?: string | null;
          provider: string;
          providerAccountId: string;
          refresh_token?: string | null;
          scope?: string | null;
          session_state?: string | null;
          token_type?: string | null;
          type: string;
          userId: string;
        };
        Update: {
          access_token?: string | null;
          expires_at?: number | null;
          id_token?: string | null;
          provider?: string;
          providerAccountId?: string;
          refresh_token?: string | null;
          scope?: string | null;
          session_state?: string | null;
          token_type?: string | null;
          type?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "account_userId_user_id_fk";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      authenticator: {
        Row: {
          counter: number;
          credentialBackedUp: boolean;
          credentialDeviceType: string;
          credentialID: string;
          credentialPublicKey: string;
          providerAccountId: string;
          transports: string | null;
          userId: string;
        };
        Insert: {
          counter: number;
          credentialBackedUp: boolean;
          credentialDeviceType: string;
          credentialID: string;
          credentialPublicKey: string;
          providerAccountId: string;
          transports?: string | null;
          userId: string;
        };
        Update: {
          counter?: number;
          credentialBackedUp?: boolean;
          credentialDeviceType?: string;
          credentialID?: string;
          credentialPublicKey?: string;
          providerAccountId?: string;
          transports?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "authenticator_userId_user_id_fk";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      bPRbtHvpPTydfNdB: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      cities: {
        Row: {
          country_id: number | null;
          id: number;
          name: string | null;
          popularity: Database["public"]["Enums"]["popularity"] | null;
        };
        Insert: {
          country_id?: number | null;
          id?: number;
          name?: string | null;
          popularity?: Database["public"]["Enums"]["popularity"] | null;
        };
        Update: {
          country_id?: number | null;
          id?: number;
          name?: string | null;
          popularity?: Database["public"]["Enums"]["popularity"] | null;
        };
        Relationships: [
          {
            foreignKeyName: "cities_country_id_countries_id_fk";
            columns: ["country_id"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["id"];
          },
        ];
      };
      countries: {
        Row: {
          id: number;
          name: string | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
        };
        Update: {
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      groups: {
        Row: {
          id: number;
          name: string | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
        };
        Update: {
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          author_id: string;
          content: string | null;
          id: number;
          title: string | null;
        };
        Insert: {
          author_id: string;
          content?: string | null;
          id?: number;
          title?: string | null;
        };
        Update: {
          author_id?: string;
          content?: string | null;
          id?: number;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "posts_author_id_user_id_fk";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          id: number;
          metadata: Json | null;
          user_id: string;
        };
        Insert: {
          id?: number;
          metadata?: Json | null;
          user_id: string;
        };
        Update: {
          id?: number;
          metadata?: Json | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_user_id_fk";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      session: {
        Row: {
          expires: string;
          sessionToken: string;
          userId: string;
        };
        Insert: {
          expires: string;
          sessionToken: string;
          userId: string;
        };
        Update: {
          expires?: string;
          sessionToken?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "session_userId_user_id_fk";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      todos: {
        Row: {
          author_id: string | null;
          completed: boolean | null;
          created_at: string;
          description: string | null;
          due_date: string | null;
          id: number;
          title: string | null;
          updated_at: string | null;
        };
        Insert: {
          author_id?: string | null;
          completed?: boolean | null;
          created_at?: string;
          description?: string | null;
          due_date?: string | null;
          id?: number;
          title?: string | null;
          updated_at?: string | null;
        };
        Update: {
          author_id?: string | null;
          completed?: boolean | null;
          created_at?: string;
          description?: string | null;
          due_date?: string | null;
          id?: number;
          title?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "todos_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      user: {
        Row: {
          created_at: string | null;
          email: string;
          emailVerified: string | null;
          group_id: number | null;
          id: string;
          image: string | null;
          name: string | null;
          password: string | null;
          role: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          emailVerified?: string | null;
          group_id?: number | null;
          id?: string;
          image?: string | null;
          name?: string | null;
          password?: string | null;
          role?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          emailVerified?: string | null;
          group_id?: number | null;
          id?: string;
          image?: string | null;
          name?: string | null;
          password?: string | null;
          role?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_group_id_groups_id_fk";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "groups";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          email: string | null;
          id: string;
          image: string | null;
          name: string | null;
        };
        Insert: {
          email?: string | null;
          id: string;
          image?: string | null;
          name?: string | null;
        };
        Update: {
          email?: string | null;
          id?: string;
          image?: string | null;
          name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users_to_groups: {
        Row: {
          group_id: number;
          id: number;
          user_id: string;
        };
        Insert: {
          group_id: number;
          id?: number;
          user_id: string;
        };
        Update: {
          group_id?: number;
          id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_to_groups_group_id_groups_id_fk";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "groups";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_to_groups_user_id_user_id_fk";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      verificationToken: {
        Row: {
          expires: string;
          identifier: string;
          token: string;
        };
        Insert: {
          expires: string;
          identifier: string;
          token: string;
        };
        Update: {
          expires?: string;
          identifier?: string;
          token?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      popularity: "unknown" | "known" | "popular";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
