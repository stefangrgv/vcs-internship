from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    '''
    Allow only the owner of a linklist to access it
    '''
    def has_object_permission(self, request, view, obj):
        if obj.private:
            return obj['owner'] == request.user
        return True