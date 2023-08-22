from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid

from django.db.models.signals import post_save
from django.dispatch import receiver


def imagepathconvert(instance, filename):

    fileext = filename.split('.')[-1]
    filename = f'user_profile_picture/{uuid.uuid4()}.{fileext}'

    return filename

def postspathconvert(instance, filename):
    fileext = filename.split('.')[-1]
    filename = f'user_posts/{uuid.uuid4()}.{fileext}'

    return filename

def templatespathconvert(instance, filename):
    fileext = filename.split('.')[-1]
    filename = f'user_templates/{uuid.uuid4()}.{fileext}'

    return filename

class UserManager(BaseUserManager):
    

    def create_user(self,name,username, email, phone, password=None, **extra_fields):
        if not email:
            raise ValueError('Email-Address is Mandatory')
    
        if not username:
            raise ValueError('Username is Mandatory')
        
        user = self.model(name=name,username=username, email=self.normalize_email(email), phone=phone, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_staffuser(self, name, username, email, phone, password):
        user = self.create_user(name,username,email,phone,password)
        user.is_staff = True
        user.save(using=self._db)

        return user

    def create_superuser(self,name,username,email,phone,password):
        user = self.create_user(name,username, email, phone,password)
        user.is_staff=True
        user.is_superuser=True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255,unique=True)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255,unique=True)
    phone = models.CharField(max_length=20,unique=True)
    password = models.CharField(max_length=255)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username


class Profile(models.Model):
    
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        default=None
    )

    user_picture = models.FileField(
        upload_to=imagepathconvert,
        default=None,
        blank=True,
        null=True
        )
    
    cover_picture = models.FileField(
        upload_to=imagepathconvert,
        default=None,
        blank=True,
        null=True
    )

    description = models.CharField(max_length=1000,blank=True,null=True,default=None)
    gender = models.CharField(max_length=100,blank=True,null=True,default=None)

    address = models.CharField(max_length=500,blank=True,null=True,default=None)
    city = models.CharField(max_length=100,blank=True,null=True,default=None)
    state = models.CharField(max_length=100, blank=True,null=True,default=None)
    country = models.CharField(max_length=500,blank=True,null=True,default=None)
    pincode = models.PositiveIntegerField(blank=True,null=True,default=0)


    objects = models.Manager()
    
    
    def __str__(self):
        return str(self.user)



class UserPosts(models.Model):
    
    u_id = models.UUIDField(primary_key=True,editable=False)

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        default=None
    )

    image = models.FileField(
        upload_to=postspathconvert,
        default=None,
        blank=True,
        null=True
    )

    title = models.CharField(max_length=500,blank=True,default=None)

    caption = models.CharField(max_length=5000,blank=True,default=None)

    status =  models.CharField(max_length=500,blank=True,default=None)
    
    post_scheduled = models.DateTimeField(blank=True,null=True)

    objects = models.Manager()

    def __str__(self):
        return str(self.u_id)



class Templates(models.Model):

    u_id = models.AutoField(primary_key=True,editable=False)

    title = models.CharField(max_length=500,blank=True,default=None)

    caption = models.CharField(max_length=5000,blank=True,default=None)

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        default=None
        )

    template_image = models.FileField(
        upload_to=templatespathconvert,
        default=None,
        blank=True,
        null=True
    )

    objects = models.Manager()

    def __str__(self):
        return self.title






