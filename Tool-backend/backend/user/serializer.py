from django.contrib.auth import get_user_model 

from rest_framework import serializers
from rest_framework.validators import UniqueValidator


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer 

import Utilities

from core import models


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=True,
        validators=[Utilities.usernameValidator,Utilities.uniqueUsername]
    )
    name = serializers.CharField(
        required=True,
    )
    email = serializers.EmailField(
        required=True,
        validators=[Utilities.uniqueEmail]
    )
    phone = serializers.CharField(
        required=True,
        validators=[Utilities.phoneValidator,Utilities.uniquephone]
    ),

    password = serializers.CharField(
        required=True,
        validators=[Utilities.passwordValidator]
    )

    def create(self,validated_data):
        return get_user_model().objects.create_staffuser(**validated_data)

    class Meta:
        model = get_user_model()
        fields = ('username','name','email','phone','password')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 8 }}


class JwtpairSerializer(TokenObtainPairSerializer):
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['user'] = str(user)

        return token



class ChangepasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(
        required=True,
        validators=[Utilities.passwordValidator]
    )

    old_password = serializers.CharField(
        required=True,
        validators=[Utilities.passwordValidator]
    )


    class Meta:
        model = get_user_model()
        fields = ('password')

class ResetPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(
        required=True,
        validators=[Utilities.passwordValidator]
    )

    email = serializers.EmailField(
        required=True,
        validators=[Utilities.userEmailCheck]
    )

    class Meta:
        model = get_user_model()
        fields = ('password','email')


class ProfileSerializer(serializers.ModelSerializer):

    user = serializers.StringRelatedField(many=False)

    user_picture = serializers.FileField(required=False)

    cover_picture = serializers.FileField(required=False)

    pincode = serializers.IntegerField(required=False)


    class Meta:
        model = models.Profile
        fields = ('user','user_picture','cover_picture','description','gender','address','city','state','country','pincode')



class ProfileUpdateSerializer(serializers.ModelSerializer):

    user_picture = serializers.ImageField(required=False)

    cover_picture = serializers.FileField(required=False)
    
    pincode = serializers.IntegerField(required=False)


    class Meta:
        model = models.Profile
        fields = ('user_picture','cover_picture','description','gender','address','city','state','country','pincode')




class logoutSerializer(serializers.Serializer):

    refresh_token = serializers.CharField(
        required=True
    )

    class Meta:
        model = models.User



