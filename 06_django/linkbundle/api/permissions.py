from rest_framework import permissions


class IsMyOwn(permissions.BasePermission):
    """
    For public lists:
        allow only the owner of a linklist to modify it.
    For private lists:
        allow only the owner of a linklist to access or modify it.
    """

    def has_object_permission(self, request, view, obj):
        if ((request.method == "GET" and not obj.private)
                or (obj.owner == request.user)):
            return True
        return False


class IsMe(permissions.BasePermission):
    """
    Allows only the current user to make changes
    to their own profile.
    """

    def has_object_permission(self, request, view, obj):
        if obj.username == request.user.username:
            return True
        return False
