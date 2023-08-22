from rest_framework import generics , status, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from post import serializer

from core import models
import uuid



class UserCreatePostView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    serializer_class = serializer.UserPostSerializer

    def get_object(self, queryset=None):
        obj = models.UserPosts.objects.all()
        return obj

    def post(self, request):

        postdataserial = self.get_serializer(data=request.data)

        if postdataserial.is_valid():

            self.object = self.get_object()

            data = {
                'u_id': uuid.uuid4(),
                'user': request.user,
                'image': postdataserial.validated_data.get('image'),
                'title': postdataserial.validated_data.get('title'),
                'caption': postdataserial.validated_data.get('caption'),
                'status': postdataserial.validated_data.get('status'),
                'post_scheduled': postdataserial.validated_data.get('post_scheduled'),
            }

            try:

                self.object.create(**data)
                return Response({'message': str(data)}, status=status.HTTP_200_OK)

            except Exception as e:
                return Response({'Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


        else:
            return Response({'message': postdataserial.errors }, status=status.HTTP_400_BAD_REQUEST)



class UserfetchPostView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    queryset = models.UserPosts.objects.all()

    serializer_class = serializer.UserPostFetchSerializer

    filter_backends = [filters.SearchFilter]

    search_fields = ['$title']


    def get_queryset(self):
        status = self.request.query_params.get('status')

        queryset = self.queryset

        if status:
            queryset = queryset.filter(status=status)

        return queryset.filter(user=self.request.user)

    
class UserUpdatePostView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]

    queryset = models.UserPosts.objects.all()

    serializer_class = serializer.UserPostUpdateSerializer

    def get_queryset(self):
        
        return self.queryset.filter(user=self.request.user)
