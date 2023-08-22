from rest_framework import serializers
from rest_framework.validators import UniqueValidator


from core import models


class UserTemplateSerializer(serializers.ModelSerializer):

    title = serializers.CharField(required=True)

    template_image = serializers.FileField(required=True)

    caption = serializers.CharField(required=False)


    class Meta:
        model = models.Templates
        fields = ('title','caption','template_image')


class UserTemplatefetchSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Templates
        fields = ('u_id','title','caption','template_image')


