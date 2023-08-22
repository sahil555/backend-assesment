from rest_framework import serializers
from rest_framework.validators import UniqueValidator


from core import models


class UserPostSerializer(serializers.ModelSerializer):

    image = serializers.FileField(required=True)

    title = serializers.CharField(required=True)

    caption = serializers.CharField(required=False)

    status = serializers.CharField(required=True)

    post_scheduled = serializers.DateTimeField(required=True)
    

    class Meta:
        model = models.UserPosts
        fields = ('image','title','caption','status','post_scheduled')



class UserPostFetchSerializer(serializers.ModelSerializer):    

    class Meta:
        model = models.UserPosts
        fields = ('u_id','image','title','caption','status','post_scheduled')




class UserPostUpdateSerializer(serializers.ModelSerializer):

    image = serializers.FileField(required=True)

    title = serializers.CharField(required=True)

    caption = serializers.CharField(required=False)

    status = serializers.CharField(required=True)

    post_scheduled = serializers.DateTimeField(required=True)
    

    class Meta:
        model = models.UserPosts
        fields = ('image','title','caption','status','post_scheduled')
