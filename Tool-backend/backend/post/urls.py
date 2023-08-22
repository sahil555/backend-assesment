from django.urls import path, include

from post import views

from verification.views import EmailVerificationView, CheckEmailOTPView, EmailVerificationResendView

app_name = 'post'

urlpatterns = [

    path('create/', views.UserCreatePostView.as_view(), name='post-create'),

    path('fetch/', views.UserfetchPostView.as_view(), name='post-fetch'),

    path('update/<str:pk>', views.UserUpdatePostView.as_view(), name='post-update-instance')

]