from django.urls import path, include

from user import views

from verification.views import EmailVerificationPasswordResetView, CheckEmailOTPView, EmailVerificationResendView

app_name = 'user'

urlpatterns = [

    ####### user on boards ##########################################

    path('create/', views.CreateUserView.as_view(), name='create'),
    path('login/', views.JwttokenpairView.as_view(), name='token'),
    path('login/refresh/', views.TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    
    ########  password recovery ######################################

    path('change-password/', views.ChangePasswordView.as_view(), name='change-password'),
    path('forgot-password/', EmailVerificationPasswordResetView.as_view(), name='forgot-password' ),
    path('forgot-password-resend/', EmailVerificationResendView.as_view(), name='forgot-password-resend'),
    path('forgot-password-check/', CheckEmailOTPView.as_view(), name='check-otp-password'),
    path('reset-password/', views.ResetPasswordView.as_view(), name='reset-password'),

    ######## User's Profiles ##############################################

    path('home/', views.HomePage.as_view(), name='home-user'),
    path('profile/', views.userProfileCreateView.as_view(), name='create-profile-data'),
    path('profile-update/<int:pk>', views.userProfileUpdateView.as_view(), name='update-profile-data'),

    ###### Other Apps Urls ####################################

    path('verification/', include('verification.urls')),
    path('post/', include('post.urls')),
    path('template/', include('template.urls')),
    path('accounts/', include('social_django.urls', namespace='social')),

]
