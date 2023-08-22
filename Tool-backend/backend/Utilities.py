from rest_framework import serializers
from core import models
import re, random
from verification import models as verificatiomodels






## creating random and Unique OTP number 
def createOtpnumber():
    #randomly generating OTP from system clock and return to calling source.
    otpnumber = random.randint(10000000,99999999)
    return otpnumber

## Check for the username uniqueness

def uniqueUsername(uname):
    user = models.User.objects.filter(username=uname).first()

    if user and user is not None:
        print(user)
        raise serializers.ValidationError("Username Already Exists Try Another.")
        
    else:
        print(user)
        return user

# Checker for phone existing Users for Recovery account password


def userPhoneCheck(phone):
    eml = models.User.objects.filter(phone=phone).first()

    if eml and eml is not None:
        return eml
    else:
        raise serializers.ValidationError("Phone is not registered")



## check for existing email

def userEmailCheck(email):
    eml = models.User.objects.filter(email=email).first()

    if eml and eml is not None:
        return eml
    else:
        raise serializers.ValidationError("Email is not registered")


## Checker for unique Email address

def uniqueEmail(email):
    eml = models.User.objects.filter(email=email).first()

    if eml and eml is not None:
        raise serializers.ValidationError("Email already registered, try with another!")
    else:
        return eml


# # Checker for the Phone number's User Availability returns error for existing users for Registration

def uniquephone(phone):
    ph = models.User.objects.filter(phone=phone).first()

    if ph and ph is not None:
        raise serializers.ValidationError("Phone already Registered, try with another!")
    else:
        return ph


# Check the Usernames Strength for Uniqueness

def usernameValidator(uname):
    regex = r'(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!#$%^&*()_+])[\w\d!#$%^&*()_+]{8,20}$'

    unam = bool(re.match(regex,uname))

    if uname and unam:
        return uname
    else:
        raise serializers.ValidationError("Username must be difficult to guess.")

  
# Validates the Username availability for New Users Registrations

def validateusername(uname):
    user = models.User.objects.filter(username=uname).first()

    if user and user is not None:
        return user
    else:
        raise serializers.ValidationError("Username Doesn't exist.")


# Checker for OTP digits (must be 8 digits)

def otpnumber(otp):
    regex = r'[0-9]{8}'
    ot = bool(re.search(regex,otp))

    if ot:
        return ot
    else:
        raise serializers.ValidationError("Enter 8 digit OTP.")


# phone number chceker validates the format of the number(world-wide)

def phoneValidator(phone):
    regex = r'^\+[0-9]{1,3}[0-9]{4,14}'

    ph = bool(re.search(regex,phone))

    if ph:
        return ph
    else:
        raise serializers.ValidationError("Enter Phone Number in Format {country-Code}{Phone-Number}")

# Checker function for password validator make sure the strong password is entered

def passwordValidator(passwd):
    regex = r'^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!#$%^&*()_+/-=])[\w\d!#$%^&*()_+/-=]{8,20}$'

    pas = bool(re.match(regex,passwd))

    if pas:
        return pas
    else:
        raise serializers.ValidationError("Password Must Contain atleast 1-Uppercase and lowercase letter,8-Characters,1-Special Character")


## check new user email verification 
def userEmailverification(email):
    eml = verificatiomodels.EmailVerification.objects.filter(email=email).first()

    if eml and eml is not None:
        return eml
    else:
        raise serializers.ValidationError("Email is Not Valid")
        

## check new user phone verification

def userPhoneverification(phone):
    phon = verificatiomodels.phoneVerification.objects.filter(phone=phone).first()

    if phon and phon is not None:
        return phon
    else:
        raise serializers.ValidationError("Phone is Not Valid")


## check for emails have already sent the OTP

def userEmailOTPsent(email):
    eml = verificatiomodels.EmailVerification.objects.filter(email=email).first()

    if eml and eml is not None:
        raise serializers.ValidationError("OTP to this Email has already sent!")
    else:
        return eml


## check new user phone verification

def userPhoneOTPsent(phone):
    phon = verificatiomodels.phoneVerification.objects.filter(phone=phone).first()

    if phon and phon is not None:
        raise serializers.ValidationError("OTP to this Phone has already sent!")
    else:
        return phon