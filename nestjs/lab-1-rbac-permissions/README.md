# Lab 1: Permissions-Based Access Control

### Context
You are building an ERP system where users have different roles (Admin, Manager, User). However, roles are becoming too broad. You need to implement "Permissions" (e.g., `can_delete_invoice`, `can_view_reports`).

### The Issue
Currently, you are checking roles directly in the controllers:
```typescript
@Get()
findAll(@Req() request) {
  if (request.user.role !== 'Admin') throw new ForbiddenException();
  return this.service.findAll();
}
```
This is hard to maintain and reuse across dozens of controllers.

### Goal
Implement a custom `@RequirePermission()` decorator and a global `PermissionsGuard` that checks if the authenticated user has the required specific permission.
