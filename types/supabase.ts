export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      "Accessed Courses": {
        Row: {
          access_code: string | null;
          course_code: string | null;
          course_title: string | null;
          created_at: string | null;
          id: number;
          user_id: string | null;
        };
        Insert: {
          access_code?: string | null;
          course_code?: string | null;
          course_title?: string | null;
          created_at?: string | null;
          id?: number;
          user_id?: string | null;
        };
        Update: {
          access_code?: string | null;
          course_code?: string | null;
          course_title?: string | null;
          created_at?: string | null;
          id?: number;
          user_id?: string | null;
        };
      };
      Assignments: {
        Row: {
          category: string | null;
          content: string | null;
          created_at: string | null;
          due_date: string | null;
          file_ext: string | null;
          has_attachement: boolean | null;
          id: number;
          priority: string | null;
          status: string | null;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          category?: string | null;
          content?: string | null;
          created_at?: string | null;
          due_date?: string | null;
          file_ext?: string | null;
          has_attachement?: boolean | null;
          id?: number;
          priority?: string | null;
          status?: string | null;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          category?: string | null;
          content?: string | null;
          created_at?: string | null;
          due_date?: string | null;
          file_ext?: string | null;
          has_attachement?: boolean | null;
          id?: number;
          priority?: string | null;
          status?: string | null;
          title?: string | null;
          user_id?: string | null;
        };
      };
      Credentials: {
        Row: {
          created_at: string | null;
          file_ext: string | null;
          has_attachment: boolean | null;
          id: number;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          file_ext?: string | null;
          has_attachment?: boolean | null;
          id?: number;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          file_ext?: string | null;
          has_attachment?: boolean | null;
          id?: number;
          title?: string | null;
          user_id?: string | null;
        };
      };
      "Lecturer's classes": {
        Row: {
          course_code: string;
          course_name: string;
          created_at: string | null;
          description: string | null;
          id: number;
          shared_code: string;
          user_id: string;
        };
        Insert: {
          course_code: string;
          course_name: string;
          created_at?: string | null;
          description?: string | null;
          id?: number;
          shared_code: string;
          user_id?: string;
        };
        Update: {
          course_code?: string;
          course_name?: string;
          created_at?: string | null;
          description?: string | null;
          id?: number;
          shared_code?: string;
          user_id?: string;
        };
      };
      "Lecturer's resources": {
        Row: {
          access_code: string;
          created_at: string | null;
          description: string | null;
          file_ext: string | null;
          has_attachment: boolean | null;
          id: number;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          access_code: string;
          created_at?: string | null;
          description?: string | null;
          file_ext?: string | null;
          has_attachment?: boolean | null;
          id?: number;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          access_code?: string;
          created_at?: string | null;
          description?: string | null;
          file_ext?: string | null;
          has_attachment?: boolean | null;
          id?: number;
          title?: string | null;
          user_id?: string | null;
        };
      };
      Notes: {
        Row: {
          category: string | null;
          created_at: string | null;
          description: string | null;
          file_ext: string | null;
          has_attachment: boolean | null;
          id: number;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          category?: string | null;
          created_at?: string | null;
          description?: string | null;
          file_ext?: string | null;
          has_attachment?: boolean | null;
          id?: number;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          category?: string | null;
          created_at?: string | null;
          description?: string | null;
          file_ext?: string | null;
          has_attachment?: boolean | null;
          id?: number;
          title?: string | null;
          user_id?: string | null;
        };
      };
      Tasks: {
        Row: {
          created_at: string | null;
          description: string | null;
          due_date: string | null;
          id: number;
          priority: string | null;
          status: string | null;
          time: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          due_date?: string | null;
          id?: number;
          priority?: string | null;
          status?: string | null;
          time?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          due_date?: string | null;
          id?: number;
          priority?: string | null;
          status?: string | null;
          time?: string | null;
          user_id?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
