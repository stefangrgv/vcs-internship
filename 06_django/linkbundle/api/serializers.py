from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Link, LinkList
import requests
from bs4 import BeautifulSoup as bs


no_thumbnail = 'https://www.insticc.org/node/TechnicalProgram/\
56e7352809eb881d8c5546a9bbf8406e.png'


class LinkSerializer(serializers.ModelSerializer):
    """
    Serializer for link endpoint.
    """

    class Meta:
        model = Link
        fields = ["id", "url", "title", "thumbnail", "description"]


    def scrape(self, url):
        try:
            response = requests.get(url)
            soup = bs(response.text, 'html.parser')

            if type(soup.title) == 'list':
                title = soup.title[0].text
            else:
                title = soup.title.text

            metas = soup.find_all('meta')
            desc_tags = [
                meta.attrs['content'] for meta in metas \
                    if 'name' in meta.attrs and \
                        meta.attrs['name'] == 'description'
                ]
            
            if len(desc_tags) > 0:
                description = desc_tags[0]               
            else:
                description = 'No description available'

            imgs = [
                meta.attrs['content'] for meta in metas \
                    if 'property' in meta.attrs and \
                        meta.attrs['property'] == 'og:image'
            ]

            if len(imgs) > 0:
                thumbnail = imgs[0]
            else:
                thumbnail = no_thumbnail

            return {'title': title, 'description': description, 'thumbnail': thumbnail}

        except Exception as e:
            print('\n\n\nError in fetching data from {}: {}\n\n\n'.format(url, e))
            return {
                'title': url,
                'thumbnail': no_thumbnail,
                'description': 'No description available (server not reachable)'
            }


    def create(self, validated_data):
        scraped_data = self.scrape(validated_data['url'])

        link = Link.objects.create(**validated_data, **scraped_data)
        
        return link


class LinkListSerializer(serializers.ModelSerializer):
    """
    Serializer for linklist endpoint.
    """

    links = LinkSerializer(many=True, required=False)
    owner = serializers.ReadOnlyField(source="owner.username")
    

    class Meta:
        model = LinkList
        fields = ["id", "links", "owner", "title", "private"]
        read_only_fields = ["owner"]


    def create(self, validated_data):
        links = validated_data.pop('links')
        linklist = LinkList.objects.create(owner=self.context['request'].user, **validated_data)
        for l in links:
            linklist.links.add(
                Link.objects.get(url=l['url'])
            )
        return linklist

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title')
        instance.private = validated_data.get('private')
        instance.links.set([])

        links = validated_data.pop('links')
        for l in links:
            instance.links.add(
                Link.objects.get(url=l['url'])
            )
        return instance


class UserDetailsSerializer(serializers.ModelSerializer):
    """
    Serializer for user details endpoint.
    """

    linklists = LinkListSerializer(many=True)


    class Meta:
        model = User
        fields = ["id", "username", "email", "linklists"]


class UserListSerializer(serializers.ModelSerializer):
    """
    Serializer for listing all users endpoint.
    """


    class Meta:
        model = User
        fields = ["username"]


class UserCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for user creation endpoint.
    """


    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]


class UserChangePasswordSerializer(serializers.ModelSerializer):
    """
    Serializer for password change endpoint.
    """

    old_password = serializers.CharField(required=True)
    new_password_one = serializers.CharField(required=True)
    new_password_two = serializers.CharField(required=True)


    class Meta:
        model = User


# class ScrapedSiteSerializer(serializers.ModelSerializer):
#     """
#     Serializer for the ScrapedSite model.
#     """

#     class Meta:
#         model = ScrapedSite
#         fileds = '__all__'