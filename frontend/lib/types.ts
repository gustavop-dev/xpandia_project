export type Blog = {
  id: number;
  title: string;
  description?: string;
  category?: string;
  image_url?: string | null;
};

export type UserListItem = {
  id: number;
  email: string;
  role?: string;
  is_staff: boolean;
  is_active: boolean;
};
