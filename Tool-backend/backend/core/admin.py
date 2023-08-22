from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from django.utils.translation import gettext

from core import models as CoreModel
from verification import models as VModel

class UserAdmin(BaseUserAdmin):
    ordering = ['id']
    list_display = ['name', 'username', 'email', 'phone']

    fieldsets = (
        (None, {'fields': ('username','password')}),
        (gettext('Personal Info'), {'fields':('name','phone','email')}),
        (gettext('Permissions'), {'fields': ('is_active','is_staff','is_superuser')}),
        (gettext('Important dates'), {'fields': ('last_login',)})
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email','password1','password2')
        }),
    )


admin.site.register(CoreModel.User, UserAdmin)


class OTPEmail(admin.ModelAdmin):
    list_display = ['__all__']
    fields = (['__all__'])
    
admin.site.register(VModel.EmailVerification)


class OTPPhone(admin.ModelAdmin):
    list_display = ['__all__']
    fields = (['__all__'])
    
admin.site.register(VModel.phoneVerification)


class UserProfile(admin.ModelAdmin):
    list_display= ['__all__']
    fields = (['__all__'])

admin.site.register(CoreModel.Profile)


class UserPosts(admin.ModelAdmin):
    list_display= ['__all__']
    fields = (['__all__'])

admin.site.register(CoreModel.UserPosts)


class UserTemplates(admin.ModelAdmin):
    list_display= ['__all__']
    fields=(['__all__'])

admin.site.register(CoreModel.Templates)

# class CustomImage(admin.ModelAdmin):
#     list_display= ['__all__']
#     fields = (['__all__'])

# admin.site.register(CoreModel.CustomizeImagefield)