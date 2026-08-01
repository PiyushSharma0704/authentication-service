Authentication Features 
│
├── ✅ Register
│
├── Login
│
├── Access Token
│
├── Refresh Token
│
├── Authentication Middleware
│
├── Current User (/me)
│
├── Logout
│
├── RBAC
│
├── Email Verification
│
├── Forgot Password
│
├── Reset Password
│
├── Google OAuth
│
└── Security


==========

SUPER_ADMIN
    │
    ├── Create ADMIN
    ├── Create SUPPORT
    ├── Create USER
    ├── Manage Roles
    ├── Manage Permissions
    └── Manage System

ADMIN
    │
    ├── Create SUPPORT
    ├── Create USER
    ├── Manage Users
    └── Manage Profile

SUPPORT
    │
    ├── View Users
    ├── Update Users
    └── Manage Profile

USER
    │
    ├── Read Profile
    └── Update Profile

===========


Add a Role collection.
Move role names out of constants.
Seed default roles.
Add a Permission collection.
Add a RolePermission mapping.
Check permissions ("USER_CREATE", "ORDER_DELETE") instead of roles.