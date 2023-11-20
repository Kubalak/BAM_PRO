from rest_framework.serializers import ModelSerializer
from .models import CreditStorage

class CreditSerializer(ModelSerializer):
    class Meta:
        model = CreditStorage
        fields = ['pk', 'name', 'icon', 'username', 'password']
