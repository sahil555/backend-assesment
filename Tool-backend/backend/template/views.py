from rest_framework import generics , status, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from template import serializer

from core import models
import uuid


class TemplateCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    serializer_class = serializer.UserTemplateSerializer

    def get_object(self, queryser=None):
        obj = models.Templates.objects.all()
        return obj

    def post(self, request):

        templateserial = self.get_serializer(data=request.data)

        if templateserial.is_valid():
            self.object = self.get_object()

            data = {
                 'user': request.user,
                 'title': templateserial.validated_data.get('title'),
                 'caption': templateserial.validated_data.get('caption'),
                 'template_image': templateserial.validated_data.get('template_image')
            }

            try:
                self.object.create(**data)
                return Response({'message': str(data)} , status=status.HTTP_200_OK)

            except Exception as e:
                return Response({'Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            return Response({'message': templateserial.errors }, status=status.HTTP_400_BAD_REQUEST)



class UserfetchTemplateView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    queryset = models.Templates.objects.all()

    serializer_class = serializer.UserTemplatefetchSerializer

    filter_backends = [filters.SearchFilter]

    search_fields = ['$title']


    def get_queryset(self):

        queryset = self.queryset

        return queryset.filter(user=self.request.user)