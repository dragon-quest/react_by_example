from typing import List, Any

from django.urls import path, include
from rest_framework import routers
from api.views import TaskViewSet, TagViewSet

router = routers.DefaultRouter()
router.register('tasks', TaskViewSet)
router.register('tags', TagViewSet)

urlpatterns: List[Any] = [
    path('', include(router.urls))
]