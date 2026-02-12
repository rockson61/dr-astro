
# 4. Authentication

## Supabase Auth
We rely on Supabase Auth (GoTrue) for user management.

## User Roles
We have implemented a Role-Based Access Control (RBAC) system using the `profiles` table.
Roles include:
-   `super_admin`: Full system access.
-   `admin`: Content management.
-   `editor`: Editing capabilities.
-   `author` (Professional): Can submit articles.
-   `dentist`: Verified professional.
-   `student`: Dental student.
-   `business` (Manufacturer/Lab): Can list products/labs.

## Auth Flow
1.  **Login:** User enters credentials.
2.  **Session:** Supabase sets a JWT cookie/token.
3.  **Middleware:** (Optional) Checks session validity.
4.  **Page Protection:**
    ```astro
    // src/pages/dashboard/index.astro
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return Astro.redirect('/login');
    ```

## Testing Credentials
Default Password: `password123`

| Role | Email |
| :--- | :--- |
| Super Admin | `admin@dentalreach.io` |
| Dentist | `verified_v2_dentist1@dentalreach.io` |
| Student | `verified_v2_student1@dentalreach.io` |
| Professional | `verified_v2_professional1@dentalreach.io` |
| Manufacturer | `verified_v2_manufacturer1@dentalreach.io` |
| Demo User | `demo@dentalreach.io` |

## "Batteries Included" - Auth Features
-   **Forgot Password:** Supported via Supabase.
-   **Email Confirmation:** Supported (turned on in scripts).
-   **Social Login:** Can be enabled in Supabase Dashboard.
