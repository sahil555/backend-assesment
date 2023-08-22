from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import EmailVerification, phoneVerification

import Utilities




class EmailVerificationSerializer(serializers.ModelSerializer):
    otp = serializers.IntegerField(
        required=True,
    )

    email = serializers.EmailField(
        required=True,
    )

    class Meta:
        model = EmailVerification
        fields = ('otp', 'email', 'counter')


class PhoneVerificationSerializer(serializers.ModelSerializer):
    otp = serializers.IntegerField(
        required=True,
    )

    phone = serializers.CharField(
        required=True,
    )



    def create(self, validated_data):
        return phoneVerification.objects.create(**validated_data)


    class Meta:
        model = phoneVerification
        fields = ('otp', 'phone', 'counter')


class EmailCheckSerializer(serializers.Serializer):
    email = serializers.EmailField(
        required=True,
        validators=[Utilities.userEmailverification]
    )

    otp = serializers.IntegerField(
        required=True
    )

    class Meta:
        model = EmailVerification
        fields = ('email')


class PhoneCheckSerializer(serializers.Serializer):
    phone = serializers.IntegerField(
        required=True,
        validators=[Utilities.userPhoneverification]
    )

    otp = serializers.IntegerField(
        required=True
    )

    class Meta:
        model = EmailVerification
        fields = ('phone')

class EmailSerializer(serializers.Serializer):

    email = serializers.EmailField(
        required=True,
        validators=[Utilities.uniqueEmail,Utilities.userEmailOTPsent]
    )

    class Meta:
        models = EmailVerification
        fields = ('email')


class EmailForgotSerializer(serializers.Serializer):
    email = serializers.EmailField(
        required=True,
        validators=[Utilities.userEmailCheck,Utilities.userEmailOTPsent]
    )

    class Meta:
        models = EmailVerification
        fields = ('email')

class EmailResendSerializer(serializers.Serializer):

    email = serializers.EmailField(
        required=True,
        validators=[Utilities.userEmailverification]
    )

    class Meta:
        models = EmailVerification
        fields = ('email')

class PhoneSerializer(serializers.Serializer):

    phone = serializers.CharField(
        required=True,
        validators=[Utilities.phoneValidator,Utilities.uniquephone,Utilities.userPhoneOTPsent]
    )

    class Meta:
        models = phoneVerification
        fields = ('phone')
