from rest_framework import generics , status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializer import EmailVerificationSerializer,EmailForgotSerializer, PhoneVerificationSerializer, EmailCheckSerializer , PhoneCheckSerializer, EmailSerializer, PhoneSerializer, EmailResendSerializer
from .models import EmailVerification, phoneVerification

import Utilities, os
from dotenv import load_dotenv
load_dotenv()

from django.core.mail import EmailMessage
from twilio.rest import Client


#################################################################################################################
# TWILIO CLIENT OBJECT FOR UTILITY 

client = Client(os.getenv('TWILIO_ACCOUNT_SID'),os.getenv('TWILIO_AUTH_TOKEN'))


########################### Email OTP Send View #############################################################

class EmailVerificationView(generics.CreateAPIView):

    permission_classes = [AllowAny]

    serializer_class = EmailSerializer

    def post(self, request):
        
        emaildata = self.get_serializer(data=request.data)

        if emaildata.is_valid():
            email = emaildata.data.get('email').strip()
            emailOTP = Utilities.createOtpnumber()

            data = {'otp':int(emailOTP),'email':str(email),'counter':int(1)}

            serializeemail = EmailVerificationSerializer(data=data)


            if serializeemail.is_valid():
                
                
                subject = 'SMART - Email Verification OTP'
                message = f'<html><body>Dear customer,\n  <div> <h3>Your OTP :</h3> <h2>{emailOTP}</h2> </div> \n\n <p><b>Note * :</b>This is system Generated email please donot reply to this mail.</p> </body></html>'
                mail = EmailMessage(subject,message,'smartgargcc@gmail.com',[email])
                mail.content_subtype = 'html'

                serializeemail.save()
                try:
                    mail.send()
                    return Response({'Message':f'Email OTP hasbeen sent to {email}'},status=status.HTTP_200_OK)

                except Exception as e:
                    Response({'Error': e},status=status.HTTP_400_BAD_REQUEST)
            
            else:
                return Response({'Error': serializeemail.errors}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Error': emaildata.errors },status=status.HTTP_400_BAD_REQUEST)



#################################################################################################################

########################### Email OTP Send For Password Recovery View #############################################################

class EmailVerificationPasswordResetView(generics.CreateAPIView):

    permission_classes = [AllowAny]

    serializer_class = EmailForgotSerializer

    def post(self, request):
        
        emaildata = self.get_serializer(data=request.data)

        if emaildata.is_valid():
            email = emaildata.data.get('email').strip()
            emailOTP = Utilities.createOtpnumber()

            data = {'otp':int(emailOTP),'email':str(email),'counter':int(1)}

            serializeemail = EmailVerificationSerializer(data=data)


            if serializeemail.is_valid():
                
                
                subject = 'SMART - Email Verification OTP'
                message = f'<html><body>Dear customer,\n  <div> <h3>Your OTP :</h3> <h2>{emailOTP}</h2> </div> \n\n <p><b>Note * :</b>This is system Generated email please donot reply to this mail.</p> </body></html>'
                mail = EmailMessage(subject,message,'smartgargcc@gmail.com',[email])
                mail.content_subtype = 'html'

                serializeemail.save()
                try:
                    mail.send()
                    return Response({'Message':f'Email OTP hasbeen sent to {email}'},status=status.HTTP_200_OK)

                except Exception as e:
                    Response({'Error': e},status=status.HTTP_400_BAD_REQUEST)
            
            else:
                return Response({'Error': serializeemail.errors}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Error': emaildata.errors },status=status.HTTP_400_BAD_REQUEST)



#################################################################################################################

################### Phone OTP Send View   #######################################################################


class phoneVerificationView(generics.CreateAPIView):

    permission_classes = [AllowAny]

    serializer_class = PhoneSerializer


    def post(self, request):

        phonedata = self.get_serializer(data=request.data)

        if phonedata.is_valid():
            phone = phonedata.data.get('phone').strip()
            phoneOTP = Utilities.createOtpnumber()

            data = {'otp':int(phoneOTP),'phone':str(phone),'counter':int(1)}

            serializephone = PhoneVerificationSerializer(data=data)

            if serializephone.is_valid():

                serializephone.save()

                try:

                    message = client.messages.create(
                        # Message Body with 8-digit OTP numbers
                        body = "\nHello, \nWelcome to SMART Application \nYour OTP is : "+ str(phoneOTP) ,
                        # Our Default number(provided by Twilio) from which message will be send
                        from_ = '+16089676160',
                        # phone number provided by user
                        to = phone
                            )
                    
                    return Response({{'Message':f'Phone OTP hasbeen sent to {phone}'},{'status':message.sid}},status=status.HTTP_200_OK)

                except Exception as e:
                    Response({'Error': {e}}, status=status.HTTP_400_BAD_REQUEST)
            
            else:
                return Response({'Error': serializephone.errors}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Error': phonedata.errors },status=status.HTTP_400_BAD_REQUEST)



###################################################################################################

##########################  Check Email OTP  #########################################################

class CheckEmailOTPView(generics.CreateAPIView):

    permission_classes = [AllowAny]

    serializer_class = EmailCheckSerializer

    def post(self, request):
        
        serializeemail = self.get_serializer(data=request.data)

        if serializeemail.is_valid():
            email = serializeemail.data.get('email').strip()
            OTP = serializeemail.data.get('otp')

            try:
                modelEmail = EmailVerification.objects.get(email=email)
                savedOtp = modelEmail.otp

                if int(savedOtp) == int(OTP):

                    EmailVerification.objects.filter(otp=savedOtp).delete()

                    return Response({'verified':True}, status=status.HTTP_202_ACCEPTED)
                
                else:
                    return Response({'Error':'Wrong OTP'}, status=status.HTTP_400_BAD_REQUEST)
            
            except modelEmail.DoesNotExist:
                return Response({'Error':'Email not found, Enter Valid Email'},status=status.HTTP_400_BAD_REQUEST)
        
        else:
            return Response({'Error': serializeemail.errors },status=status.HTTP_400_BAD_REQUEST)




#################################################################################################################

############# Check Phone OTP ###############################################################################
class CheckPhoneOTPView(generics.CreateAPIView):

    permission_classes = [AllowAny]

    serializer_class = PhoneCheckSerializer

    def post(self, request):
        
        phonserialize = self.get_serializer(data=request.data)

        if phonserialize.is_valid():
            phone = phonserialize.data.get('phone').strip()
            OTP = phonserialize.data.get('otp')

            try:
                modelphone = phoneVerification.objects.get(phone=phone)
                savedOtp = modelphone.otp

                if int(savedOtp) == int(OTP):

                    phoneVerification.objects.filter(otp=savedOtp).delete()

                    return Response({'verified':True}, status=status.HTTP_202_ACCEPTED)

                else:
                    return Response({'Error':'Wrong OTP'}, status=status.HTTP_400_BAD_REQUEST)

            except modelphone.DoesNotExist:
                return Response({'Error':'Phone not found'}, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            return Response({'Error': phonserialize.errors },status=status.HTTP_400_BAD_REQUEST)

#######################################################################################################

###################### EMAIL Resend Verification ######################################################

class EmailVerificationResendView(generics.UpdateAPIView):
    permission_classes = [AllowAny]

    serializer_class = EmailResendSerializer

    def post(self, request):
        
        emaildata = self.get_serializer(data=request.data)

        if emaildata.is_valid():
            email = emaildata.data.get('email').strip()
            emailOTP = Utilities.createOtpnumber()


            data = {'otp':int(emailOTP),'email':str(email),'counter':int(1)}

            serializeemail = EmailVerificationSerializer(data=data)


            if serializeemail.is_valid():
                
                
                subject = 'SMART - Email Verification OTP'
                message = f'<html><body>Dear customer,\n  <div> <h3>Your OTP :</h3> <h2>{emailOTP}</h2> </div> \n\n <p><b>Note * :</b>This is system Generated email please donot reply to this mail.</p> </body></html>'
                mail = EmailMessage(subject,message,'smartgargcc@gmail.com',[email])
                mail.content_subtype = 'html'
                
                try:
                    resendemailotp = EmailVerification.objects.update(otp=int(emailOTP))

                except resendemailotp.DoesNotExist:
                    return Response({'Error':' Could Not Resend OTP' }, status=status.HTTP_400_BAD_REQUEST)


              
                try:
  
                    mail.send()
                    return Response({'Message':f'Email OTP hasbeen sent to {email}'},status=status.HTTP_200_OK)

                except Exception as e:
                    Response({'Error': e},status=status.HTTP_400_BAD_REQUEST)
            
            else:
                return Response({'Error': serializeemail.errors}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Error': emaildata.errors },status=status.HTTP_400_BAD_REQUEST)


################################################################################################################