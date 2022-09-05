from django.db import models


# Create your models here.
class Tag(models.Model):
    objects = None
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Task(models.Model):
    objects = None
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tag = models.ForeignKey(Tag, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
