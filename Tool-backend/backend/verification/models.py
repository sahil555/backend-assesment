from django.db import models

class EmailVerification(models.Model):
    otp = models.PositiveIntegerField(blank=True,null=True)
    email = models.EmailField(unique=True)
    counter = models.PositiveIntegerField(default=0)
    last_used = models.DateTimeField(auto_now=True)

    objects = models.Manager()

    def __str__(self):
        return str(self.email)

class phoneVerification(models.Model):
    otp = models.PositiveIntegerField(blank=True,null=True)
    phone = models.CharField(max_length=20, unique=True)
    counter = models.PositiveIntegerField(default=0)
    last_used = models.DateTimeField(auto_now=True)

    objects = models.Manager()

    def __str__(self):
        return str(self.phone)

