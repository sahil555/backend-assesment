from django.urls import path

from verification import views


app_name = 'verification'

urlpatterns = [
    path('email-otp/', views.EmailVerificationView.as_view(), name='email verification'),
    path('email-otp/check/', views.CheckEmailOTPView.as_view(), name='email otp verify'),

    path('phone-otp/', views.phoneVerificationView.as_view(), name='phone verification'),
    path('phone-otp/check/', views.CheckPhoneOTPView.as_view(), name='phone otp verify'),
]