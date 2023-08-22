from django.urls import path, include

from template import views

app_name = 'template'

urlpatterns = [

    path('create/', views.TemplateCreateView.as_view(), name='post-create'),

    path('fetch/', views.UserfetchTemplateView.as_view(), name='post-fetch'),

]