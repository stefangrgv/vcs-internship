from django.db import models


class User(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name

class KodjaLink(models.Model):
    is_private = models.BooleanField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)

class Link(models.Model):
    url = models.URLField(max_length=200)
    kodjalink = models.ForeignKey(KodjaLink, on_delete=models.CASCADE)

    def __str__(self):
        return self.url