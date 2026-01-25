export type UserRole = 'super_admin' | 'admin' | 'editor' | 'author' | 'dentist' | 'student' | 'business';
export type ArticleStatus = 'draft' | 'under_review' | 'published' | 'archived';

export interface Profile {
    id: string;
    email: string;
    username: string;
    full_name?: string;
    role: UserRole;
    is_verified: boolean;
    avatar_url?: string;
    bio?: string;
    specialty?: string;
    clinic_name?: string;
    location?: string;
    created_at: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
}

export interface Article {
    id: number;
    slug: string;
    title: string;
    excerpt?: string;
    content: any; // JSONB from TipTap
    status: ArticleStatus;
    category_id?: number;
    author_id: string;
    is_scholarly: boolean;
    doi?: string;
    references?: Array<{ title: string; url?: string; year?: string }>;
    image_url?: string;
    meta_title?: string;
    meta_description?: string;
    views_count: number;
    published_at?: string;
    created_at: string;
    profiles?: Profile; // Joined
    categories?: Category; // Joined
    // WP Migration
    wp_post_id?: number;
}

export interface Listing {
    id: string;
    slug: string;
    business_name: string;
    owner_id: string;
    description?: string;
    address_json?: {
        street?: string;
        city: string;
        state?: string;
        zip?: string;
        country: string;
        coordinates?: { lat: number; lng: number };
    };
    contact_email?: string;
    contact_phone?: string;
    website?: string;
    type: 'clinic' | 'lab' | 'manufacturer';
    amenities?: string[];
    rating_avg: number;
    is_verified: boolean;
    gallery?: string[];
    created_at: string;
}

export interface Event {
    id: number;
    title: string;
    slug: string;
    description?: string;
    type: 'conference' | 'webinar' | 'workshop' | 'seminar';
    start_date: string;
    end_date?: string;
    is_virtual: boolean;
    location_name?: string;
    registration_url?: string;
    organizer_id: string;
    image_url?: string;
    status: 'upcoming' | 'ongoing' | 'completed';
}
