from rest_framework import generics , status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from user import serializer

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import get_user_model 

from core import models

########## USER REGISTER VIEW #############################################

class CreateUserView(generics.CreateAPIView):
    permission_classes = [AllowAny,]
    serializer_class = serializer.UserSerializer




########### JWT-TOKEN EXTRACTION VIEW #####################################

class JwttokenpairView(TokenObtainPairView):
    permission_classes = [AllowAny,]
    serializer_class = serializer.JwtpairSerializer




########### JWT-TOKEN REFRESH VIEW #########################################

class JwttokenRefreshView(TokenRefreshView):
    permission_classes = [IsAuthenticated,]




############# JWT-TOKEN REVOKE VIEW ########################################

class LogoutView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated,]

    serializer_class = serializer.logoutSerializer

    def post(self,request):

        token_data = self.get_serializer(data=request.data)

        if token_data.is_valid():
            refresh_token = token_data.data.get('refresh_token')    

            try:
                token = RefreshToken(refresh_token)
                token.blacklist()

                return Response(status=status.HTTP_205_RESET_CONTENT)
            except Exception as e:
                return Response({'Error': str(e)},status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'Error': token_data.errors },status=status.HTTP_400_BAD_REQUEST)




#############  HOME-PAGE VIEW ##############################################


class HomePage(APIView):
    permission_classes = [IsAuthenticated]


    def get(self,request):
        data = request.user

        try:
            userdata = data.profile

            try:

                userpic = data.profile.user_picture

                try:
                    
                    usercover = data.profile.cover_picture

                    user = { 
                    'username': data.username,
                    'Name': data.name,
                    'Phone': data.phone,
                    'Email': data.email,
                    'profile_id': userdata.pk,
                    'user_picture': userpic.url,
                    'cover_picture': usercover.url,
                    'description': userdata.description,
                    'gender' : userdata.gender,
                    'address': userdata.address,
                    'city': userdata.city,
                    'state': userdata.state,
                    'country': userdata.country,
                    'pincode': userdata.pincode,
                    }


                except Exception as e:

                    user = { 
                    'username': data.username,
                    'Name': data.name,
                    'Phone': data.phone,
                    'Email': data.email,
                    'profile_id': userdata.pk,
                    'user_picture': userpic.url,
                    'cover_picture': str(e),
                    'description': userdata.description,
                    'gender' : userdata.gender,
                    'address': userdata.address,
                    'city': userdata.city,
                    'state': userdata.state,
                    'country': userdata.country,
                    'pincode': userdata.pincode,
                    }
            
            except Exception as e:

                user = { 
                'username': data.username,
                'Name': data.name,
                'Phone': data.phone,
                'Email': data.email,
                'profile_id': userdata.pk,
                'user_picture': str(e),
                'cover_picture': str(e),
                'description': userdata.description,
                'gender' : userdata.gender,
                'address': userdata.address,
                'city': userdata.city,
                'state': userdata.state,
                'country': userdata.country,
                'pincode': userdata.pincode,
                }

        except Exception as e:
            userdata = str(e)

            user = { 
            'username': data.username,
            'Name': data.name,
            'Phone': data.phone,
            'Email': data.email,
            'profile': str(userdata)
             }

  
        

        return Response({'Data': user }, status=status.HTTP_200_OK)




#####################  Password-Change View #################################


class ChangePasswordView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]

    serializer_class = serializer.ChangepasswordSerializer

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj
    
    def update(self, request, **args):
        self.object = self.get_object()

        passdata = self.get_serializer(data=request.data)

        if passdata.is_valid():

            if not self.object.check_password(passdata.data.get("old_password")):
                return Response({"Error": {"old_password": [ "Incorrect Password" ] }}, status=status.HTTP_400_BAD_REQUEST)
            
            else:
                self.object.set_password(passdata.data.get("new_password"))
                self.object.save()

                return Response( {"message": "password successfully changed"}, status=status.HTTP_200_OK)
        else:
            return Response({"Error": passdata.errors },status=status.HTTP_400_BAD_REQUEST)




################## RESET-PASSWORD VIEW ############################################################


class ResetPasswordView(generics.UpdateAPIView):

    permission_classes = [AllowAny]

    serializer_class = serializer.ResetPasswordSerializer

    queryset = None

    def update(self, request, **args):
        
        changepassword = self.get_serializer(data=request.data)

        if changepassword.is_valid():

            try:

                email = changepassword.data.get('email')
                self.object = get_user_model().objects.get(email=email)

                try:
                    newpassword = changepassword.data.get('new_password')

                    self.object.set_password(newpassword)
                    self.object.save()

                    return Response( {"message": "password successfully changed"}, status=status.HTTP_200_OK)

                except Exception as e:
                    
                    return Response({"Error": str(e), "message": "Try Again"},status=status.HTTP_400_BAD_REQUEST)

            except Exception as e:
                
                return Response({"Error": str(e), "message": "Try Again" },status=status.HTTP_400_BAD_REQUEST)


        return Response({"Error": changepassword.errors },status=status.HTTP_400_BAD_REQUEST)


################## USER Profile Create View #####################################################

class userProfileCreateView(generics.CreateAPIView):
    
    permission_classes = [IsAuthenticated]

    serializer_class = serializer.ProfileSerializer

    def get_object(self, queryset=None):
        obj = models.Profile.objects.all()
        return obj
    
    def post(self, request):
        

        profiledata = self.get_serializer(data=request.data)

        if profiledata.is_valid():
            self.object  = self.get_object()

            data = {
                'user': request.user,
                'user_picture': profiledata.validated_data.get('user_picture'),
                'cover_picture': profiledata.validated_data.get('cover_picture'),
                'description': profiledata.validated_data.get('description'),
                'gender': profiledata.validated_data.get('gender'),
                'address': profiledata.validated_data.get('address'),
                'city': profiledata.validated_data.get('city'),
                'state': profiledata.validated_data.get('state'),
                'country': profiledata.validated_data.get('country'),
                'pincode': profiledata.validated_data.get('pincode')
            }

            try:
                self.object.create(**data)
                return Response({'data': str(data), 'message': 'Profile Successfully Created ' } ,status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'Error': str(e) }, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({'message': profiledata.errors }, status=status.HTTP_400_BAD_REQUEST)
            

################## USER Profile Update View #####################################################


class userProfileUpdateView(generics.UpdateAPIView):

    permission_classes = [IsAuthenticated]

    serializer_class = serializer.ProfileUpdateSerializer

    queryset = models.Profile.objects.all()

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)







